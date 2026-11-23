import {Check, Copy, Download, RotateCcw, Upload} from 'lucide-react';
import {ChangeEvent, useRef, useState} from 'react';
import {Course, QuestionItem} from '../types/course';

interface BackupViewProps {
  courses: Course[];
  questions: QuestionItem[];
  onImportData: (
    importedCourses: Course[],
    importedQuestions: QuestionItem[],
    mode: 'merge' | 'replace',
  ) => void;
  onResetToDefaults: () => void;
}

export function BackupView({
  courses,
  questions,
  onImportData,
  onResetToDefaults,
}: BackupViewProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedStudySheet, setCopiedStudySheet] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleExportJson = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      courses,
      questions,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `respuestas-cursos-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage('Archivo JSON descargado correctamente.');
    setErrorMessage('');
  };

  const handleCopyPlainText = async () => {
    const courseMap = new Map(courses.map((c) => [c.id, c.name]));
    const sections = questions.map((q, index) => {
      const courseName = courseMap.get(q.courseId) || 'Curso';
      const header = `${index + 1}. [${courseName}${q.moduleName ? ` · ${q.moduleName}` : ''}] ${q.prompt}`;
      const stmts =
        q.statements.length > 0
          ? `\n${q.statements.map((s, i) => `   ${i + 1}. ${s}`).join('\n')}`
          : '';
      const opts = q.options
        .map(
          (o) =>
            `   ${o.letter}. ${o.text}${o.letter === q.correctLetter ? '  <-- CORRECTA' : ''}`,
        )
        .join('\n');
      return `${header}${stmts}\n${opts}`;
    });

    try {
      await navigator.clipboard.writeText(sections.join('\n\n'));
      setCopiedStudySheet(true);
      setTimeout(() => setCopiedStudySheet(false), 2000);
    } catch {
      setErrorMessage('No se pudo copiar al portapapeles.');
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatusMessage('');
    setErrorMessage('');

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (
        !parsed ||
        !Array.isArray(parsed.courses) ||
        !Array.isArray(parsed.questions)
      ) {
        setErrorMessage(
          'El archivo no tiene el formato esperado (faltan las listas de cursos o preguntas).',
        );
        return;
      }

      onImportData(parsed.courses, parsed.questions, importMode);
      setStatusMessage(
        `Se importaron ${parsed.courses.length} cursos y ${parsed.questions.length} preguntas (${importMode === 'merge' ? 'combinados' : 'reemplazando el banco actual'}).`,
      );
    } catch {
      setErrorMessage('No se pudo leer el archivo JSON. Verifica que sea válido.');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
          Respaldo y exportación
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-2xl">
          Tus preguntas se guardan automáticamente en este navegador. Exporta una copia en JSON para llevarla a otro dispositivo o comparte la guía en texto plano.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Export Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col justify-between gap-5">
          <div>
            <h2 className="font-display text-base font-semibold text-slate-900">
              Exportar respuestas
            </h2>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              Actualmente tienes{' '}
              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                {courses.length}
              </span>{' '}
              {courses.length === 1 ? 'curso' : 'cursos'} y{' '}
              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                {questions.length}
              </span>{' '}
              {questions.length === 1 ? 'pregunta' : 'preguntas'} guardadas.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Descargar JSON
            </button>

            <button
              type="button"
              onClick={handleCopyPlainText}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              {copiedStudySheet ? (
                <>
                  <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                  <span className="text-emerald-700">Guía copiada</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  Copiar todo en texto
                </>
              )}
            </button>
          </div>
        </div>

        {/* Import Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col justify-between gap-5">
          <div>
            <h2 className="font-display text-base font-semibold text-slate-900">
              Importar respaldo JSON
            </h2>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              Carga un archivo exportado previamente para restaurar o combinar preguntas.
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-700">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="import-mode"
                  checked={importMode === 'merge'}
                  onChange={() => setImportMode('merge')}
                  className="accent-blue-700"
                />
                <span>Combinar con las actuales</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="import-mode"
                  checked={importMode === 'replace'}
                  onChange={() => setImportMode('replace')}
                  className="accent-blue-700"
                />
                <span>Reemplazar todo</span>
              </label>
            </div>
          </div>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" aria-hidden="true" />
              Seleccionar archivo JSON
            </button>
          </div>
        </div>
      </div>

      {statusMessage && (
        <p className="text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
          {statusMessage}
        </p>
      )}

      {errorMessage && (
        <p
          role="alert"
          className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3"
        >
          {errorMessage}
        </p>
      )}

      {/* Reset to Initial Examples */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-base font-semibold text-slate-900">
            Restaurar ejemplos iniciales
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Vuelve a cargar los cursos y preguntas de muestra originales si deseas empezar limpio.
          </p>
        </div>

        {confirmReset ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onResetToDefaults();
                setConfirmReset(false);
                setStatusMessage('Se restauraron los ejemplos iniciales.');
              }}
              className="px-4 py-2.5 min-h-[44px] text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"
            >
              Confirmar restauración
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="px-4 py-2.5 min-h-[44px] text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Restaurar ejemplos
          </button>
        )}
      </div>
    </section>
  );
}

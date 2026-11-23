import {Plus, Sparkles, Trash2, X} from 'lucide-react';
import {FormEvent, useEffect, useState} from 'react';
import {Course, QuestionItem, QuestionOption} from '../types/course';
import {parseRawQuestionText} from '../utils/questionParser';

interface QuestionEditorModalProps {
  isOpen: boolean;
  editingQuestion: QuestionItem | null;
  courses: Course[];
  defaultCourseId: string;
  onClose: () => void;
  onSave: (
    payload: Omit<QuestionItem, 'id' | 'createdAt' | 'updatedAt'>,
    newCourseName?: string,
  ) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

const EXAMPLE_PASTE = `Los 3 factores que contribuyen a que las mujeres sean más pobres son:
1. La falta de acceso a Internet
2. La dedicación a actividades domésticas
3. La falta de acceso a servicios financieros
4. El cuidado de personas sin remuneración
5. La limitación para tener un empleo de tiempo completo por responsabilidades familiares

Pregunta 1Respuesta
A.
1, 3, 4
B.
2, 3, 4
C.
2, 4, 5 donde la respuesta es c`;

export function QuestionEditorModal({
  isOpen,
  editingQuestion,
  courses,
  defaultCourseId,
  onClose,
  onSave,
}: QuestionEditorModalProps) {
  const [showQuickPaste, setShowQuickPaste] = useState(false);
  const [rawPasteText, setRawPasteText] = useState('');
  const [parseFeedback, setParseFeedback] = useState('');

  const [courseId, setCourseId] = useState('');
  const [creatingNewCourse, setCreatingNewCourse] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [questionNumber, setQuestionNumber] = useState('');
  const [prompt, setPrompt] = useState('');
  const [statements, setStatements] = useState<string[]>([]);
  const [options, setOptions] = useState<QuestionOption[]>([
    {letter: 'A', text: ''},
    {letter: 'B', text: ''},
    {letter: 'C', text: ''},
  ]);
  const [correctLetter, setCorrectLetter] = useState('A');
  const [explanation, setExplanation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    setShowQuickPaste(false);
    setRawPasteText('');
    setParseFeedback('');
    setErrorMsg('');
    setCreatingNewCourse(false);
    setNewCourseName('');

    if (editingQuestion) {
      setCourseId(editingQuestion.courseId);
      setModuleName(editingQuestion.moduleName);
      setQuestionNumber(editingQuestion.questionNumber);
      setPrompt(editingQuestion.prompt);
      setStatements([...editingQuestion.statements]);
      setOptions(editingQuestion.options.map((o) => ({...o})));
      setCorrectLetter(editingQuestion.correctLetter);
      setExplanation(editingQuestion.explanation || '');
    } else {
      const fallbackCourseId =
        defaultCourseId !== 'all'
          ? defaultCourseId
          : courses[0]?.id || '__new__';
      setCourseId(fallbackCourseId);
      if (fallbackCourseId === '__new__') {
        setCreatingNewCourse(true);
      }
      setModuleName('');
      setQuestionNumber('Pregunta 1');
      setPrompt('');
      setStatements([]);
      setOptions([
        {letter: 'A', text: ''},
        {letter: 'B', text: ''},
        {letter: 'C', text: ''},
      ]);
      setCorrectLetter('A');
      setExplanation('');
    }
  }, [isOpen, editingQuestion, courses, defaultCourseId]);

  if (!isOpen) return null;

  const handleAutoParse = () => {
    if (!rawPasteText.trim()) {
      setParseFeedback('Pega primero el texto de la pregunta para detectarla.');
      return;
    }

    const parsed = parseRawQuestionText(rawPasteText);
    if (parsed.prompt) setPrompt(parsed.prompt);
    if (parsed.questionNumber) setQuestionNumber(parsed.questionNumber);
    setStatements(parsed.statements);
    setOptions(parsed.options);
    setCorrectLetter(parsed.correctLetter);
    setParseFeedback(
      `Detectado: ${parsed.statements.length} numerales y ${parsed.options.length} opciones (respuesta marcada: ${parsed.correctLetter}). Revisa los campos abajo antes de guardar.`,
    );
  };

  const handleAddStatement = () => {
    setStatements((prev) => [...prev, '']);
  };

  const handleStatementChange = (index: number, value: string) => {
    setStatements((prev) => prev.map((item, idx) => (idx === index ? value : item)));
  };

  const handleRemoveStatement = (index: number) => {
    setStatements((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAddOption = () => {
    if (options.length >= OPTION_LETTERS.length) return;
    const nextLetter = OPTION_LETTERS[options.length];
    setOptions((prev) => [...prev, {letter: nextLetter, text: ''}]);
  };

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prev) =>
      prev.map((opt, idx) => (idx === index ? {...opt, text: value} : opt)),
    );
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    const filtered = options
      .filter((_, idx) => idx !== index)
      .map((opt, idx) => ({...opt, letter: OPTION_LETTERS[idx]}));
    setOptions(filtered);
    if (!filtered.some((opt) => opt.letter === correctLetter)) {
      setCorrectLetter(filtered[0].letter);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setErrorMsg('');

    if (creatingNewCourse && !newCourseName.trim()) {
      setErrorMsg('Escribe el nombre del nuevo curso.');
      return;
    }

    if (!creatingNewCourse && !courseId) {
      setErrorMsg('Selecciona un curso.');
      return;
    }

    if (!prompt.trim()) {
      setErrorMsg('Escribe el enunciado de la pregunta.');
      return;
    }

    const cleanedOptions = options
      .map((opt, idx) => ({
        letter: OPTION_LETTERS[idx],
        text: opt.text.trim(),
      }))
      .filter((opt) => opt.text.length > 0);

    if (cleanedOptions.length < 2) {
      setErrorMsg('Agrega al menos 2 opciones de respuesta con texto.');
      return;
    }

    const validCorrect = cleanedOptions.some((o) => o.letter === correctLetter)
      ? correctLetter
      : cleanedOptions[0].letter;

    const cleanedStatements = statements
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    onSave(
      {
        courseId: creatingNewCourse ? '__new__' : courseId,
        moduleName: moduleName.trim(),
        questionNumber: questionNumber.trim() || 'Pregunta',
        prompt: prompt.trim(),
        statements: cleanedStatements,
        options: cleanedOptions,
        correctLetter: validCorrect,
        explanation: explanation.trim() || undefined,
      },
      creatingNewCourse ? newCourseName.trim() : undefined,
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-[2px] p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="question-modal-title"
    >
      <div className="bg-white w-full sm:max-w-3xl max-h-[92vh] sm:rounded-xl rounded-t-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-slate-200 shrink-0">
          <div>
            <h2
              id="question-modal-title"
              className="font-display text-lg font-semibold text-slate-900"
            >
              {editingQuestion ? 'Editar pregunta' : 'Agregar pregunta de curso'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Admite enunciados simples o listas numeradas con incisos A, B, C, D.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-5"
        >
          {/* Quick Paste Helper */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Pegado rápido desde plataforma
                </p>
                <p className="text-xs text-slate-600">
                  Pega una pregunta copiada (con numerales y opciones A, B, C) para llenarla en un clic.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowQuickPaste((prev) => !prev)}
                className="px-3 py-1.5 min-h-[38px] text-xs font-semibold text-blue-700 bg-white border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                {showQuickPaste ? 'Ocultar pegado rápido' : 'Pegar texto completo'}
              </button>
            </div>

            {showQuickPaste && (
              <div className="mt-3 space-y-3">
                <textarea
                  rows={5}
                  value={rawPasteText}
                  onChange={(e) => setRawPasteText(e.target.value)}
                  placeholder="Pega aquí la pregunta, sus numerales (1., 2., 3...) y las opciones (A., B., C...)..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
                />
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAutoParse}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    Detectar campos automáticamente
                  </button>
                  <button
                    type="button"
                    onClick={() => setRawPasteText(EXAMPLE_PASTE)}
                    className="px-3 py-2 min-h-[40px] text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Cargar texto de ejemplo
                  </button>
                </div>
                {parseFeedback && (
                  <p className="text-xs text-slate-700 bg-white border border-slate-200 rounded-md px-3 py-2">
                    {parseFeedback}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Course & Module Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="course-select"
                className="block text-sm font-medium text-slate-800 mb-1.5"
              >
                Curso
              </label>
              {!creatingNewCourse ? (
                <div className="space-y-2">
                  <select
                    id="course-select"
                    value={courseId}
                    onChange={(e) => {
                      if (e.target.value === '__new__') {
                        setCreatingNewCourse(true);
                      } else {
                        setCourseId(e.target.value);
                      }
                    }}
                    className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                    <option value="__new__">+ Crear nuevo curso...</option>
                  </select>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    placeholder="Nombre del nuevo curso"
                    className="flex-1 h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                  />
                  {courses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setCreatingNewCourse(false);
                        setCourseId(courses[0].id);
                      }}
                      className="px-3 h-11 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      Elegir
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="question-number"
                  className="block text-sm font-medium text-slate-800 mb-1.5"
                >
                  Etiqueta
                </label>
                <input
                  id="question-number"
                  type="text"
                  value={questionNumber}
                  onChange={(e) => setQuestionNumber(e.target.value)}
                  placeholder="Ej. Pregunta 1"
                  className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="module-name"
                  className="block text-sm font-medium text-slate-800 mb-1.5"
                >
                  Módulo / Tema
                </label>
                <input
                  id="module-name"
                  type="text"
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                  placeholder="Ej. Módulo 1"
                  className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Question Prompt */}
          <div>
            <label
              htmlFor="question-prompt"
              className="block text-sm font-medium text-slate-800 mb-1.5"
            >
              Enunciado de la pregunta
            </label>
            <textarea
              id="question-prompt"
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ej. Los 3 factores que contribuyen a que las mujeres sean más pobres son:"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
            />
          </div>

          {/* Numbered Statements */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div>
                <span className="block text-sm font-medium text-slate-800">
                  Elementos numerados (opcional)
                </span>
                <span className="text-xs text-slate-500">
                  Útil para preguntas de combinación (1, 2, 3, 4, 5).
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddStatement}
                className="inline-flex items-center gap-1 px-3 py-1.5 min-h-[38px] text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                Agregar punto
              </button>
            </div>

            {statements.length > 0 && (
              <div className="space-y-2">
                {statements.map((stmt, idx) => (
                  <div key={`edit-stmt-${idx}`} className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-slate-500 w-6 text-right tabular-nums shrink-0">
                      {idx + 1}.
                    </span>
                    <input
                      type="text"
                      value={stmt}
                      onChange={(e) => handleStatementChange(idx, e.target.value)}
                      placeholder={`Punto ${idx + 1}`}
                      className="flex-1 h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveStatement(idx)}
                      aria-label={`Eliminar punto ${idx + 1}`}
                      className="w-10 h-10 inline-flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Options + Correct Answer Selector */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div>
                <span className="block text-sm font-medium text-slate-800">
                  Opciones y respuesta correcta
                </span>
                <span className="text-xs text-slate-500">
                  Marca el círculo de la izquierda en el inciso correcto.
                </span>
              </div>
              {options.length < OPTION_LETTERS.length && (
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="inline-flex items-center gap-1 px-3 py-1.5 min-h-[38px] text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  Agregar opción
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {options.map((option, idx) => {
                const isCorrect = correctLetter === option.letter;
                return (
                  <div
                    key={`edit-opt-${option.letter}`}
                    className={`flex items-center gap-2.5 p-2 rounded-lg border transition-colors ${
                      isCorrect
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <label className="flex items-center gap-2 pl-1.5 cursor-pointer shrink-0">
                      <input
                        type="radio"
                        name="correct-option"
                        checked={isCorrect}
                        onChange={() => setCorrectLetter(option.letter)}
                        className="w-4 h-4 accent-emerald-700 cursor-pointer"
                      />
                      <span className="font-mono text-sm font-semibold text-slate-700 w-5">
                        {option.letter}.
                      </span>
                    </label>
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      placeholder={`Texto de la opción ${option.letter}`}
                      className="flex-1 h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                    />
                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(idx)}
                        aria-label={`Eliminar opción ${option.letter}`}
                        className="w-10 h-10 inline-flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optional Explanation */}
          <div>
            <label
              htmlFor="question-explanation"
              className="block text-sm font-medium text-slate-800 mb-1.5"
            >
              Justificación o nota de repaso (opcional)
            </label>
            <textarea
              id="question-explanation"
              rows={2}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Explica brevemente por qué esta es la respuesta correcta..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
            />
          </div>

          {errorMsg && (
            <p
              role="alert"
              className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5"
            >
              {errorMsg}
            </p>
          )}

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 min-h-[44px] text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 min-h-[44px] text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
            >
              {editingQuestion ? 'Guardar cambios' : 'Guardar pregunta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

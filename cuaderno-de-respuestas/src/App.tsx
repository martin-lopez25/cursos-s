import {
  ArrowLeft,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Search,
  X,
} from 'lucide-react';
import {useEffect, useMemo, useState} from 'react';
import {Header} from './components/Header';
import {HomeView} from './components/HomeView';
import {QuestionCard} from './components/QuestionCard';
import {
  INITIAL_COURSES,
  INITIAL_QUESTIONS,
  MODULE_ONE_EXAM_COURSE,
  MODULE_ONE_EXAM_QUESTIONS,
  MODULE_TWO_EXAM_COURSE,
  MODULE_TWO_EXAM_QUESTIONS,
  MODULE_THREE_EXAM_COURSE,
  MODULE_THREE_EXAM_QUESTIONS,
  MODULE_FOUR_EXAM_COURSE,
  MODULE_FOUR_EXAM_QUESTIONS,
} from './data/initialData';
import {
  ActiveSection,
  Course,
  QuestionItem,
} from './types/course';

const COURSES_STORAGE_KEY = 'cuaderno_respuestas_courses_v1';
const QUESTIONS_STORAGE_KEY = 'cuaderno_respuestas_questions_v1';
const MODULE_ONE_EXAM_SEED_KEY = 'cuaderno_respuestas_module_one_exam_seed_v1';
const MODULE_TWO_EXAM_SEED_KEY = 'cuaderno_respuestas_module_two_exam_seed_v2';
const MODULE_THREE_EXAM_SEED_KEY = 'cuaderno_respuestas_module_three_exam_seed_v1';
const MODULE_FOUR_EXAM_SEED_KEY = 'cuaderno_respuestas_module_four_exam_seed_v1';

interface AppHistoryEntry {
  cuadernoAppView?: {
    section: ActiveSection;
    selectedCourseId: string;
  };
}

const DEFAULT_APP_ROUTE: AppHistoryEntry['cuadernoAppView'] = {
  section: 'home',
  selectedCourseId: 'all',
};

function getInitialAppRoute() {
  const historyEntry = window.history.state as AppHistoryEntry | null;
  return historyEntry?.cuadernoAppView ?? DEFAULT_APP_ROUTE!;
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed as T;
  } catch {
    return fallback;
  }
}

function isModuleOneExamSeeded(): boolean {
  try {
    return localStorage.getItem(MODULE_ONE_EXAM_SEED_KEY) === 'true';
  } catch {
    return false;
  }
}

function isModuleTwoExamSeeded(): boolean {
  try {
    return localStorage.getItem(MODULE_TWO_EXAM_SEED_KEY) === 'true';
  } catch {
    return false;
  }
}

function isModuleThreeExamSeeded(): boolean {
  try {
    return localStorage.getItem(MODULE_THREE_EXAM_SEED_KEY) === 'true';
  } catch {
    return false;
  }
}

function isModuleFourExamSeeded(): boolean {
  try {
    return localStorage.getItem(MODULE_FOUR_EXAM_SEED_KEY) === 'true';
  } catch {
    return false;
  }
}

function loadCourses(): Course[] {
  let storedCourses = loadFromStorage<Course[]>(
    COURSES_STORAGE_KEY,
    INITIAL_COURSES,
  );

  if (
    !isModuleOneExamSeeded() &&
    !storedCourses.some((course) => course.id === MODULE_ONE_EXAM_COURSE.id)
  ) {
    storedCourses = [...storedCourses, MODULE_ONE_EXAM_COURSE];
  }
  if (
    !isModuleTwoExamSeeded() &&
    !storedCourses.some((course) => course.id === MODULE_TWO_EXAM_COURSE.id)
  ) {
    storedCourses = [...storedCourses, MODULE_TWO_EXAM_COURSE];
  }
  if (
    !isModuleThreeExamSeeded() &&
    !storedCourses.some((course) => course.id === MODULE_THREE_EXAM_COURSE.id)
  ) {
    storedCourses = [...storedCourses, MODULE_THREE_EXAM_COURSE];
  }
  if (
    !isModuleFourExamSeeded() &&
    !storedCourses.some((course) => course.id === MODULE_FOUR_EXAM_COURSE.id)
  ) {
    storedCourses = [...storedCourses, MODULE_FOUR_EXAM_COURSE];
  }
  return storedCourses;
}

function loadQuestions(): QuestionItem[] {
  let storedQuestions = loadFromStorage<QuestionItem[]>(
    QUESTIONS_STORAGE_KEY,
    INITIAL_QUESTIONS,
  );

  if (!isModuleOneExamSeeded()) {
    const existingIds = new Set(storedQuestions.map((question) => question.id));
    const missingExamQuestions = MODULE_ONE_EXAM_QUESTIONS.filter(
      (question) => !existingIds.has(question.id),
    );
    storedQuestions = [...storedQuestions, ...missingExamQuestions];
  }

  if (!isModuleTwoExamSeeded()) {
    const existingIds = new Set(storedQuestions.map((question) => question.id));
    const missingExamQuestions = MODULE_TWO_EXAM_QUESTIONS.filter(
      (question) => !existingIds.has(question.id),
    );
    storedQuestions = [...storedQuestions, ...missingExamQuestions];
  }

  if (!isModuleThreeExamSeeded()) {
    const existingIds = new Set(storedQuestions.map((question) => question.id));
    const missingExamQuestions = MODULE_THREE_EXAM_QUESTIONS.filter(
      (question) => !existingIds.has(question.id),
    );
    storedQuestions = [...storedQuestions, ...missingExamQuestions];
  }

  if (!isModuleFourExamSeeded()) {
    const existingIds = new Set(storedQuestions.map((question) => question.id));
    const missingExamQuestions = MODULE_FOUR_EXAM_QUESTIONS.filter(
      (question) => !existingIds.has(question.id),
    );
    storedQuestions = [...storedQuestions, ...missingExamQuestions];
  }

  return storedQuestions;
}

export default function App() {
  const [courses] = useState<Course[]>(loadCourses);
  const [questions] = useState<QuestionItem[]>(loadQuestions);

  const [initialAppRoute] = useState(getInitialAppRoute);
  const [activeSection, setActiveSection] = useState<ActiveSection>(
    initialAppRoute.section,
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialAppRoute.selectedCourseId,
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const historyEntry = window.history.state as AppHistoryEntry | null;
    if (!historyEntry?.cuadernoAppView) {
      window.history.replaceState(
        {cuadernoAppView: initialAppRoute},
        '',
        window.location.href,
      );
    }

    const handlePopState = (event: PopStateEvent) => {
      const entry = event.state as AppHistoryEntry | null;
      const route = entry?.cuadernoAppView ?? DEFAULT_APP_ROUTE!;
      setActiveSection(route.section);
      setSelectedCourseId(route.selectedCourseId);
      setSearchQuery('');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [initialAppRoute]);

  useEffect(() => {
    try {
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
      localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
      if (
        courses.some((course) => course.id === MODULE_ONE_EXAM_COURSE.id) &&
        MODULE_ONE_EXAM_QUESTIONS.every((question) =>
          questions.some((storedQuestion) => storedQuestion.id === question.id),
        )
      ) {
        localStorage.setItem(MODULE_ONE_EXAM_SEED_KEY, 'true');
      }
      if (
        courses.some((course) => course.id === MODULE_TWO_EXAM_COURSE.id) &&
        MODULE_TWO_EXAM_QUESTIONS.every((question) =>
          questions.some((storedQuestion) => storedQuestion.id === question.id),
        )
      ) {
        localStorage.setItem(MODULE_TWO_EXAM_SEED_KEY, 'true');
      }
      if (
        courses.some((course) => course.id === MODULE_THREE_EXAM_COURSE.id) &&
        MODULE_THREE_EXAM_QUESTIONS.every((question) =>
          questions.some((storedQuestion) => storedQuestion.id === question.id),
        )
      ) {
        localStorage.setItem(MODULE_THREE_EXAM_SEED_KEY, 'true');
      }
      if (
        courses.some((course) => course.id === MODULE_FOUR_EXAM_COURSE.id) &&
        MODULE_FOUR_EXAM_QUESTIONS.every((question) =>
          questions.some((storedQuestion) => storedQuestion.id === question.id),
        )
      ) {
        localStorage.setItem(MODULE_FOUR_EXAM_SEED_KEY, 'true');
      }
    } catch {
      // Ignore storage quota errors
    }
  }, [courses, questions]);

  const handleSelectSection = (section: ActiveSection) => {
    navigateTo(section, 'all');
  };

  const navigateTo = (section: ActiveSection, courseId = 'all') => {
    const route = {section, selectedCourseId: courseId};
    const currentEntry = window.history.state as AppHistoryEntry | null;
    if (
      currentEntry?.cuadernoAppView?.section === route.section &&
      currentEntry.cuadernoAppView.selectedCourseId === route.selectedCourseId
    ) {
      return;
    }

    window.history.pushState({cuadernoAppView: route}, '', window.location.href);
    setActiveSection(route.section);
    setSelectedCourseId(route.selectedCourseId);
    setSearchQuery('');
  };

  const courseMap = useMemo(
    () => new Map(courses.map((course) => [course.id, course])),
    [courses],
  );

  const filteredQuestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return questions.filter((item) => {
      if (selectedCourseId !== 'all' && item.courseId !== selectedCourseId) {
        return false;
      }
      if (!q) return true;

      const courseName = courseMap.get(item.courseId)?.name.toLowerCase() || '';
      const inPrompt = item.prompt.toLowerCase().includes(q);
      const inModule = item.moduleName.toLowerCase().includes(q);
      const inNumber = item.questionNumber.toLowerCase().includes(q);
      const inStatements = item.statements.some((s) =>
        s.toLowerCase().includes(q),
      );
      const inOptions = item.options.some((o) =>
        o.text.toLowerCase().includes(q),
      );
      const inExplanation = (item.explanation || '').toLowerCase().includes(q);

      return (
        courseName.includes(q) ||
        inPrompt ||
        inModule ||
        inNumber ||
        inStatements ||
        inOptions ||
        inExplanation
      );
    });
  }, [questions, selectedCourseId, searchQuery, courseMap]);

  const handleOpenExam = (courseId: string) => {
    navigateTo('bank', courseId);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const activeCourse =
    selectedCourseId === 'all' ? null : courseMap.get(selectedCourseId);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50 text-slate-900">
      <Header
        onSelectSection={handleSelectSection}
      />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeSection === 'home' && (
          <HomeView
            onOpenModuleOne={() => navigateTo('module-one')}
            onOpenModuleTwo={() => navigateTo('module-two')}
            onOpenModuleThree={() => navigateTo('module-three')}
            onOpenModuleFour={() => navigateTo('module-four')}
          />
        )}

        {activeSection === 'module-one' && (
          <section className="max-w-3xl space-y-5">
            <button
              type="button"
              onClick={handleGoBack}
              className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-blue-800 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Regresar
            </button>
            <div>
              <p className="text-sm font-bold uppercase text-cyan-800">Módulo 1</p>
              <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-blue-950 text-balance">
                Cultura de ciberseguridad para personas servidoras públicas
              </h1>
            </div>
            <div className="border-t border-blue-200 pt-5">
              <button
                type="button"
                onClick={() => handleOpenExam(MODULE_ONE_EXAM_COURSE.id)}
                className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-cyan-200 bg-white px-4 py-3 font-bold text-blue-950 shadow-sm transition-colors hover:border-cyan-400 hover:bg-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
              >
                <BookOpen className="h-5 w-5 text-cyan-800" aria-hidden="true" />
                Examen
              </button>
            </div>
          </section>
        )}

        {activeSection === 'module-two' && (
          <section className="max-w-3xl space-y-5">
            <button
              type="button"
              onClick={handleGoBack}
              className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-blue-800 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Regresar
            </button>
            <div>
              <p className="text-sm font-bold uppercase text-cyan-800">Módulo 2</p>
              <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-blue-950 text-balance">
                Ética, práctica y mística del servicio público
              </h1>
            </div>
            <div className="border-t border-blue-200 pt-5">
              <button
                type="button"
                onClick={() => handleOpenExam(MODULE_TWO_EXAM_COURSE.id)}
                className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-cyan-200 bg-white px-4 py-3 font-bold text-blue-950 shadow-sm transition-colors hover:border-cyan-400 hover:bg-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
              >
                <BookOpen className="h-5 w-5 text-cyan-800" aria-hidden="true" />
                Examen
              </button>
            </div>
          </section>
        )}

        {activeSection === 'module-three' && (
          <section className="max-w-3xl space-y-5">
            <button
              type="button"
              onClick={handleGoBack}
              className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-blue-800 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Regresar
            </button>
            <div>
              <p className="text-sm font-bold uppercase text-cyan-800">Módulo 3</p>
              <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-blue-950 text-balance">
                Formación en igualdad sustantiva y derechos de las mujeres
              </h1>
            </div>
            <div className="border-t border-blue-200 pt-5">
              <button
                type="button"
                onClick={() => handleOpenExam(MODULE_THREE_EXAM_COURSE.id)}
                className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-cyan-200 bg-white px-4 py-3 font-bold text-blue-950 shadow-sm transition-colors hover:border-cyan-400 hover:bg-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
              >
                <BookOpen className="h-5 w-5 text-cyan-800" aria-hidden="true" />
                Examen
              </button>
            </div>
          </section>
        )}

        {activeSection === 'module-four' && (
          <section className="max-w-3xl space-y-5">
            <button
              type="button"
              onClick={handleGoBack}
              className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-blue-800 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Regresar
            </button>
            <div>
              <p className="text-sm font-bold uppercase text-cyan-800">Módulo 4</p>
              <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-blue-950 text-balance">
                Protección de datos personales: cumplimiento y buenas prácticas
              </h1>
            </div>
            <div
              role="alert"
              className="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-950"
            >
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
              <div>
                <p className="font-bold">Aviso</p>
                <p className="mt-1 text-sm leading-relaxed">
                  Hay más evaluaciones pendientes de completar. La plataforma no permitió revisar sus contenidos; las preguntas restantes se pueden preparar con apoyo de ChatGPT.
                </p>
              </div>
            </div>
            <div className="border-t border-blue-200 pt-5">
              <button
                type="button"
                onClick={() => handleOpenExam(MODULE_FOUR_EXAM_COURSE.id)}
                className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-cyan-200 bg-white px-4 py-3 font-bold text-blue-950 shadow-sm transition-colors hover:border-cyan-400 hover:bg-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
              >
                <BookOpen className="h-5 w-5 text-cyan-800" aria-hidden="true" />
                Examen
              </button>
            </div>
          </section>
        )}

        {activeSection === 'bank' && (
          <div className="space-y-5 min-w-0">
              <button
                type="button"
                onClick={handleGoBack}
                className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-blue-800 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Regresar
              </button>
              {/* Section Heading + Unboxed Metadata Summary */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
                    {activeCourse
                      ? activeCourse.name
                      : 'Banco de respuestas'}
                  </h1>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
                    <span className="tabular-nums">
                      {filteredQuestions.length}{' '}
                      {filteredQuestions.length === 1 ? 'pregunta' : 'preguntas'}
                    </span>
                  </div>
                </div>

                <div
                  aria-label="Modo de visualización: respuestas"
                  className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[38px] text-sm font-semibold text-blue-950 bg-cyan-100 border border-cyan-200 rounded-lg self-start sm:self-auto shrink-0"
                >
                  <CheckCircle2 className="h-4 w-4 text-cyan-800" aria-hidden="true" />
                  Respuestas
                </div>
              </div>

              {/* Search Toolbar */}
              <div className="relative">
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por pregunta, numeral, módulo o respuesta..."
                  aria-label="Buscar preguntas"
                  className="w-full h-11 pl-10 pr-10 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Limpiar búsqueda"
                    className="w-9 h-9 inline-flex items-center justify-center absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Questions List or Empty State */}
              {filteredQuestions.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-10 text-center">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-600 inline-flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-base sm:text-lg font-semibold text-slate-900">
                    {searchQuery
                      ? 'No se encontraron coincidencias'
                      : 'Aún no hay preguntas en esta sección'}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 max-w-md mx-auto">
                    {searchQuery
                      ? 'Intenta con otras palabras clave o cambia el filtro de curso.'
                      : 'No hay preguntas disponibles en este examen.'}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="px-4 py-2.5 min-h-[44px] text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Limpiar búsqueda
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {filteredQuestions.map((question) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      course={courseMap.get(question.courseId)}
                    />
                  ))}
                </div>
              )}
            </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            Cuaderno de Respuestas — Guardado automático local en tu navegador.
          </p>
        </div>
      </footer>
    </div>
  );
}

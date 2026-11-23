import {ArrowRight, Pencil, Plus, Trash2} from 'lucide-react';
import {FormEvent, useState} from 'react';
import {Course, QuestionItem} from '../types/course';

interface CourseManagerViewProps {
  courses: Course[];
  questions: QuestionItem[];
  onCreateCourse: (name: string, description: string) => void;
  onUpdateCourse: (id: string, name: string, description: string) => void;
  onDeleteCourse: (id: string) => void;
  onOpenCourseQuestions: (courseId: string) => void;
}

export function CourseManagerView({
  courses,
  questions,
  onCreateCourse,
  onUpdateCourse,
  onDeleteCourse,
  onOpenCourseQuestions,
}: CourseManagerViewProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreateCourse(name.trim(), description.trim());
    setName('');
    setDescription('');
  };

  const startEdit = (course: Course) => {
    setEditingId(course.id);
    setEditName(course.name);
    setEditDescription(course.description);
    setConfirmDeleteId(null);
  };

  const handleSaveEdit = (e: FormEvent, id: string) => {
    e.preventDefault();
    if (!editName.trim()) return;
    onUpdateCourse(id, editName.trim(), editDescription.trim());
    setEditingId(null);
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
          Gestión de cursos
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-2xl">
          Organiza tus respuestas por materia, diplomado o certificación para encontrar cada tema rápidamente.
        </p>
      </div>

      {/* Create Course Form */}
      <form
        onSubmit={handleCreate}
        className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4"
      >
        <h2 className="font-display text-base font-semibold text-slate-900">
          Agregar nuevo curso
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="new-course-name"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Nombre del curso
            </label>
            <input
              id="new-course-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Derechos Humanos y Perspectiva de Género"
              className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="new-course-desc"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Descripción breve (opcional)
            </label>
            <input
              id="new-course-desc"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej. Evaluaciones parciales y cuestionario final"
              className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Crear curso
          </button>
        </div>
      </form>

      {/* Course Grid */}
      {courses.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
          <p className="text-base font-medium text-slate-800">
            Aún no hay cursos registrados.
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Crea tu primer curso arriba para comenzar a agrupar tus respuestas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => {
            const count = questions.filter((q) => q.courseId === course.id).length;
            const isEditing = editingId === course.id;
            const isConfirmingDelete = confirmDeleteId === course.id;

            return (
              <div
                key={course.id}
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4"
              >
                {isEditing ? (
                  <form
                    onSubmit={(e) => handleSaveEdit(e, course.id)}
                    className="space-y-3"
                  >
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-900 focus:border-blue-700 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Descripción del curso"
                      className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm text-slate-700 focus:border-blue-700 focus:outline-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer"
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-base font-semibold text-slate-900">
                          {course.name}
                        </h3>
                        <span className="font-mono text-xs text-slate-500 tabular-nums shrink-0">
                          {count} {count === 1 ? 'pregunta' : 'preguntas'}
                        </span>
                      </div>
                      {course.description && (
                        <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                          {course.description}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => onOpenCourseQuestions(course.id)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 py-1.5 cursor-pointer"
                      >
                        <span>Ver preguntas</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => startEdit(course)}
                          aria-label={`Editar ${course.name}`}
                          className="inline-flex items-center gap-1 px-2.5 min-h-[38px] text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                          Editar
                        </button>

                        {isConfirmingDelete ? (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                onDeleteCourse(course.id);
                                setConfirmDeleteId(null);
                              }}
                              className="px-2.5 min-h-[38px] text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"
                            >
                              Eliminar{count > 0 ? ` (${count})` : ''}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-2.5 min-h-[38px] text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(course.id)}
                            aria-label={`Eliminar ${course.name}`}
                            className="inline-flex items-center gap-1 px-2.5 min-h-[38px] text-xs font-medium text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                            Eliminar
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

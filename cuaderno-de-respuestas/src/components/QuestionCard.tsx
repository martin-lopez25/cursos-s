import {CheckCircle2} from 'lucide-react';
import {Course, QuestionItem} from '../types/course';

interface QuestionCardProps {
  question: QuestionItem;
  course?: Course;
}

export function QuestionCard({question, course}: QuestionCardProps) {
  return (
    <article className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 transition-colors">
      <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-slate-500 min-w-0">
          <span className="font-mono font-medium text-slate-700 tabular-nums">
            {question.questionNumber || 'Pregunta'}
          </span>
          {question.moduleName && (
            <>
              <span aria-hidden="true">·</span>
              <span className="truncate max-w-[240px] sm:max-w-xs">
                {question.moduleName}
              </span>
            </>
          )}
          {course && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-slate-600 font-medium truncate max-w-[260px] sm:max-w-sm">
                {course.name}
              </span>
            </>
          )}
        </div>

      </div>

      {/* Question Prompt */}
      <h3 className="mt-4 font-display text-base sm:text-lg font-semibold text-slate-900 leading-snug text-balance">
        {question.prompt}
      </h3>

      {/* Optional numbered premise/factor statements */}
      {question.statements.length > 0 && (
        <ol className="mt-4 space-y-2 bg-slate-50 border border-slate-200/80 rounded-lg p-4">
          {question.statements.map((statement, index) => (
            <li
              key={`${question.id}-stmt-${index}`}
              className="flex items-baseline gap-3 text-sm sm:text-[15px] text-slate-700 leading-relaxed"
            >
              <span className="font-mono text-xs sm:text-sm font-semibold text-slate-500 tabular-nums shrink-0 w-5 text-right">
                {index + 1}.
              </span>
              <span>{statement}</span>
            </li>
          ))}
        </ol>
      )}

      {/* Multiple-Choice Options */}
      <div className="mt-5 space-y-2.5" role="group" aria-label="Opciones de respuesta">
        {question.options.map((option) => {
          const isCorrectOption = option.letter === question.correctLetter;
          return (
            <div
              key={`${question.id}-opt-${option.letter}`}
              className={`flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 px-4 py-3 rounded-lg border text-sm sm:text-[15px] transition-colors ${
                isCorrectOption
                  ? 'bg-emerald-50/80 border-emerald-300 text-slate-900'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-baseline gap-3 min-w-0">
                <span
                  className={`font-mono text-sm font-semibold tabular-nums shrink-0 ${
                    isCorrectOption ? 'text-emerald-800' : 'text-slate-500'
                  }`}
                >
                  {option.letter}.
                </span>
                <span className={isCorrectOption ? 'font-medium text-slate-900' : ''}>
                  {option.text}
                </span>
              </div>

              {isCorrectOption && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 shrink-0 whitespace-nowrap">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                  Respuesta correcta
                </span>
              )}
            </div>
          );
        })}
      </div>

      {question.explanation && (
        <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 leading-relaxed">
          <span className="font-semibold text-slate-900">Justificación: </span>
          {question.explanation}
        </div>
      )}
    </article>
  );
}

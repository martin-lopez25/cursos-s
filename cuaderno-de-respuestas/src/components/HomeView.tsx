import {AlertTriangle, BadgeCheck, ShieldCheck} from 'lucide-react';

interface HomeViewProps {
  onOpenModuleOne: () => void;
  onOpenModuleTwo: () => void;
  onOpenModuleThree: () => void;
  onOpenModuleFour: () => void;
}

export function HomeView({
  onOpenModuleOne,
  onOpenModuleTwo,
  onOpenModuleThree,
  onOpenModuleFour,
}: HomeViewProps) {
  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="border-b border-blue-200 pb-7 sm:pb-8">
        <div className="mt-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-blue-950 text-balance">
              Capacitación buen gobierno
            </h1>
            <p className="mt-2 text-sm sm:text-base text-blue-900/75">
              Selecciona un módulo para consultar sus respuestas del examen.
            </p>
          </div>
          <span className="text-sm font-semibold text-blue-800 tabular-nums">4 módulos</span>
        </div>
      </section>

      <div
        role="note"
        aria-label="Aviso sobre actividades y constancia"
        className="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-950"
      >
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
        <div>
          <p className="font-bold">Importante para obtener la constancia</p>
          <p className="mt-1 text-sm leading-relaxed">
            Algunos módulos requieren completar actividades como memoramas, juegos interactivos y pequeñas encuestas. Para obtener la constancia, también debes responder la encuesta de satisfacción.
          </p>
        </div>
      </div>

      <section aria-label="Módulos disponibles" className="grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={onOpenModuleOne}
          className="md:col-span-2 flex min-h-32 w-full items-center gap-4 rounded-xl border border-blue-300 bg-gradient-to-r from-blue-800 via-blue-700 to-cyan-700 p-5 text-left text-white shadow-lg shadow-blue-900/10 transition-colors hover:border-cyan-200 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
        >
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/15 text-cyan-200 ring-1 ring-white/20">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-cyan-200">Módulo 1</p>
            <h2 className="mt-1 font-display text-lg sm:text-xl font-bold text-white text-balance">
              Cultura de ciberseguridad para personas servidoras públicas
            </h2>
          </div>
        </button>

        <button
          type="button"
          onClick={onOpenModuleTwo}
          className="md:col-span-2 flex min-h-32 w-full items-center gap-4 rounded-xl border border-cyan-300 bg-gradient-to-r from-cyan-700 via-sky-700 to-blue-800 p-5 text-left text-white shadow-lg shadow-cyan-900/10 transition-colors hover:border-cyan-200 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
        >
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/15 text-cyan-100 ring-1 ring-white/20">
            <BadgeCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-cyan-100">Módulo 2</p>
            <h2 className="mt-1 font-display text-lg sm:text-xl font-bold text-white text-balance">
              Ética, práctica y mística del servicio público
            </h2>
          </div>
        </button>

        <button
          type="button"
          onClick={onOpenModuleThree}
          className="md:col-span-2 flex min-h-32 w-full items-center gap-4 rounded-xl border border-blue-300 bg-gradient-to-r from-blue-700 via-sky-700 to-cyan-700 p-5 text-left text-white shadow-lg shadow-blue-900/10 transition-colors hover:border-cyan-200 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
        >
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/15 text-cyan-100 ring-1 ring-white/20">
            <BadgeCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-cyan-100">Módulo 3</p>
            <h2 className="mt-1 font-display text-lg sm:text-xl font-bold text-white text-balance">
              Formación en igualdad sustantiva y derechos de las mujeres
            </h2>
          </div>
        </button>

        <button
          type="button"
          onClick={onOpenModuleFour}
          className="md:col-span-2 flex min-h-32 w-full items-center gap-4 rounded-xl border border-cyan-300 bg-gradient-to-r from-cyan-800 via-blue-800 to-blue-950 p-5 text-left text-white shadow-lg shadow-blue-950/10 transition-colors hover:border-cyan-200 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
        >
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/15 text-cyan-100 ring-1 ring-white/20">
            <BadgeCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-cyan-100">Módulo 4</p>
            <h2 className="mt-1 font-display text-lg sm:text-xl font-bold text-white text-balance">
              Protección de datos personales: cumplimiento y buenas prácticas
            </h2>
          </div>
        </button>
      </section>
    </div>
  );
}
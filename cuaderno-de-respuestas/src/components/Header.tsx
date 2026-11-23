import {ActiveSection} from '../types/course';

interface HeaderProps {
  onSelectSection: (section: ActiveSection) => void;
}

export function Header({onSelectSection}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-blue-950 via-blue-900 to-cyan-900 text-white shadow-sm shadow-blue-950/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        <button
          type="button"
          onClick={() => onSelectSection('home')}
          className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 rounded"
        >
          Inicio
        </button>
      </div>
    </header>
  );
}

import { Network } from 'lucide-react';

type Page = 'landing' | 'flsm' | 'vlsm' | 'about';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 hover:opacity-80 transition-smooth"
          >
            <Network className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-slate-950 dark:text-white">NETPLAN</span>
          </button>

          {/* Navigation Links */}
          <div className="hidden sm:flex items-center gap-8">
            <button
              onClick={() => onNavigate('landing')}
              className={`text-sm font-medium transition-smooth ${
                currentPage === 'landing'
                  ? 'text-blue-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200'
              }`}
            >
              Simulator
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`text-sm font-medium transition-smooth ${
                currentPage === 'about'
                  ? 'text-blue-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200'
              }`}
            >
              About
            </button>
          </div>

          {/* Mobile Menu Placeholder */}
          <div className="sm:hidden w-8 h-8" />
        </div>
      </div>
    </nav>
  );
}

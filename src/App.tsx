import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Landing } from './components/Landing';
import { FLSMWorkflow } from './components/FLSMWorkflow';
import { VLSMWorkflow } from './components/VLSMWorkflow';
import { About } from './components/About';

type Page = 'landing' | 'flsm' | 'vlsm' | 'about';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'flsm':
        return <FLSMWorkflow onBack={() => setCurrentPage('landing')} />;
      case 'vlsm':
        return <VLSMWorkflow onBack={() => setCurrentPage('landing')} />;
      case 'about':
        return <About onBack={() => setCurrentPage('landing')} />;
      default:
        return <Landing onSelectMode={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="pt-16">
        {renderPage()}
      </main>
    </div>
  );
}

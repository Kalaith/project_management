import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Landing } from './components/project/Landing';
import { Questionnaire } from './components/project/Questionnaire';
import { QuestionnaireData, ProjectResults } from './types/project';
import { Processing } from './components/project/Processing';
import { Results } from './components/project/Results';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { useProjectStore } from './stores/useProjectStore';
import { analyzeProject } from './utils/reportGenerator';
import { exportJSON } from './utils/exporter';

type View = 'landing' | 'questionnaire' | 'processing' | 'results';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [formData, setFormData] = useState<QuestionnaireData | null>(null);
  const [results, setResults] = useState<ProjectResults | null>(null);
  const resetStore = useProjectStore(state => state.reset);

  const handleStart = () => setView('questionnaire');
  const handleReset = () => {
    setFormData(null);
    setResults(null);
    setView('landing');
    resetStore(); // Reset the Zustand store to clear form inputs
  };
  const handleGenerate = (data: QuestionnaireData) => {
    setFormData(data);
    setView('processing');
    // Run analysis
    setTimeout(() => {
      const analyzed = analyzeProject(data);
      setResults(analyzed);
      setView('results');
    }, 800);
  };
  const handleExport = () => {
    const payload = { meta: { exportedAt: Date.now() }, form: formData, results };
    exportJSON(
      payload,
      `${(formData?.projectName || 'project').replace(/[^a-z0-9-_]/gi, '_')}.json`
    );
  };
  const handleNewProject = () => handleReset();

  return (
    <ErrorBoundary>
      <div id="app">
        <Header onReset={handleReset} />
        <main className="main">
          <ErrorBoundary>
            {view === 'landing' && <Landing onStart={handleStart} />}
            {view === 'questionnaire' && <Questionnaire onGenerate={handleGenerate} />}
            {view === 'processing' && <Processing />}
            {view === 'results' && results && (
              <Results
                onExport={handleExport}
                onNewProject={handleNewProject}
                projectCharter={results.projectCharter}
                riskAssessment={results.riskAssessment}
                timelineOverview={results.timelineOverview}
                stakeholderAnalysis={results.stakeholderAnalysis}
                {...(results.llmPrompt && { llmPrompt: results.llmPrompt })}
              />
            )}
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;

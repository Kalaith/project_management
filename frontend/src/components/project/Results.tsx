import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Container } from '../layout/Container';

interface ResultsProps {
  onExport: () => void;
  onNewProject: () => void;
  projectCharter: string;
  riskAssessment: string;
  timelineOverview: string;
  stakeholderAnalysis: string;
  llmPrompt?: string;
}

export const Results: React.FC<ResultsProps> = ({
  onExport,
  onNewProject,
  projectCharter,
  riskAssessment,
  timelineOverview,
  stakeholderAnalysis,
  llmPrompt,
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyPrompt = async () => {
    if (llmPrompt || projectCharter) {
      try {
        await navigator.clipboard.writeText(llmPrompt || projectCharter);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  // If we have an LLM prompt, show the prompt interface
  if (llmPrompt || projectCharter.includes('You are an expert project management consultant')) {
    return (
      <Container>
        <section className="results py-12">
          <div className="results__header flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">🤖 LLM Prompt Ready</h2>
            <div className="results__actions flex gap-2">
              <Button variant="outline" onClick={onExport}>
                Export Results
              </Button>
              <Button variant="outline" onClick={onNewProject}>
                New Project
              </Button>
            </div>
          </div>
          
          <div className="results__content">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                📝 Ready for AI Analysis
              </h3>
              <p className="text-blue-700 mb-4">
                Your project questionnaire has been converted into a structured prompt. 
                Copy this prompt and paste it into ChatGPT, Claude, or your preferred AI assistant for comprehensive project analysis.
              </p>
              
              <div className="flex gap-2 mb-4">
                <Button onClick={handleCopyPrompt} className="bg-blue-600 hover:bg-blue-700">
                  {copied ? '✅ Copied!' : '📋 Copy Prompt'}
                </Button>
                <Button variant="outline" onClick={() => window.open('https://chat.openai.com', '_blank')}>
                  🚀 Open ChatGPT
                </Button>
              </div>
            </div>

            <div className="result-card p-4 bg-white rounded shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">🎯 LLM Prompt</h3>
                <span className="text-sm text-gray-500">
                  {(llmPrompt || projectCharter).length} characters
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded border max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
                  {llmPrompt || projectCharter}
                </pre>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded">
                <h4 className="font-semibold text-green-800">✅ What You'll Get</h4>
                <p className="text-sm text-green-700 mt-2">
                  Professional project charter, risk analysis, timeline, and stakeholder recommendations
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded">
                <h4 className="font-semibold text-yellow-800">⚡ Next Steps</h4>
                <p className="text-sm text-yellow-700 mt-2">
                  Copy prompt → Paste in AI tool → Get comprehensive project analysis
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded">
                <h4 className="font-semibold text-purple-800">🎯 AI Platforms</h4>
                <p className="text-sm text-purple-700 mt-2">
                  Works with ChatGPT, Claude, Gemini, or any AI assistant
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>
    );
  }

  // Fallback to old format if needed
  return (
    <Container>
      <section className="results py-12">
        <div className="results__header flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Project Analysis Complete</h2>
          <div className="results__actions flex gap-2">
            <Button variant="outline" onClick={onExport}>
              Export Results
            </Button>
            <Button variant="outline" onClick={onNewProject}>
              New Project
            </Button>
          </div>
        </div>
        <div className="results__content">
          <div className="results__grid grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="result-card p-4 bg-white rounded shadow">
              <h3 className="font-semibold mb-2">📋 Project Charter</h3>
              <div>{projectCharter}</div>
            </div>
            <div className="result-card p-4 bg-white rounded shadow">
              <h3 className="font-semibold mb-2">⚠️ Risk Assessment</h3>
              <div>{riskAssessment}</div>
            </div>
            <div className="result-card p-4 bg-white rounded shadow">
              <h3 className="font-semibold mb-2">📅 Timeline Overview</h3>
              <div>{timelineOverview}</div>
            </div>
            <div className="result-card p-4 bg-white rounded shadow">
              <h3 className="font-semibold mb-2">👥 Stakeholder Analysis</h3>
              <div>{stakeholderAnalysis}</div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

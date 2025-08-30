import React from 'react';
import { Button } from '../ui/Button';
import { KeyboardHint } from '../ui/KeyboardHint';
import { Container } from '../layout/Container';

export const Landing: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <Container>
    <section className="landing py-12">
      <div className="landing__hero text-center">
        <h2 className="landing__title text-3xl font-bold mb-2">Welcome to AI Project Manager</h2>
        <p className="landing__subtitle mb-6 text-lg text-gray-700">
          Let our AI help you create comprehensive project plans through guided questionnaires and
          intelligent analysis.
        </p>
        <div className="landing__features grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="feature-card p-4 bg-white rounded shadow">
            <h3 className="font-semibold mb-1">Smart Questionnaire</h3>
            <p>Multi-step form to capture all project details with auto-save and templates</p>
          </div>
          <div className="feature-card p-4 bg-white rounded shadow">
            <h3 className="font-semibold mb-1">AI Analysis</h3>
            <p>Generate project charters, risk assessments, and timelines</p>
          </div>
          <div className="feature-card p-4 bg-white rounded shadow">
            <h3 className="font-semibold mb-1">Export Results</h3>
            <p>Download in multiple formats: PDF, HTML, CSV, or JSON</p>
          </div>
        </div>
        <Button variant="primary" size="lg" onClick={onStart}>
          Start New Project
        </Button>
        <KeyboardHint />
      </div>
    </section>
  </Container>
);

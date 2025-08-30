import React from 'react';
import { Container } from '../layout/Container';

export const Processing: React.FC = () => (
  <Container>
    <section className="processing py-12 flex flex-col items-center justify-center">
      <div className="processing__content text-center">
        <div className="spinner mb-4 mx-auto" />
        <h2 className="text-2xl font-bold mb-2">Generating Your Project Plan</h2>
        <p className="mb-6">
          Our AI is analyzing your responses and creating comprehensive project documentation...
        </p>
        <div className="processing__steps grid gap-2">
          <div className="processing-step">✓ Analyzing project requirements</div>
          <div className="processing-step">⏳ Generating project charter</div>
          <div className="processing-step">⏳ Assessing risks</div>
          <div className="processing-step">⏳ Creating timeline</div>
          <div className="processing-step">⏳ Finalizing recommendations</div>
        </div>
      </div>
    </section>
  </Container>
);

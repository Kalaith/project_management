import React, { useState } from 'react';
import { ProgressBar, ProgressStep } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { useProjectStore } from '../../stores/useProjectStore';
import { QuestionnaireData as QType } from '../../types/project';

const steps: ProgressStep[] = [
  { number: 1, label: 'Basics' },
  { number: 2, label: 'Stakeholders' },
  { number: 3, label: 'Scope' },
  { number: 4, label: 'Resources' },
  { number: 5, label: 'Risks' },
];

interface QuestionnaireProps {
  onGenerate: (data: QType) => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({ onGenerate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const questionnaire = useProjectStore(state => state.questionnaire);
  const setField = useProjectStore(state => state.setField);
  const addStakeholder = useProjectStore(state => state.addStakeholder);
  const updateStakeholder = useProjectStore(state => state.updateStakeholder);
  const removeStakeholder = useProjectStore(state => state.removeStakeholder);

  const [newStakeholderName, setNewStakeholderName] = useState('');
  const [newStakeholderRole, setNewStakeholderRole] = useState('');

  const canNext = () => {
    // Basic validation per step
    if (currentStep === 1) {
      return (
        questionnaire.projectName.trim().length > 0 &&
        questionnaire.projectDescription.trim().length > 0
      );
    }
    if (currentStep === 2) {
      return true; // stakeholders optional
    }
    if (currentStep === 3)
      return (
        questionnaire.objectives.trim().length > 0 && questionnaire.deliverables.trim().length > 0
      );
    if (currentStep === 4)
      return questionnaire.teamSize.trim().length > 0 && questionnaire.budget.trim().length > 0;
    return true;
  };

  const handleAddStakeholder = () => {
    if (!newStakeholderName.trim()) return;
    addStakeholder({ name: newStakeholderName.trim(), role: newStakeholderRole.trim() });
    setNewStakeholderName('');
    setNewStakeholderRole('');
  };

  const handleGenerate = () => {
    onGenerate(questionnaire);
  };

  return (
    <div className="questionnaire py-8">
      <div className="container mx-auto">
        <ProgressBar steps={steps} currentStep={currentStep} />

        {/* Step content */}
        {currentStep === 1 && (
          <section className="form-step bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Project Basics</h2>
            <p className="text-sm text-gray-600 mb-4">
              Let's start with the fundamental details of your project
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Project Name *</label>
                <input
                  className="form-control mt-1 w-full p-2 border rounded"
                  value={questionnaire.projectName}
                  onChange={e => setField('projectName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Project Type</label>
                <input
                  className="form-control mt-1 w-full p-2 border rounded"
                  value={questionnaire.projectType}
                  onChange={e => setField('projectType', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium">Project Description *</label>
                <textarea
                  className="form-control mt-1 w-full p-2 border rounded"
                  rows={4}
                  value={questionnaire.projectDescription}
                  onChange={e => setField('projectDescription', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Expected Timeline</label>
                <input
                  className="form-control mt-1 w-full p-2 border rounded"
                  value={questionnaire.timeline}
                  onChange={e => setField('timeline', e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        {currentStep === 2 && (
          <section className="form-step bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Stakeholders</h2>
            <p className="text-sm text-gray-600 mb-4">
              Identify key people and their roles in this project
            </p>

            <div className="mb-4">
              {questionnaire.stakeholders.map(st => (
                <div key={st.id} className="flex items-center gap-2 mb-2">
                  <input
                    className="flex-1 p-2 border rounded"
                    value={st.name}
                    onChange={e => updateStakeholder(st.id, { name: e.target.value })}
                  />
                  <input
                    className="w-48 p-2 border rounded"
                    value={st.role}
                    onChange={e => updateStakeholder(st.id, { role: e.target.value })}
                  />
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => removeStakeholder(st.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
              <div>
                <label className="block text-sm">Name</label>
                <input
                  className="p-2 border rounded w-full"
                  value={newStakeholderName}
                  onChange={e => setNewStakeholderName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm">Role</label>
                <input
                  className="p-2 border rounded w-full"
                  value={newStakeholderRole}
                  onChange={e => setNewStakeholderRole(e.target.value)}
                />
              </div>
              <div>
                <Button variant="outline" onClick={handleAddStakeholder}>
                  Add Stakeholder
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Communication Requirements</label>
              <textarea
                className="form-control mt-1 w-full p-2 border rounded"
                rows={3}
                value={questionnaire.communicationNeeds}
                onChange={e => setField('communicationNeeds', e.target.value)}
              />
            </div>
          </section>
        )}

        {currentStep === 3 && (
          <section className="form-step bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Scope & Objectives</h2>
            <p className="text-sm text-gray-600 mb-4">
              Define what you want to achieve and deliver
            </p>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium">Project Objectives *</label>
                <textarea
                  className="form-control mt-1 w-full p-2 border rounded"
                  rows={4}
                  value={questionnaire.objectives}
                  onChange={e => setField('objectives', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Key Deliverables *</label>
                <textarea
                  className="form-control mt-1 w-full p-2 border rounded"
                  rows={4}
                  value={questionnaire.deliverables}
                  onChange={e => setField('deliverables', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Success Criteria</label>
                <textarea
                  className="form-control mt-1 w-full p-2 border rounded"
                  rows={3}
                  value={questionnaire.successCriteria}
                  onChange={e => setField('successCriteria', e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        {currentStep === 4 && (
          <section className="form-step bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Resources & Budget</h2>
            <p className="text-sm text-gray-600 mb-4">Define your team and financial constraints</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Team Size *</label>
                <select
                  className="form-control mt-1 w-full p-2 border rounded"
                  value={questionnaire.teamSize}
                  onChange={e => setField('teamSize', e.target.value)}
                >
                  <option value="">Select team size...</option>
                  <option value="1-3">1-3 people</option>
                  <option value="4-7">4-7 people</option>
                  <option value="8-15">8-15 people</option>
                  <option value="16-30">16-30 people</option>
                  <option value="30+">30+ people</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Budget Range *</label>
                <input
                  className="form-control mt-1 w-full p-2 border rounded"
                  value={questionnaire.budget}
                  onChange={e => setField('budget', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium">Resource Constraints</label>
                <textarea
                  className="form-control mt-1 w-full p-2 border rounded"
                  rows={3}
                  value={questionnaire.constraints}
                  onChange={e => setField('constraints', e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        {currentStep === 5 && (
          <section className="form-step bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Risks & Challenges</h2>
            <p className="text-sm text-gray-600 mb-4">
              Identify potential issues and mitigation strategies
            </p>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium">Potential Risks</label>
                <textarea
                  className="form-control mt-1 w-full p-2 border rounded"
                  rows={4}
                  value={questionnaire.potentialRisks}
                  onChange={e => setField('potentialRisks', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Mitigation Strategies</label>
                <textarea
                  className="form-control mt-1 w-full p-2 border rounded"
                  rows={4}
                  value={questionnaire.mitigationStrategies}
                  onChange={e => setField('mitigationStrategies', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Project Dependencies</label>
                <textarea
                  className="form-control mt-1 w-full p-2 border rounded"
                  rows={3}
                  value={questionnaire.dependencies}
                  onChange={e => setField('dependencies', e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        <div className="questionnaire__actions flex gap-2 mt-6">
          <Button variant="outline" onClick={() => setCurrentStep(s => Math.max(1, s - 1))}>
            ← Previous
          </Button>
          {currentStep < steps.length && (
            <Button
              variant="primary"
              onClick={() => {
                if (canNext()) setCurrentStep(s => Math.min(steps.length, s + 1));
              }}
            >
              Next →
            </Button>
          )}
          {currentStep === steps.length && (
            <Button variant="primary" onClick={handleGenerate}>
              Generate Project Plan
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

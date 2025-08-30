export interface Stakeholder {
  id: string;
  name: string;
  role: string;
}

export interface QuestionnaireData {
  projectName: string;
  projectType: string;
  projectDescription: string;
  timeline: string;
  stakeholders: Stakeholder[];
  communicationNeeds: string;
  objectives: string;
  deliverables: string;
  successCriteria: string;
  teamSize: string;
  budget: string;
  constraints: string;
  potentialRisks: string;
  mitigationStrategies: string;
  dependencies: string;
}

export interface ProjectResults {
  projectCharter: string;
  riskAssessment: string;
  timelineOverview: string;
  stakeholderAnalysis: string;
  llmPrompt?: string;
}

export const defaultQuestionnaireData: QuestionnaireData = {
  projectName: '',
  projectType: '',
  projectDescription: '',
  timeline: '',
  stakeholders: [],
  communicationNeeds: '',
  objectives: '',
  deliverables: '',
  successCriteria: '',
  teamSize: '',
  budget: '',
  constraints: '',
  potentialRisks: '',
  mitigationStrategies: '',
  dependencies: '',
};

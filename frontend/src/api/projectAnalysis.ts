import { postJson } from './client';
import { ProjectResults, QuestionnaireData } from '../types/project';

export async function analyzeProjectWithAI(questionnaire: QuestionnaireData): Promise<ProjectResults> {
  const response = await postJson<ProjectResults>('/project-analysis', { questionnaire });

  if (!response.success) {
    throw new Error(response.message || 'Failed to analyze project');
  }

  return response.data;
}

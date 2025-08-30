import { QuestionnaireData } from '../types/project';

export function generateLLMPrompt(data: QuestionnaireData): string {
  const stakeholdersList = data.stakeholders.length
    ? data.stakeholders.map(s => `- ${s.name} (${s.role})`).join('\n')
    : '- No stakeholders specified';

  const prompt = `You are an expert project management consultant. Based on the following project information, please provide a comprehensive project analysis including:

1. **Project Charter** - A formal project charter document
2. **Risk Assessment** - Detailed risk analysis with mitigation strategies  
3. **Timeline Overview** - Realistic project timeline with key milestones
4. **Stakeholder Analysis** - Analysis of stakeholder roles, influence, and communication needs

## Project Information:

**Project Name:** ${data.projectName || 'Not specified'}

**Project Type:** ${data.projectType || 'Not specified'}

**Project Description:**
${data.projectDescription || 'No description provided'}

**Timeline:** ${data.timeline || 'Not specified'}

**Objectives:**
${data.objectives || 'No objectives specified'}

**Key Deliverables:**
${data.deliverables || 'No deliverables specified'}

**Success Criteria:**
${data.successCriteria || 'No success criteria specified'}

**Team Size:** ${data.teamSize || 'Not specified'}

**Budget Range:** ${data.budget || 'Not specified'}

**Resource Constraints:**
${data.constraints || 'No constraints specified'}

**Stakeholders:**
${stakeholdersList}

**Communication Requirements:**
${data.communicationNeeds || 'No specific requirements'}

**Potential Risks:**
${data.potentialRisks || 'No risks identified'}

**Mitigation Strategies:**
${data.mitigationStrategies || 'No mitigation strategies specified'}

**Project Dependencies:**
${data.dependencies || 'No dependencies specified'}

## Instructions:

Please analyze this information and provide:

1. **PROJECT CHARTER**: Create a comprehensive project charter including executive summary, project scope, objectives, success criteria, and key constraints.

2. **RISK ASSESSMENT**: Identify and analyze potential risks based on the provided information. Include risk probability, impact, and specific mitigation strategies for each identified risk.

3. **TIMELINE OVERVIEW**: Suggest a realistic project timeline with phases, key milestones, and deliverable dates. Consider the team size, complexity, and any mentioned constraints.

4. **STAKEHOLDER ANALYSIS**: Analyze each stakeholder's role, level of influence, communication preferences, and recommended engagement strategies.

Please format your response in clear, professional sections that could be used in actual project documentation.`;

  return prompt;
}

// Legacy function for compatibility - now generates LLM prompt instead
export function analyzeProject(data: QuestionnaireData) {
  const llmPrompt = generateLLMPrompt(data);
  
  return {
    projectCharter: llmPrompt,
    riskAssessment: 'This prompt is ready for LLM analysis. Copy the prompt from the Project Charter section to send to ChatGPT or your preferred AI assistant.',
    timelineOverview: 'Timeline analysis will be provided by the LLM based on the generated prompt.',
    stakeholderAnalysis: 'Stakeholder analysis will be provided by the LLM based on the generated prompt.',
    llmPrompt: llmPrompt
  };
}

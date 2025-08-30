import projectData from '../data/projectData.json';

export const useProjectData = () => {
  const applyTemplate = (projectType: string) => {
    const template =
      projectData.projectTemplates[projectType as keyof typeof projectData.projectTemplates];
    return template || null;
  };

  const getStakeholderStrategy = (stakeholderType: string) => {
    const strategy =
      projectData.stakeholderInfluenceMap[
        stakeholderType as keyof typeof projectData.stakeholderInfluenceMap
      ];
    return strategy || null;
  };

  return {
    projectTypes: projectData.projectTypes,
    timelineOptions: projectData.timelineOptions,
    budgetRanges: projectData.budgetRanges,
    stakeholderTypes: projectData.stakeholderTypes,
    riskCategories: projectData.riskCategories,
    projectTemplates: projectData.projectTemplates,
    defaultRisks: projectData.defaultRisks,
    applyTemplate,
    getStakeholderStrategy,
  };
};

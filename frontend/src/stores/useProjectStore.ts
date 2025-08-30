import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuestionnaireData, defaultQuestionnaireData, Stakeholder } from '../types/project';

interface ProjectState {
  questionnaire: QuestionnaireData;
  setQuestionnaire: (q: Partial<QuestionnaireData>) => void;
  setField: <K extends keyof QuestionnaireData>(key: K, value: QuestionnaireData[K]) => void;
  addStakeholder: (s: Omit<Stakeholder, 'id'>) => void;
  updateStakeholder: (id: string, fields: Partial<Stakeholder>) => void;
  removeStakeholder: (id: string) => void;
  reset: () => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      questionnaire: defaultQuestionnaireData,
      setQuestionnaire: (q: Partial<QuestionnaireData>) =>
        set({ questionnaire: { ...get().questionnaire, ...q } }),
      setField: <K extends keyof QuestionnaireData>(key: K, value: QuestionnaireData[K]) =>
        set({ questionnaire: { ...get().questionnaire, [key]: value } }),
      addStakeholder: (s: Omit<Stakeholder, 'id'>) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        set({
          questionnaire: {
            ...get().questionnaire,
            stakeholders: [...get().questionnaire.stakeholders, { id, ...s }],
          },
        });
      },
      updateStakeholder: (id: string, fields: Partial<Stakeholder>) => {
        set({
          questionnaire: {
            ...get().questionnaire,
            stakeholders: get().questionnaire.stakeholders.map(st =>
              st.id === id ? { ...st, ...fields } : st
            ),
          },
        });
      },
      removeStakeholder: (id: string) => {
        set({
          questionnaire: {
            ...get().questionnaire,
            stakeholders: get().questionnaire.stakeholders.filter(st => st.id !== id),
          },
        });
      },
      reset: () => set({ questionnaire: defaultQuestionnaireData }),
    }),
    {
      name: 'project-storage-v1',
      partialize: state => ({ questionnaire: state.questionnaire }),
    }
  )
);

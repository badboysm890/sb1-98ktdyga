import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  createdAt: string;
}

interface ProjectState {
  projects: Project[];
  selectedProjectId: string | null;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  selectProject: (projectId: string) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [],
      selectedProjectId: null,
      addProject: (project) => set((state) => ({
        projects: [...state.projects, {
          ...project,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString()
        }],
        selectedProjectId: state.projects.length === 0 ? crypto.randomUUID() : state.selectedProjectId
      })),
      selectProject: (projectId) => set({ selectedProjectId: projectId }),
    }),
    {
      name: 'project-storage',
    }
  )
);
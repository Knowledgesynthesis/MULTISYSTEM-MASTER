import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserProgress, SepsisSimulatorState, DKASimulatorState } from '@/types'

interface AppState {
  // Theme
  darkMode: boolean
  toggleDarkMode: () => void

  // User progress
  userProgress: UserProgress
  completeCase: (caseId: string) => void
  recordAssessmentScore: (assessmentId: string, score: number) => void
  completeModule: (moduleId: string) => void

  // Sepsis simulator
  sepsisSimulator: SepsisSimulatorState
  updateSepsisSimulator: (updates: Partial<SepsisSimulatorState>) => void
  resetSepsisSimulator: () => void

  // DKA simulator
  dkaSimulator: DKASimulatorState
  updateDKASimulator: (updates: Partial<DKASimulatorState>) => void
  resetDKASimulator: () => void
}

const initialSepsisState: SepsisSimulatorState = {
  timeElapsed: 0,
  fluidGiven: 0,
  antibioticsGiven: false,
  lactate: 4.2,
  map: 55,
  urineOutput: 0,
  vasopressorUsed: false,
}

const initialDKAState: DKASimulatorState = {
  timeElapsed: 0,
  fluidGiven: 0,
  insulinRate: 0,
  glucose: 450,
  potassium: 3.8,
  ph: 7.15,
  anionGap: 28,
  transitionedToSQ: false,
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Theme
      darkMode: true, // Default to dark mode
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // User progress
      userProgress: {
        completedCases: [],
        assessmentScores: {},
        modulesCompleted: [],
        lastAccessed: new Date(),
      },
      completeCase: (caseId: string) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            completedCases: [...state.userProgress.completedCases, caseId],
            lastAccessed: new Date(),
          },
        })),
      recordAssessmentScore: (assessmentId: string, score: number) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            assessmentScores: {
              ...state.userProgress.assessmentScores,
              [assessmentId]: score,
            },
            lastAccessed: new Date(),
          },
        })),
      completeModule: (moduleId: string) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            modulesCompleted: [...state.userProgress.modulesCompleted, moduleId],
            lastAccessed: new Date(),
          },
        })),

      // Sepsis simulator
      sepsisSimulator: initialSepsisState,
      updateSepsisSimulator: (updates) =>
        set((state) => ({
          sepsisSimulator: { ...state.sepsisSimulator, ...updates },
        })),
      resetSepsisSimulator: () => set({ sepsisSimulator: initialSepsisState }),

      // DKA simulator
      dkaSimulator: initialDKAState,
      updateDKASimulator: (updates) =>
        set((state) => ({
          dkaSimulator: { ...state.dkaSimulator, ...updates },
        })),
      resetDKASimulator: () => set({ dkaSimulator: initialDKAState }),
    }),
    {
      name: 'multisystem-master-storage',
    }
  )
)

import { create } from 'zustand'

interface DismantledStudiesState {
  dismantledStudyIds: number[]
  addDismantledStudy: (studyId: number) => void
  clearDismantledStudies: () => void
}

const useDismantledStudiesStore = create<DismantledStudiesState>((set) => ({
  dismantledStudyIds: [],
  addDismantledStudy: (studyId) =>
    set((state) => ({
      dismantledStudyIds: [...state.dismantledStudyIds, studyId],
    })),
  clearDismantledStudies: () => set({ dismantledStudyIds: [] }),
}))

export default useDismantledStudiesStore

"use client"

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ComplianceState = {
  tag: string;
  topic: string;

}

export type ComplianceActions = {
  setTag: (newTag: string) => void
  setTopic: (newTopic: string) => void
}

export type ComplianceStore = ComplianceState & ComplianceActions

const defaultInitState: ComplianceState = {
  tag: "",
  topic: "",
}

export const useComplianceStore =  create<ComplianceStore>()(
  persist(
 (set) => ({
    ...defaultInitState,
    setTag: (newTag) => set({ tag: newTag}),
    setTopic: (newTopic) => set({ topic: newTopic}),
  }), {
      name: 'compliance-storage', 
      storage: createJSONStorage(() => localStorage), 
    }))


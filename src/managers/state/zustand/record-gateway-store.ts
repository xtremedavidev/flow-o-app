"use client"

import { RecommendationItem } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type RecordState = {
  recommendationChat: RecommendationItem[] | null
}

export type RecordActions = {
  setRecommendationChat: (newRecommendationChat: RecommendationItem[] | null) => void
}

export type RecordStore = RecordState & RecordActions

export const defaultInitState: RecordState = {
  recommendationChat: null,
}

export const useRecordStore =  create<RecordStore>()(
  persist(
 (set) => ({
    ...defaultInitState,
    setRecommendationChat: (newRecommendationChat) => set({ recommendationChat: newRecommendationChat}),
  }), {
      name: 'record-storage', 
      getStorage: () => localStorage, 
    }))


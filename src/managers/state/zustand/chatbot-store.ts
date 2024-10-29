"use client"

import { ChatMessage, GetChatMsgResp } from '@/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ChatBotState = {
  botChat: ChatMessage[] | null;
  showChatHistory: boolean;
}

export type ChatBotActions = {
  setBotChat: (newBotChat: ChatMessage[] | null) => void;
  setShowChatHistory: (showChatHistory: boolean) => void;
}

export type ChatbotStore = ChatBotState & ChatBotActions

const defaultInitState: ChatBotState = {
  botChat: null,
  showChatHistory: false,
}

export const useChatBotStore =  create<ChatbotStore>()(
  persist(
 (set) => ({
    ...defaultInitState,
    setBotChat: (newBotChat) => set({ botChat: newBotChat}),
    setShowChatHistory: (showChatHistory) => set({ showChatHistory}),
  }), {
      name: 'chat-bot-storage', 
      storage: createJSONStorage(() => localStorage), 
    }))


"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserData {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    onBoardingDone: boolean;
  }

export interface UserState {
  user: UserData | null;
}

export type UserActions = {
  setUser: (newUser: UserData | null) => void;
};

export type UserStore = UserState & UserActions;

const defaultInitState: UserState = {
  user: null,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...defaultInitState,
      setUser: (newUser) => set({ user: newUser }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

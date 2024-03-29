import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      listenerName: null,
      musicianIsAuth: false,
      authMusician: () => set(() => ({ musicianIsAuth: true })),
      setListenerName: (name) => set(() => ({ listenerName: name })),
      logout: () => set(() => ({ listenerName: null, musicianIsAuth: false })),
    }),
    {
      name: "ask-for-music",
    }
  )
);

// Apenas exemplo de store global usando Zustand (Apagar)

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CounterState {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}

export const useCounterStore = create<CounterState>()(
    persist(
        (set) => ({
            count: 0,
            increment: () => set((state) => ({ count: state.count + 1 })),
            decrement: () => set((state) => ({ count: state.count - 1 })),
            reset: () => set({ count: 0 }),
        }),
        {
            name: 'counter-storage', // nome da chave no localStorage
        }
    )
);
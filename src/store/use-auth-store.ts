import { axios } from '@/lib/axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'EDITOR' | 'ADMIN'
  createdAt: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  initialized: boolean // Nova flag para controlar se já tentou buscar o usuário
  fetchUser: () => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User) => void // Nova função para definir usuário diretamente
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false, // Começar com false, só ativar quando necessário
      initialized: false,

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      fetchUser: async () => {
        const state = get();
        
        // Evitar múltiplas chamadas simultâneas
        if (state.loading) return;
        
        set({ loading: true });
        
        try {
          const res = await axios.get('/me');
          
          if (res.status === 200 && res.data.user) {
            set({ 
              user: res.data.user, 
              isAuthenticated: true, 
              loading: false,
              initialized: true 
            });
          } else {
            throw new Error('Resposta inválida');
          }
        } catch (error) {
          console.log('Erro ao buscar usuário:', error);
          set({ 
            user: null, 
            isAuthenticated: false, 
            loading: false,
            initialized: true 
          });
        }
      },

      logout: async () => {
        try {
          await axios.post('/auth/logout');
        } catch (error) {
          console.log('Erro no logout:', error);
        } finally {
          set({ 
            user: null, 
            isAuthenticated: false, 
            loading: false,
            initialized: true 
          });
        }
      },
    }),
    {
      name: 'auth',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
      
      // Resetar loading e initialized ao hidratar
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.loading = false;
          state.initialized = false;
        }
      },
    }
  )
)
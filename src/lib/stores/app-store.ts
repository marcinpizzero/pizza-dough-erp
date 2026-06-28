// src/lib/stores/app-store.ts
// Globalny stan aplikacji PIZZA DOUGH ERP LITE

import { create } from 'zustand';
import type { Tenant, Alert } from '@/types';

interface AppState {
  // ─── STAN ──────────────────────────
  currentTenant: Tenant | null;
  currentUser: { id: string; email: string } | null;
  currentRole: 'OWNER' | 'MANAGER' | 'PIZZAIOLO' | null;
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  alerts: Alert[];
  unreadAlertsCount: number;

  // ─── AKCJE ─────────────────────────
  setTenant: (tenant: Tenant) => void;
  setUser: (user: { id: string; email: string }, role: 'OWNER' | 'MANAGER' | 'PIZZAIOLO') => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addAlert: (alert: Alert) => void;
  acknowledgeAlert: (alertId: string) => void;
  clearAlerts: () => void;
  reset: () => void;
}

const initialState = {
  currentTenant: null,
  currentUser: null,
  currentRole: null,
  sidebarOpen: true,
  theme: 'light' as const,
  alerts: [],
  unreadAlertsCount: 0,
};

export const useAppStore = create<AppState>((set, get) => ({
  ...initialState,

  setTenant: (tenant) => set({ currentTenant: tenant }),

  setUser: (user, role) => set({ currentUser: user, currentRole: role }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setTheme: (theme) => set({ theme }),

  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts].slice(0, 50), // max 50 alertów
      unreadAlertsCount: state.unreadAlertsCount + 1,
    })),

  acknowledgeAlert: (alertId) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId ? { ...a, acknowledged: true } : a
      ),
      unreadAlertsCount: Math.max(0, state.unreadAlertsCount - 1),
    })),

  clearAlerts: () => set({ alerts: [], unreadAlertsCount: 0 }),

  reset: () => set(initialState),
}));
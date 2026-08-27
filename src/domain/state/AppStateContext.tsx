import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  LINKED_ACCOUNTS,
  NOTIFICATIONS,
  TRANSACTIONS,
} from '../mockData';
import { defaultNisabBasisByMadhhab } from '../zakat';
import type {
  AppNotification,
  Category,
  ComplianceFlag,
  Currency,
  LinkedAccount,
  Madhhab,
  NisabBasis,
  Transaction,
} from '../types';

interface AppState {
  onboardingComplete: boolean;
  completeOnboarding: () => void;

  madhhab: Madhhab;
  setMadhhab: (m: Madhhab) => void;

  nisabBasis: NisabBasis;
  setNisabBasis: (b: NisabBasis) => void;
  nisabBasisTouched: boolean;

  currency: Currency;
  setCurrency: (c: Currency) => void;

  linkedAccounts: LinkedAccount[];
  toggleAccount: (id: string) => void;
  linkedCount: number;

  /** Fewer than two linked accounts puts Home (and related screens) in the thin state. */
  isThinState: boolean;
  enterThinState: () => void;

  transactions: Transaction[];
  overrideMerchantFlag: (merchant: string, flag: ComplianceFlag, category: Category) => void;
  addTransaction: (input: { merchant: string; amount: number; category: Category; flag: ComplianceFlag }) => void;

  notifications: AppNotification[];
  markAllNotificationsRead: () => void;
}

const AppStateCtx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [madhhab, setMadhhabState] = useState<Madhhab>('syafii');
  const [nisabBasis, setNisabBasisState] = useState<NisabBasis>(defaultNisabBasisByMadhhab.syafii);
  const [nisabBasisTouched, setNisabBasisTouched] = useState(false);
  const [currency, setCurrency] = useState<Currency>('IDR');
  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>(LINKED_ACCOUNTS);
  const [forcedThinState, setForcedThinState] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS);
  const [notifications, setNotifications] = useState<AppNotification[]>(NOTIFICATIONS);

  const setMadhhab = (m: Madhhab) => {
    setMadhhabState(m);
    if (!nisabBasisTouched) setNisabBasisState(defaultNisabBasisByMadhhab[m]);
  };

  const setNisabBasis = (b: NisabBasis) => {
    setNisabBasisTouched(true);
    setNisabBasisState(b);
  };

  const toggleAccount = (id: string) => {
    setLinkedAccounts((prev) => prev.map((a) => (a.id === id ? { ...a, connected: !a.connected } : a)));
  };

  const linkedCount = linkedAccounts.filter((a) => a.connected).length;
  const isThinState = forcedThinState || linkedCount < 2;

  const overrideMerchantFlag = (merchant: string, flag: ComplianceFlag, category: Category) => {
    setTransactions((prev) => prev.map((t) => (t.merchant === merchant ? { ...t, flag, category } : t)));
  };

  const addTransaction: AppState['addTransaction'] = ({ merchant, amount, category, flag }) => {
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        merchant,
        amount,
        category,
        flag,
        autoFlag: flag,
        dateISO: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const value = useMemo<AppState>(
    () => ({
      onboardingComplete,
      completeOnboarding: () => setOnboardingComplete(true),
      madhhab,
      setMadhhab,
      nisabBasis,
      setNisabBasis,
      nisabBasisTouched,
      currency,
      setCurrency,
      linkedAccounts,
      toggleAccount,
      linkedCount,
      isThinState,
      enterThinState: () => setForcedThinState(true),
      transactions,
      overrideMerchantFlag,
      addTransaction,
      notifications,
      markAllNotificationsRead,
    }),
    [
      onboardingComplete,
      madhhab,
      nisabBasis,
      nisabBasisTouched,
      currency,
      linkedAccounts,
      linkedCount,
      isThinState,
      transactions,
      notifications,
    ]
  );

  return <AppStateCtx.Provider value={value}>{children}</AppStateCtx.Provider>;
}

export function useAppState(): AppState {
  const ctx = useContext(AppStateCtx);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}

/** Every transaction and holding carries exactly one compliance flag. */
export type ComplianceFlag = 'halal' | 'syubhat' | 'bad';

export type Category = 'belanja' | 'transportasi' | 'gaji' | 'sadaqah' | 'hiburan' | 'investasi' | 'lainnya';

export type Madhhab = 'hanafi' | 'syafii' | 'maliki' | 'hanbali';

export type NisabBasis = 'gold' | 'silver';

export type Currency = 'IDR' | 'MYR';

export interface Transaction {
  id: string;
  merchant: string;
  /** Positive for inflow, negative for outflow. */
  amount: number;
  category: Category;
  /** Effective flag after any per-merchant override. */
  flag: ComplianceFlag;
  /** Flag suggested by the auto-flagging seed map, before any override. */
  autoFlag: ComplianceFlag;
  dateISO: string;
  /** Explanation shown when the flag was assigned automatically, e.g. a riba detection. */
  autoFlagReason?: string;
}

export interface ScreeningRatios {
  interestBearingDebtToAssets: number; // max 0.33
  nonHalalIncomeToRevenue: number; // max 0.05
  cashReceivablesToAssets: number; // max 0.33
}

export interface Holding {
  id: string;
  ticker: string;
  name: string;
  value: number;
  changePct: number;
  flag: ComplianceFlag;
  passesDES: boolean;
  ratios: ScreeningRatios;
  verdictNote: string;
  removedFromDESNote?: string;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  saved: number;
  etaLabel: string;
  monthlyDeposit?: number;
  heldAt?: string;
  profitSharingRatio?: string;
  quotaEstimateLabel?: string;
  sixMonthHistory?: number[];
}

export interface LinkedAccount {
  id: string;
  name: string;
  type: string;
  initials: string;
  connected: boolean;
  conventional?: boolean;
  syncedLabel?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timeLabel: string;
  unread: boolean;
  deepLink: { screen: string; params?: Record<string, unknown> };
}

export interface CategoryRuling {
  category: Category;
  suggestedFlag: ComplianceFlag;
  reason: string;
}

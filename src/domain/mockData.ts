import type { AppNotification, Goal, Holding, LinkedAccount, Transaction } from './types';

// All figures below are taken verbatim from domain-logic.md's "Prototype figures" table,
// or derived arithmetically so that sub-totals foot exactly to those figures. Do not
// change any of these without checking against domain-logic.md first.

export const GOLD_SPOT_PER_GRAM = 1_412_000;
export const SILVER_SPOT_PER_GRAM = 15_800;
export const GOLD_HOLDING_GRAMS = 44.3;

export const HAUL_DATE = new Date('2026-09-14T00:00:00');

// Compliant cash — 3 accounts, sums to 172,548,400
export const CASH_ACCOUNTS = [
  { id: 'bsi', name: 'BSI Tabungan Syariah', balance: 98_200_000 },
  { id: 'muamalat', name: 'Muamalat Tabungan iB', balance: 54_348_400 },
  { id: 'gopay', name: 'GoPay', balance: 20_000_000 },
];
export const COMPLIANT_CASH = CASH_ACCOUNTS.reduce((sum, a) => sum + a.balance, 0);

// Deductible debts — due within one haul, sums to 88,000,000
export const DEBTS = [
  { id: 'murabahah', name: 'Cicilan Murabahah (rumah)', amount: 52_800_000 },
  { id: 'qard-hasan', name: 'Utang keluarga (qard hasan)', amount: 35_200_000, dueLabel: 'Jatuh tempo Des 2026' },
];
export const DEBTS_TOTAL = DEBTS.reduce((sum, d) => sum + d.amount, 0);

export const HOLDINGS: Holding[] = [
  {
    id: 'sucorinvest',
    ticker: 'SCRD',
    name: 'Sucorinvest Sharia Equity Fund',
    value: 24_000_000,
    changePct: 3.2,
    flag: 'halal',
    passesDES: true,
    ratios: { interestBearingDebtToAssets: 0.11, nonHalalIncomeToRevenue: 0.01, cashReceivablesToAssets: 0.14 },
    verdictNote: 'Lolos DES',
  },
  {
    id: 'antm',
    ticker: 'ANTM',
    name: 'Aneka Tambang',
    value: 15_800_000,
    changePct: 1.4,
    flag: 'syubhat',
    passesDES: true,
    ratios: { interestBearingDebtToAssets: 0.29, nonHalalIncomeToRevenue: 0.041, cashReceivablesToAssets: 0.3 },
    verdictNote: 'Batas mendekat',
  },
  {
    id: 'tlkm',
    ticker: 'TLKM',
    name: 'Telkom Indonesia',
    value: 12_500_000,
    changePct: 0.6,
    flag: 'halal',
    passesDES: true,
    ratios: { interestBearingDebtToAssets: 0.18, nonHalalIncomeToRevenue: 0.02, cashReceivablesToAssets: 0.19 },
    verdictNote: 'Lolos DES',
  },
  {
    id: 'unvr',
    ticker: 'UNVR',
    name: 'Unilever Indonesia',
    value: 9_700_000,
    changePct: -0.8,
    flag: 'halal',
    passesDES: true,
    ratios: { interestBearingDebtToAssets: 0.09, nonHalalIncomeToRevenue: 0.008, cashReceivablesToAssets: 0.12 },
    verdictNote: 'Lolos DES',
  },
  {
    id: 'bris',
    ticker: 'BRIS',
    name: 'Bank Syariah Indonesia',
    value: 10_000_000,
    changePct: 2.1,
    flag: 'halal',
    passesDES: true,
    ratios: { interestBearingDebtToAssets: 0.07, nonHalalIncomeToRevenue: 0.0, cashReceivablesToAssets: 0.21 },
    verdictNote: 'Lolos DES',
  },
  {
    id: 'bnkx',
    ticker: 'BNKX',
    name: 'Bank Nusantara Kapital',
    value: 8_900_000,
    changePct: -4.7,
    flag: 'bad',
    passesDES: false,
    ratios: { interestBearingDebtToAssets: 0.412, nonHalalIncomeToRevenue: 0.087, cashReceivablesToAssets: 0.224 },
    verdictNote: 'Keluar dari DES',
    removedFromDESNote: 'Dikeluarkan dari Daftar Efek Syariah pada tinjauan Mei 2026 — pendapatan bunga di atas ambang batas.',
  },
];

export const PASSING_HOLDINGS_VALUE = HOLDINGS.filter((h) => h.passesDES).reduce((s, h) => s + h.value, 0);
export const PORTFOLIO_VALUE = HOLDINGS.reduce((s, h) => s + h.value, 0);
export const EXCLUDED_HOLDING_VALUE = HOLDINGS.filter((h) => !h.passesDES).reduce((s, h) => s + h.value, 0);

// Cumulative flagged conventional-interest income excluded from the zakat base this haul.
export const EXCLUDED_INTEREST_INCOME = 5_812_000;
export const EXCLUDED_AMOUNT = EXCLUDED_HOLDING_VALUE + EXCLUDED_INTEREST_INCOME;

export const NET_WORTH = 412_900_000;
export const NET_WORTH_MONTHLY_DELTA = 8_240_000;
export const MONTHLY_SPEND = 16_240_000;
export const COMPLIANT_SHARE = 0.94;
export const SYUBHAT_SHARE = 0.035;
export const BAD_SHARE = 0.025;

export const TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-gaji',
    merchant: 'Gaji Agustus',
    amount: 24_500_000,
    category: 'gaji',
    flag: 'halal',
    autoFlag: 'halal',
    dateISO: '2026-08-25',
  },
  {
    id: 'tx-belanja',
    merchant: 'Belanja bulanan',
    amount: -13_425_600,
    category: 'belanja',
    flag: 'halal',
    autoFlag: 'halal',
    dateISO: '2026-08-24',
  },
  {
    id: 'tx-transportasi',
    merchant: 'Transportasi',
    amount: -1_340_000,
    category: 'transportasi',
    flag: 'halal',
    autoFlag: 'halal',
    dateISO: '2026-08-22',
  },
  {
    id: 'tx-sadaqah',
    merchant: 'Sadaqah',
    amount: -500_000,
    category: 'sadaqah',
    flag: 'halal',
    autoFlag: 'halal',
    dateISO: '2026-08-20',
  },
  {
    id: 'tx-hiburan',
    merchant: 'Hiburan',
    amount: -220_000,
    category: 'hiburan',
    flag: 'syubhat',
    autoFlag: 'syubhat',
    dateISO: '2026-08-18',
  },
  {
    id: 'tx-investasi',
    merchant: 'Investasi — top up Sucorinvest',
    amount: -348_400,
    category: 'investasi',
    flag: 'syubhat',
    autoFlag: 'syubhat',
    dateISO: '2026-08-15',
  },
  {
    id: 'tx-biaya-bank',
    merchant: 'Biaya bank konvensional',
    amount: -406_000,
    category: 'lainnya',
    flag: 'bad',
    autoFlag: 'bad',
    dateISO: '2026-08-10',
    autoFlagReason:
      'Kategori merchant "biaya bank konvensional" terdeteksi sebagai riba dan dikecualikan dari kekayaan bersih serta dasar zakat.',
  },
  {
    id: 'tx-bunga',
    merchant: 'Bunga tabungan',
    amount: 412_000,
    category: 'lainnya',
    flag: 'bad',
    autoFlag: 'bad',
    dateISO: '2026-08-05',
    autoFlagReason:
      'Kategori merchant "interest credit" terdeteksi sebagai riba dan dikecualikan dari kekayaan bersih serta dasar zakat.',
  },
];

export const GOALS: Goal[] = [
  {
    id: 'haji',
    name: 'Haji 2031',
    target: 165_000_000,
    saved: 62_700_000,
    etaLabel: 'Kuota diperkirakan 1452 H · Mei 2031',
    monthlyDeposit: 2_200_000,
    heldAt: 'Deposito mudarabah BSI',
    profitSharingRatio: '58:42',
    quotaEstimateLabel: 'Kuota diperkirakan 1452 H · Mei 2031',
    sixMonthHistory: [1_900_000, 2_000_000, 2_100_000, 2_150_000, 2_200_000, 2_200_000],
  },
  {
    id: 'bebas-utang',
    name: 'Bebas utang',
    target: 88_000_000,
    saved: 56_320_000,
    etaLabel: 'Estimasi lunas Mar 2027',
  },
  {
    id: 'dana-darurat',
    name: 'Dana darurat',
    target: 60_000_000,
    saved: 48_600_000,
    etaLabel: 'Estimasi tercapai Nov 2026',
  },
  {
    id: 'umrah',
    name: 'Umrah keluarga',
    target: 45_000_000,
    saved: 5_400_000,
    etaLabel: 'Estimasi tercapai 2028',
  },
];

export const LINKED_ACCOUNTS: LinkedAccount[] = [
  { id: 'bsi', name: 'Bank Syariah Indonesia', type: 'Tabungan', initials: 'BS', connected: true, syncedLabel: 'Tersinkron 12 menit lalu' },
  { id: 'muamalat', name: 'Bank Muamalat', type: 'Tabungan', initials: 'BM', connected: true, syncedLabel: 'Tersinkron 1 jam lalu' },
  { id: 'gopay', name: 'GoPay', type: 'E-wallet', initials: 'GP', connected: false },
  { id: 'ovo', name: 'OVO', type: 'E-wallet', initials: 'OV', connected: false },
  { id: 'bca', name: 'BCA', type: 'Tabungan konvensional', initials: 'BC', connected: false, conventional: true },
];

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-nisab',
    title: 'Nisab terlampaui',
    body: 'Kekayaan bersih Anda telah melewati ambang nisab. Perhitungan haul dimulai.',
    timeLabel: '2 hari lalu',
    unread: true,
    deepLink: { screen: 'Main' },
  },
  {
    id: 'notif-haul',
    title: 'Haul jatuh 19 hari lagi',
    body: 'Siapkan laporan zakat Anda sebelum 14 September 2026.',
    timeLabel: '3 hari lalu',
    unread: true,
    deepLink: { screen: 'ZakatWizard' },
  },
  {
    id: 'notif-bnkx',
    title: 'BNKX keluar dari Daftar Efek Syariah',
    body: 'Pendapatan bunga BNKX melebihi ambang batas pada tinjauan Mei 2026.',
    timeLabel: '1 minggu lalu',
    unread: true,
    deepLink: { screen: 'HoldingDetail', params: { holdingId: 'bnkx' } },
  },
  {
    id: 'notif-bunga',
    title: 'Bunga tabungan Rp 412.000 ditandai',
    body: 'Transaksi ini terdeteksi sebagai riba dan dikecualikan dari dasar zakat.',
    timeLabel: '3 minggu lalu',
    unread: false,
    deepLink: { screen: 'TransactionDetail', params: { transactionId: 'tx-bunga' } },
  },
  {
    id: 'notif-haji',
    title: 'Setoran Haji 2031 diterima',
    body: 'Setoran bulanan Rp 2.200.000 telah ditambahkan ke tujuan Haji 2031.',
    timeLabel: '1 bulan lalu',
    unread: false,
    deepLink: { screen: 'Main' },
  },
];

// Thin (month-one) state figures — used when fewer than two accounts are linked.
export const THIN_STATE = {
  netWorth: 18_400_000,
  monthlyDelta: 3_100_000,
  monthlySpend: 2_740_000,
  transactionCount: 7,
};

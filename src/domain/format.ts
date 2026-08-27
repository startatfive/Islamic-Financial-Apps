import type { Currency } from './types';

const symbol: Record<Currency, string> = { IDR: 'Rp', MYR: 'RM' };

/** "Rp 412.900.000" — Indonesian-style grouping, no decimals for whole rupiah. */
export function formatCurrency(amount: number, currency: Currency = 'IDR'): string {
  const rounded = Math.round(Math.abs(amount));
  const grouped = new Intl.NumberFormat('id-ID').format(rounded);
  const sign = amount < 0 ? '-' : '';
  return `${sign}${symbol[currency]} ${grouped}`;
}

export function formatSignedCurrency(amount: number, currency: Currency = 'IDR'): string {
  const sign = amount > 0 ? '+' : amount < 0 ? '-' : '';
  return `${sign}${formatCurrency(Math.abs(amount), currency)}`;
}

export function formatGrams(grams: number): string {
  return `${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 }).format(grams)} g`;
}

export function formatPercent(fraction: number, digits = 1): string {
  return `${(fraction * 100).toFixed(digits)}%`;
}

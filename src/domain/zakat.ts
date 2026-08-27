import type { NisabBasis } from './types';

const ZAKAT_RATE = 0.025;
const NISAB_GOLD_GRAMS = 85;
const NISAB_SILVER_GRAMS = 595;

export interface ZakatInput {
  compliantCash: number;
  goldGrams: number;
  goldSpotPerGram: number;
  /** Sum of holdings whose latest DES screening passes. */
  passingHoldingsValue: number;
  /** Debts falling due within one haul only. */
  debtsDueWithinHaul: number;
  nisabBasis: NisabBasis;
  silverSpotPerGram: number;
}

export interface ZakatResult {
  zakatAssets: number;
  zakatBase: number;
  nisabGold: number;
  nisabSilver: number;
  nisabUsed: number;
  meetsNisab: boolean;
  zakatOwed: number;
}

/**
 * zakatAssets = compliantCash + goldGrams * goldSpotPerGram + sum(holdings where passesDES)
 * zakatBase   = zakatAssets - debtsDueWithinOneHaul
 * nisab       = gold basis: 85g * spot | silver basis: 595g * spot
 * zakatOwed   = zakatBase >= nisab ? zakatBase * 0.025 : 0
 */
export function computeZakat(input: ZakatInput): ZakatResult {
  const goldValue = input.goldGrams * input.goldSpotPerGram;
  const zakatAssets = input.compliantCash + goldValue + input.passingHoldingsValue;
  const zakatBase = zakatAssets - input.debtsDueWithinHaul;

  const nisabGold = NISAB_GOLD_GRAMS * input.goldSpotPerGram;
  const nisabSilver = NISAB_SILVER_GRAMS * input.silverSpotPerGram;
  const nisabUsed = input.nisabBasis === 'gold' ? nisabGold : nisabSilver;

  const meetsNisab = zakatBase >= nisabUsed;
  const zakatOwed = meetsNisab ? zakatBase * ZAKAT_RATE : 0;

  return { zakatAssets, zakatBase, nisabGold, nisabSilver, nisabUsed, meetsNisab, zakatOwed };
}

/** Default nisab basis follows the user's madhhab, but stays user-controllable. */
export const defaultNisabBasisByMadhhab: Record<'hanafi' | 'syafii' | 'maliki' | 'hanbali', NisabBasis> = {
  hanafi: 'silver',
  syafii: 'gold',
  maliki: 'gold',
  hanbali: 'gold',
};

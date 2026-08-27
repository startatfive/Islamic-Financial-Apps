import { computeZakat } from './zakat';
import {
  COMPLIANT_CASH,
  DEBTS_TOTAL,
  GOLD_HOLDING_GRAMS,
  GOLD_SPOT_PER_GRAM,
  PASSING_HOLDINGS_VALUE,
  SILVER_SPOT_PER_GRAM,
} from './mockData';
import type { NisabBasis } from './types';

/** Baseline zakat figures for reference text outside the wizard (e.g. transaction detail). */
export function baselineZakat(nisabBasis: NisabBasis) {
  return computeZakat({
    compliantCash: COMPLIANT_CASH,
    goldGrams: GOLD_HOLDING_GRAMS,
    goldSpotPerGram: GOLD_SPOT_PER_GRAM,
    passingHoldingsValue: PASSING_HOLDINGS_VALUE,
    debtsDueWithinHaul: DEBTS_TOTAL,
    nisabBasis,
    silverSpotPerGram: SILVER_SPOT_PER_GRAM,
  });
}

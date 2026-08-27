import categoryRulings from './categoryRulings.json';
import type { Category, CategoryRuling, ComplianceFlag } from './types';

const rulings = categoryRulings as CategoryRuling[];

export function suggestedFlagFor(category: Category): ComplianceFlag {
  return rulings.find((r) => r.category === category)?.suggestedFlag ?? 'halal';
}

export function reasonFor(category: Category): string {
  return rulings.find((r) => r.category === category)?.reason ?? '';
}

export const complianceLabel: Record<ComplianceFlag, string> = {
  halal: 'Sesuai syariah',
  syubhat: 'Syubhat',
  bad: 'Tidak sesuai',
};

export const complianceLabelShort: Record<ComplianceFlag, string> = {
  halal: 'Sesuai',
  syubhat: 'Syubhat',
  bad: 'Tidak sesuai',
};

/** Cycles halal -> syubhat -> bad -> halal, used by the "Ubah" link. */
export function nextFlag(flag: ComplianceFlag): ComplianceFlag {
  const order: ComplianceFlag[] = ['halal', 'syubhat', 'bad'];
  return order[(order.indexOf(flag) + 1) % order.length];
}

/** Only `bad` is excluded from net worth and the zakat base. */
export function isExcluded(flag: ComplianceFlag): boolean {
  return flag === 'bad';
}

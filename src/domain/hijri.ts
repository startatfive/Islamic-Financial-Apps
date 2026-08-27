// hijri-converter is a small, maintained Umm al-Qura implementation.
// We never compute lunar dates by hand.
import { toHijri as libToHijri } from 'hijri-converter';

const HIJRI_MONTHS_ID = [
  'Muharram',
  'Safar',
  'Rabiulawal',
  'Rabiulakhir',
  'Jumadilawal',
  'Jumadilakhir',
  'Rajab',
  'Syaaban',
  'Ramadan',
  'Syawal',
  'Zulkaidah',
  'Zulhijjah',
];

export interface HijriDate {
  year: number;
  month: number; // 1-12
  day: number;
}

export function toHijri(date: Date): HijriDate {
  const { hy, hm, hd } = libToHijri(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return { year: hy, month: hm, day: hd };
}

export function formatHijri(date: Date): string {
  const h = toHijri(date);
  return `${h.day} ${HIJRI_MONTHS_ID[h.month - 1]} ${h.year} H`;
}

export function formatGregorian(date: Date): string {
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** "14 September 2026" with the Hijri equivalent as a secondary line. */
export function formatWithHijri(date: Date): { gregorian: string; hijri: string } {
  return { gregorian: formatGregorian(date), hijri: formatHijri(date) };
}

export function daysUntil(date: Date, from: Date = new Date()): number {
  const target = new Date(date).setHours(0, 0, 0, 0);
  const start = new Date(from).setHours(0, 0, 0, 0);
  return Math.round((target - start) / (1000 * 60 * 60 * 24));
}

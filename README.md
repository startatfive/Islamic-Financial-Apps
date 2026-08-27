# Barakah — Syariah Financial Tracker

A React Native (Expo) app that tracks net worth, cashflow and investments like an
ordinary money app, then layers a syariah compliance lens over all of it. Every
transaction and holding carries a ruling (compliant / doubtful / non-compliant), and
an annual zakat reckoning is computed from the compliant subset.

Built for young Muslim professionals and families in Indonesia and Malaysia, and for
investors tracking syariah-compliant portfolios.

## Stack

- **Expo SDK 57** (React Native 0.86, React 19, New Architecture), TypeScript
- **React Navigation** — native-stack + bottom-tabs
- **react-native-svg** for the compliance ring and progress rings
- **phosphor-react-native** for icons
- **@expo-google-fonts/inter** — weights 400/500 only, per the design system
- **hijri-converter** — Umm al-Qura Hijri dates, computed live (never hand-rolled)

No charting or UI-kit dependency was added; every primitive (rings, bars, chips,
radio rows, tab bar) is hand-built against `design-tokens.md`.

## Project layout

```
App.tsx                     Font loading, providers, navigation root
src/
  theme/                    Design tokens + typography scale
  components/                Shared primitives (Button, Chip, RadioRow, ProgressRing, ...)
  domain/
    types.ts                 Core domain types
    zakat.ts                  Zakat formula (compliantCash + gold + passing holdings - debts)
    compliance.ts             Auto-flagging + override helpers
    hijri.ts                  Hijri date formatting via hijri-converter
    categoryRulings.json      Merchant-category → ruling seed map (data, not code)
    mockData.ts               Prototype figures — see "Data" below
    state/AppStateContext.tsx App-wide state (madhhab, nisab basis, transactions, ...)
  navigation/                Root/onboarding/tab navigators
  screens/                   All 16 screens from screens.md
```

## Data

There is no backend yet. `src/domain/mockData.ts` holds figures that foot exactly to
the ones in `domain-logic.md`'s "Prototype figures" table (net worth, zakat base,
zakat owed, nisab thresholds, excluded amount) — the underlying per-account and
per-holding breakdown was constructed to sum to those totals, since the source docs
only give the aggregates.

Milestones gated on external access (Daftar Efek Syariah feed, gold/silver spot price
API, licensed bank/e-wallet linking) were **not** started, per the build instructions —
the app runs entirely on local mock data and local state until those integrations
exist.

## Running the app

```bash
npm install
npm run start      # Metro bundler — press i/a/w, or scan the QR code in Expo Go
npm run ios        # iOS simulator (macOS only)
npm run android    # Android emulator
npm run web        # Web preview
```

## Type checking

```bash
npx tsc --noEmit
```

## Building for app stores

This project is configured for [EAS Build](https://docs.expo.dev/build/introduction/).
It has not been linked to an Expo account/project yet — running `eas build` for the
first time will prompt to create one and will write an `eas.json` and an `extra.eas.projectId`
into `app.json`.

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform ios
eas build --platform android
```

Bundle identifiers are pre-set in `app.json` (`id.barakah.app`) — change them before
your first submission if you don't own that identifier.

## Non-negotiables carried over from the design brief

- **No red.** Non-compliant items render in muted rose (`#c78ba4`), never red.
- **No purification ledger.** Non-compliant income is flagged and excluded, full stop.
- **Exclusions are shown, not hidden.** The zakat wizard renders excluded amounts as
  an em-dash with a reason.
- **Nisab basis is user-controllable**, defaulted from madhhab.
- **Hijri dates come from a library**, computed live against the current date.
- **Tabular numerals** on every monetary figure and date.

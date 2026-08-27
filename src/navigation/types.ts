export type OnboardingStackParamList = {
  Welcome: undefined;
  Madhhab: undefined;
  CurrencyHaul: undefined;
  AccountLinking: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Arus: undefined;
  AddTab: undefined;
  Investasi: undefined;
  Tujuan: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  Notifications: undefined;
  TransactionDetail: { transactionId: string };
  AddTransaction: undefined;
  ZakatWizard: undefined;
  HoldingDetail: { holdingId: string };
  GoalDetail: { goalId: string };
  Profile: undefined;
};

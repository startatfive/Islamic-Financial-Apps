import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingNavigator from './OnboardingNavigator';
import MainTabs from './MainTabs';
import NotificationsScreen from '../screens/NotificationsScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import ZakatWizardScreen from '../screens/zakat/ZakatWizardScreen';
import HoldingDetailScreen from '../screens/HoldingDetailScreen';
import GoalDetailScreen from '../screens/GoalDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useAppState } from '../domain/state/AppStateContext';
import { color } from '../theme/tokens';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { onboardingComplete } = useAppState();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: color.bg } }}>
      {!onboardingComplete ? (
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ presentation: 'card' }} />
          <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
          <Stack.Screen name="AddTransaction" component={AddTransactionScreen} options={{ presentation: 'modal' }} />
          <Stack.Screen name="ZakatWizard" component={ZakatWizardScreen} />
          <Stack.Screen name="HoldingDetail" component={HoldingDetailScreen} />
          <Stack.Screen name="GoalDetail" component={GoalDetailScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

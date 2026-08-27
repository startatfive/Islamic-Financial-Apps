import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import MadhhabScreen from '../screens/onboarding/MadhhabScreen';
import CurrencyHaulScreen from '../screens/onboarding/CurrencyHaulScreen';
import AccountLinkingScreen from '../screens/onboarding/AccountLinkingScreen';
import { color } from '../theme/tokens';
import type { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: color.bg } }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Madhhab" component={MadhhabScreen} />
      <Stack.Screen name="CurrencyHaul" component={CurrencyHaulScreen} />
      <Stack.Screen name="AccountLinking" component={AccountLinkingScreen} />
    </Stack.Navigator>
  );
}

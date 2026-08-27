import React, { useCallback } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme, Theme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import RootNavigator from './src/navigation/RootNavigator';
import { AppStateProvider } from './src/domain/state/AppStateContext';
import { color } from './src/theme/tokens';

SplashScreen.preventAutoHideAsync().catch(() => {});

const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: color.bg,
    card: color.bg,
    text: color.text,
    border: color.border,
    primary: color.accent,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium });

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: color.bg }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <AppStateProvider>
          <View style={{ flex: 1, backgroundColor: color.bg }}>
            <StatusBar style="light" />
            <NavigationContainer theme={navigationTheme}>
              <RootNavigator />
            </NavigationContainer>
          </View>
        </AppStateProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

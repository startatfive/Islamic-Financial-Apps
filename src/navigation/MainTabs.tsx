import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabBar';
import HomeScreen from '../screens/HomeScreen';
import CashflowScreen from '../screens/CashflowScreen';
import InvestmentsScreen from '../screens/InvestmentsScreen';
import GoalsScreen from '../screens/GoalsScreen';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

/** Renders nothing — the center slot is a spacer under the TabBar's own FAB. */
function AddTabPlaceholder() {
  return <View />;
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Arus" component={CashflowScreen} />
      <Tab.Screen
        name="AddTab"
        component={AddTabPlaceholder}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.getParent()?.navigate('AddTransaction');
          },
        })}
      />
      <Tab.Screen name="Investasi" component={InvestmentsScreen} />
      <Tab.Screen name="Tujuan" component={GoalsScreen} />
    </Tab.Navigator>
  );
}

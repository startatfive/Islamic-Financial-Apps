import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { House, ArrowsLeftRight, ChartLine, Target, Plus } from 'phosphor-react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { color } from '../theme/tokens';

const ICONS: Record<string, typeof House> = {
  Home: House,
  Arus: ArrowsLeftRight,
  Investasi: ChartLine,
  Tujuan: Target,
};

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const routesBeforeFab = state.routes.filter((r) => r.name !== 'AddTab');
  const leftRoutes = routesBeforeFab.slice(0, 2);
  const rightRoutes = routesBeforeFab.slice(2);

  const renderTab = (route: (typeof state.routes)[number]) => {
    const index = state.routes.findIndex((r) => r.key === route.key);
    const focused = state.index === index;
    const Icon = ICONS[route.name] ?? House;
    return (
      <Pressable
        key={route.key}
        accessibilityRole="button"
        accessibilityState={{ selected: focused }}
        onPress={() => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        }}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3, paddingTop: 8 }}
      >
        <Icon size={21} weight="regular" color={focused ? color.accent : color.textFaint} />
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: 58 + insets.bottom,
        paddingBottom: insets.bottom,
        backgroundColor: color.bg,
        borderTopWidth: 1,
        borderTopColor: color.border,
      }}
    >
      {leftRoutes.map(renderTab)}

      <View style={{ width: 66, alignItems: 'center' }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tambah transaksi"
          onPress={() => navigation.getParent()?.navigate('AddTransaction')}
          style={{
            position: 'absolute',
            top: -22,
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: color.accent,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 5,
            borderColor: color.bg,
            shadowColor: color.accent,
            shadowOpacity: 0.4,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 6 },
            elevation: 6,
          }}
        >
          <Plus size={22} weight="bold" color={color.bg} />
        </Pressable>
      </View>

      {rightRoutes.map(renderTab)}
    </View>
  );
}

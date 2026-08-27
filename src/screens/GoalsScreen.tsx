import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ProgressBar from '../components/ProgressBar';
import { color } from '../theme/tokens';
import { type, tabularNumerals } from '../theme/typography';
import { formatCurrency, formatPercent } from '../domain/format';
import { GOALS } from '../domain/mockData';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function GoalsScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <Text style={[type.screenTitle, { paddingTop: 8, marginBottom: 20 }]}>Tujuan</Text>

        <View style={{ gap: 12 }}>
          {GOALS.map((g) => (
            <Pressable
              key={g.id}
              onPress={() => navigation.navigate('GoalDetail', { goalId: g.id })}
              style={{ backgroundColor: color.surface, borderRadius: 8, padding: 16, gap: 10 }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={type.rowLabel}>{g.name}</Text>
                <Text style={[type.secondary, tabularNumerals]}>{formatPercent(g.saved / g.target, 0)}</Text>
              </View>
              <ProgressBar progress={g.saved / g.target} height={5} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[type.note, tabularNumerals]}>
                  {formatCurrency(g.saved)} dari {formatCurrency(g.target)}
                </Text>
                <Text style={type.note}>{g.etaLabel}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

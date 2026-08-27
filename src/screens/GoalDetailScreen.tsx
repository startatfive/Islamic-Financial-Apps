import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenHeader from '../components/ScreenHeader';
import ProgressRing from '../components/ProgressRing';
import Row from '../components/Row';
import TintedPanel from '../components/TintedPanel';
import { color } from '../theme/tokens';
import { type, tabularNumerals } from '../theme/typography';
import { formatCurrency } from '../domain/format';
import { GOALS } from '../domain/mockData';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'GoalDetail'>;

const MONTH_LABELS = ['Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu'];

export default function GoalDetailScreen({ route, navigation }: Props) {
  const goal = GOALS.find((g) => g.id === route.params.goalId);

  if (!goal) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
        <ScreenHeader onBack={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  const progress = goal.saved / goal.target;
  const remaining = goal.target - goal.saved;
  const history = goal.sixMonthHistory;
  const maxHistory = history ? Math.max(...history) : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <ScreenHeader title={goal.name} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 32 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, paddingVertical: 12 }}>
          <ProgressRing size={104} radiusPx={45} circumference={282.7} progress={progress} />
          <View style={{ flex: 1 }}>
            <Text style={type.kicker}>Terkumpul</Text>
            <Text style={[type.sectionFigure, tabularNumerals, { marginTop: 4 }]}>{formatCurrency(goal.saved)}</Text>
            <Text style={[type.secondary, tabularNumerals, { marginTop: 4 }]}>dari {formatCurrency(goal.target)}</Text>
            {goal.quotaEstimateLabel ? <Text style={[type.note, { marginTop: 6 }]}>{goal.quotaEstimateLabel}</Text> : null}
          </View>
        </View>

        <View style={{ gap: 2, marginTop: 16 }}>
          {goal.monthlyDeposit != null && (
            <Row left={<Text style={type.rowLabel}>Setoran bulanan</Text>} right={<Text style={[type.rowFigure, tabularNumerals]}>{formatCurrency(goal.monthlyDeposit)}</Text>} carded />
          )}
          <Row left={<Text style={type.rowLabel}>Kekurangan</Text>} right={<Text style={[type.rowFigure, tabularNumerals]}>{formatCurrency(remaining)}</Text>} carded />
          {goal.heldAt && (
            <Row left={<Text style={type.rowLabel}>Disimpan di</Text>} right={<Text style={[type.secondary, { color: color.text }]}>{goal.heldAt}</Text>} carded />
          )}
          {goal.profitSharingRatio && (
            <Row left={<Text style={type.rowLabel}>Rasio bagi hasil</Text>} right={<Text style={[type.rowFigure, tabularNumerals]}>{goal.profitSharingRatio}</Text>} carded />
          )}
        </View>

        {goal.heldAt?.toLowerCase().includes('mudarabah') && (
          <TintedPanel tone="accent" style={{ marginTop: 16 }}>
            <Text style={type.body}>
              Dana ini disimpan dalam deposito mudarabah, bukan rekening berbunga, sehingga pertumbuhannya
              dihitung dalam dasar zakat tanpa ditandai.
            </Text>
          </TintedPanel>
        )}

        {history && (
          <>
            <Text style={[type.kicker, { marginTop: 24, marginBottom: 12 }]}>Enam bulan terakhir</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10, height: 90 }}>
              {history.map((v, i) => (
                <View key={i} style={{ flex: 1, alignItems: 'center', gap: 6 }}>
                  <View
                    style={{
                      width: '100%',
                      height: Math.max(6, (v / maxHistory) * 70),
                      borderRadius: 4,
                      backgroundColor: i === history.length - 1 ? color.accent : color.border,
                    }}
                  />
                  <Text style={type.note}>{MONTH_LABELS[i]}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

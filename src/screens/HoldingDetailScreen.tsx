import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenHeader from '../components/ScreenHeader';
import ProgressBar from '../components/ProgressBar';
import TintedPanel from '../components/TintedPanel';
import Button from '../components/Button';
import { color } from '../theme/tokens';
import { type, tabularNumerals } from '../theme/typography';
import { formatCurrency, formatPercent } from '../domain/format';
import { HOLDINGS } from '../domain/mockData';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'HoldingDetail'>;

const RATIO_LABELS = {
  interestBearingDebtToAssets: { label: 'Utang berbunga / aset', threshold: 0.33 },
  nonHalalIncomeToRevenue: { label: 'Pendapatan non-halal / pendapatan', threshold: 0.05 },
  cashReceivablesToAssets: { label: 'Kas & piutang / aset', threshold: 0.33 },
} as const;

export default function HoldingDetailScreen({ route, navigation }: Props) {
  const holding = HOLDINGS.find((h) => h.id === route.params.holdingId);
  const [kept, setKept] = useState(false);

  if (!holding) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
        <ScreenHeader onBack={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <ScreenHeader title={holding.ticker} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 32 }}>
        <View style={{ alignItems: 'center', paddingVertical: 12 }}>
          <Text style={type.rowLabel}>{holding.name}</Text>
          <Text style={[type.bigFigure, tabularNumerals, { marginTop: 8 }]}>{formatCurrency(holding.value)}</Text>
          <Text style={[type.secondary, tabularNumerals, { color: holding.changePct >= 0 ? color.accentLight : color.rose, marginTop: 4 }]}>
            {holding.changePct >= 0 ? '+' : ''}
            {holding.changePct.toFixed(1)}%
          </Text>
        </View>

        {!holding.passesDES && holding.removedFromDESNote && (
          <TintedPanel tone="rose" style={{ marginTop: 16 }}>
            <Text style={[type.body, { color: color.roseBody }]}>{holding.removedFromDESNote}</Text>
          </TintedPanel>
        )}

        <Text style={[type.kicker, { marginTop: 24, marginBottom: 12 }]}>Rasio penyaringan</Text>
        <View style={{ gap: 16 }}>
          {(Object.keys(RATIO_LABELS) as (keyof typeof RATIO_LABELS)[]).map((key) => {
            const meta = RATIO_LABELS[key];
            const value = holding.ratios[key];
            const passing = value <= meta.threshold;
            return (
              <View key={key}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={type.secondary}>{meta.label}</Text>
                  <Text style={[type.secondary, tabularNumerals, { color: passing ? color.accentLight : color.rose }]}>
                    {formatPercent(value)}
                  </Text>
                </View>
                <ProgressBar
                  progress={Math.min(value / (meta.threshold * 1.5), 1)}
                  fillColor={passing ? color.accent : color.rose}
                  thresholdAt={meta.threshold / (meta.threshold * 1.5)}
                />
              </View>
            );
          })}
        </View>

        {!holding.passesDES && (
          <>
            <TintedPanel tone="accent" style={{ marginTop: 24 }}>
              <Text style={type.body}>
                Kepemilikan ini tetap dihitung dalam kekayaan bersih Anda, tetapi dikecualikan dari dasar zakat dan
                lencana kepatuhan portofolio.
              </Text>
            </TintedPanel>

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
              <Button label="Rencanakan divestasi" variant="secondary" style={{ flex: 1 }} onPress={() => {}} />
              <Button
                label={kept ? 'Disimpan dengan catatan' : 'Simpan dengan catatan'}
                variant="primary"
                style={{ flex: 1 }}
                onPress={() => setKept(true)}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

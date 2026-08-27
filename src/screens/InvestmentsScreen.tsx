import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ComplianceDot from '../components/ComplianceDot';
import Row from '../components/Row';
import TintedPanel from '../components/TintedPanel';
import IconTile from '../components/IconTile';
import { color } from '../theme/tokens';
import { type, tabularNumerals } from '../theme/typography';
import { formatCurrency, formatPercent } from '../domain/format';
import { HOLDINGS, PORTFOLIO_VALUE } from '../domain/mockData';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function InvestmentsScreen() {
  const navigation = useNavigation<Nav>();
  const failing = HOLDINGS.filter((h) => !h.passesDES);
  const gainAmount = HOLDINGS.reduce((s, h) => s + h.value * (h.changePct / 100), 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <Text style={[type.screenTitle, { paddingTop: 8, marginBottom: 20 }]}>Investasi</Text>

        <Text style={type.kicker}>Nilai portofolio</Text>
        <Text style={[type.bigFigure, tabularNumerals, { marginTop: 6 }]}>{formatCurrency(PORTFOLIO_VALUE)}</Text>
        <Text
          style={[
            type.secondary,
            tabularNumerals,
            { color: gainAmount >= 0 ? color.accentLight : color.rose, marginTop: 4 },
          ]}
        >
          {gainAmount >= 0 ? '+' : ''}
          {formatCurrency(gainAmount)} ({formatPercent(gainAmount / PORTFOLIO_VALUE)}) hari ini
        </Text>

        {failing.length > 0 && (
          <Pressable onPress={() => navigation.navigate('HoldingDetail', { holdingId: failing[0].id })} style={{ marginTop: 20 }}>
            <TintedPanel tone="rose">
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={[type.rowLabel, { color: color.rosePale }]}>
                    {failing[0].name} gagal penyaringan
                  </Text>
                  <Text style={[type.note, { marginTop: 3 }]}>
                    Dikeluarkan dari Daftar Efek Syariah pada tinjauan terakhir.
                  </Text>
                </View>
                <Text style={{ fontFamily: type.secondary.fontFamily, fontSize: 12.5, color: color.rose }}>Tinjau</Text>
              </View>
            </TintedPanel>
          </Pressable>
        )}

        <Text style={[type.kicker, { marginTop: 24, marginBottom: 10 }]}>Kepemilikan</Text>
        <View style={{ gap: 2 }}>
          {HOLDINGS.map((h) => (
            <Row
              key={h.id}
              onPress={() => navigation.navigate('HoldingDetail', { holdingId: h.id })}
              left={
                <>
                  <IconTile initials={h.ticker.slice(0, 3)} />
                  <View style={{ flex: 1 }}>
                    <Text style={type.rowLabel}>{h.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 }}>
                      <ComplianceDot flag={h.flag} size={6} />
                      <Text style={type.note}>{h.verdictNote}</Text>
                    </View>
                  </View>
                </>
              }
              right={
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[type.rowFigure, tabularNumerals]}>{formatCurrency(h.value)}</Text>
                  <Text
                    style={[
                      type.note,
                      tabularNumerals,
                      { color: h.changePct >= 0 ? color.accentLight : color.rose, marginTop: 2 },
                    ]}
                  >
                    {h.changePct >= 0 ? '+' : ''}
                    {h.changePct.toFixed(1)}%
                  </Text>
                </View>
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

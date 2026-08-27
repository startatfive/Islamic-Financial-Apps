import React, { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CaretLeft, CaretRight } from 'phosphor-react-native';
import IconTile from '../components/IconTile';
import ComplianceDot from '../components/ComplianceDot';
import Chip from '../components/Chip';
import Row from '../components/Row';
import { color } from '../theme/tokens';
import { type, tabularNumerals } from '../theme/typography';
import { formatCurrency, formatSignedCurrency } from '../domain/format';
import { formatGregorian } from '../domain/hijri';
import { BAD_SHARE, COMPLIANT_SHARE, SYUBHAT_SHARE } from '../domain/mockData';
import { complianceLabel, complianceLabelShort } from '../domain/compliance';
import { useAppState } from '../domain/state/AppStateContext';
import type { ComplianceFlag } from '../domain/types';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type FilterValue = 'all' | ComplianceFlag;

export default function CashflowScreen() {
  const navigation = useNavigation<Nav>();
  const { transactions } = useAppState();
  const [filter, setFilter] = useState<FilterValue>('all');

  const inflow = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const outflow = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  const filtered = useMemo(
    () => (filter === 'all' ? transactions : transactions.filter((t) => t.flag === filter)),
    [transactions, filter]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, marginBottom: 20 }}>
          <Text style={type.screenTitle}>Arus kas</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <CaretLeft size={18} color={color.textFaint} weight="regular" />
            <Text style={type.rowLabel}>Agustus 2026</Text>
            <CaretRight size={18} color={color.textFaint} weight="regular" />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
          <View style={{ flex: 1, backgroundColor: color.surface, borderRadius: 8, padding: 14 }}>
            <Text style={type.kicker}>Masuk</Text>
            <Text style={[type.rowFigure, tabularNumerals, { color: color.accentLight, marginTop: 6 }]}>
              {formatCurrency(inflow)}
            </Text>
          </View>
          <View style={{ flex: 1, backgroundColor: color.surface, borderRadius: 8, padding: 14 }}>
            <Text style={type.kicker}>Keluar</Text>
            <Text style={[type.rowFigure, tabularNumerals, { marginTop: 6 }]}>{formatCurrency(outflow)}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', height: 9, borderRadius: 4.5, overflow: 'hidden', marginBottom: 10 }}>
          <View style={{ flex: COMPLIANT_SHARE, backgroundColor: color.accent }} />
          <View style={{ flex: SYUBHAT_SHARE, backgroundColor: '#75798c' }} />
          <View style={{ flex: BAD_SHARE, backgroundColor: color.rose }} />
        </View>
        <View style={{ flexDirection: 'row', gap: 16, marginBottom: 20 }}>
          <LegendDot flag="halal" label={`${(COMPLIANT_SHARE * 100).toFixed(0)}%`} />
          <LegendDot flag="syubhat" label={`${(SYUBHAT_SHARE * 100).toFixed(1)}%`} />
          <LegendDot flag="bad" label={`${(BAD_SHARE * 100).toFixed(1)}%`} />
        </View>

        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
          <Chip label="Semua" active={filter === 'all'} onPress={() => setFilter('all')} />
          <Chip label={complianceLabelShort.halal} active={filter === 'halal'} onPress={() => setFilter('halal')} />
          <Chip label={complianceLabelShort.syubhat} active={filter === 'syubhat'} onPress={() => setFilter('syubhat')} />
          <Chip label={complianceLabelShort.bad} active={filter === 'bad'} onPress={() => setFilter('bad')} />
        </View>

        <View style={{ gap: 2 }}>
          {filtered.map((t) => (
            <Row
              key={t.id}
              onPress={() => navigation.navigate('TransactionDetail', { transactionId: t.id })}
              left={
                <>
                  <IconTile initials={t.merchant.slice(0, 2).toUpperCase()} size={34} />
                  <View style={{ flex: 1 }}>
                    <Text style={type.rowLabel}>{t.merchant}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 }}>
                      <ComplianceDot flag={t.flag} size={6} />
                      <Text style={type.note}>
                        {formatGregorian(new Date(t.dateISO))} · {complianceLabel[t.flag]}
                      </Text>
                    </View>
                  </View>
                </>
              }
              right={
                <Text
                  style={[
                    type.rowFigure,
                    tabularNumerals,
                    { color: t.amount > 0 ? (t.flag === 'bad' ? color.rose : color.accentLight) : color.text },
                  ]}
                >
                  {formatSignedCurrency(t.amount)}
                </Text>
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function LegendDot({ flag, label }: { flag: ComplianceFlag; label: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <ComplianceDot flag={flag} size={6} />
      <Text style={type.note}>{label}</Text>
    </View>
  );
}

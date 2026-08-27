import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Bell, Clock, CaretRight } from 'phosphor-react-native';
import IconTile from '../components/IconTile';
import ProgressRing from '../components/ProgressRing';
import ProgressBar from '../components/ProgressBar';
import ComplianceDot from '../components/ComplianceDot';
import TintedPanel from '../components/TintedPanel';
import Row from '../components/Row';
import Hairline from '../components/Hairline';
import { color } from '../theme/tokens';
import { type, tabularNumerals } from '../theme/typography';
import { formatCurrency, formatSignedCurrency, formatGrams, formatPercent } from '../domain/format';
import { formatWithHijri, daysUntil } from '../domain/hijri';
import {
  COMPLIANT_CASH,
  DEBTS_TOTAL,
  GOALS,
  GOLD_HOLDING_GRAMS,
  GOLD_SPOT_PER_GRAM,
  HAUL_DATE,
  HOLDINGS,
  MONTHLY_SPEND,
  COMPLIANT_SHARE,
  SYUBHAT_SHARE,
  BAD_SHARE,
  NET_WORTH,
  NET_WORTH_MONTHLY_DELTA,
  PORTFOLIO_VALUE,
  THIN_STATE,
} from '../domain/mockData';
import { useAppState } from '../domain/state/AppStateContext';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { isThinState, notifications } = useAppState();
  const unreadCount = notifications.filter((n) => n.unread).length;

  const now = new Date();
  const dateLine = formatWithHijri(now);
  const haulDays = daysUntil(HAUL_DATE, now);
  const showHaulBanner = !isThinState && haulDays >= 0 && haulDays <= 30;

  const goldValue = GOLD_HOLDING_GRAMS * GOLD_SPOT_PER_GRAM;
  const reviewCount = HOLDINGS.filter((h) => !h.passesDES).length;
  const nearestGoals = [...GOALS].sort((a, b) => b.saved / b.target - a.saved / a.target).slice(0, 2);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8, marginBottom: 20 }}>
          <Pressable onPress={() => navigation.navigate('Profile')} hitSlop={8}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: color.surface,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontFamily: type.rowLabel.fontFamily, fontSize: 13, color: color.iconTileText }}>AR</Text>
            </View>
          </Pressable>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={type.rowLabel}>Assalamu'alaikum, Ahmad</Text>
            <Text style={[type.note, tabularNumerals, { marginTop: 2 }]}>
              {dateLine.gregorian} · {dateLine.hijri}
            </Text>
          </View>
          <Pressable onPress={() => navigation.navigate('Notifications')} hitSlop={8} style={{ padding: 4 }}>
            <View>
              <Bell size={22} color={color.textMuted} weight="regular" />
              {unreadCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -1,
                    right: -1,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: color.accent,
                  }}
                />
              )}
            </View>
          </Pressable>
        </View>

        {showHaulBanner && (
          <Pressable onPress={() => navigation.navigate('ZakatWizard')} style={{ marginBottom: 20 }}>
            <TintedPanel tone="accent" style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Clock size={20} color={color.accent} weight="regular" />
              <View style={{ flex: 1 }}>
                <Text style={[type.rowLabel, { color: color.accentPale }]}>Haul jatuh {haulDays} hari lagi</Text>
                <Text style={[type.note, tabularNumerals, { marginTop: 3 }]}>
                  {formatWithHijri(HAUL_DATE).gregorian} · estimasi zakat akan dihitung dari kekayaan sesuai syariah
                </Text>
              </View>
              <CaretRight size={16} color={color.accent} weight="regular" />
            </TintedPanel>
          </Pressable>
        )}

        {/* Net worth */}
        <Text style={type.kicker}>Kekayaan bersih</Text>
        <Text style={[type.bigFigure, tabularNumerals, { marginTop: 6 }]}>
          {formatCurrency(isThinState ? THIN_STATE.netWorth : NET_WORTH)}
        </Text>
        <Text style={[type.secondary, tabularNumerals, { color: color.accentLight, marginTop: 4 }]}>
          {formatSignedCurrency(isThinState ? THIN_STATE.monthlyDelta : NET_WORTH_MONTHLY_DELTA)} bulan ini
        </Text>

        <Hairline />

        {/* Compliance ring */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <ProgressRing progress={isThinState ? null : COMPLIANT_SHARE} caption="sesuai" />
          <View style={{ flex: 1, gap: 10 }}>
            {isThinState ? (
              <Text style={type.secondary}>Belum cukup data · {THIN_STATE.transactionCount} transaksi</Text>
            ) : (
              <>
                <Text style={type.secondary}>Dari {formatCurrency(MONTHLY_SPEND)} pengeluaran bulan ini</Text>
                <LegendRow flag="halal" label="Sesuai syariah" amount={MONTHLY_SPEND * COMPLIANT_SHARE} />
                <LegendRow flag="syubhat" label="Syubhat" amount={MONTHLY_SPEND * SYUBHAT_SHARE} />
                <LegendRow flag="bad" label="Tidak sesuai" amount={MONTHLY_SPEND * BAD_SHARE} />
              </>
            )}
          </View>
        </View>

        <Hairline />

        {/* Breakdown */}
        <View style={{ gap: 2 }}>
          <Row
            left={
              <>
                <IconTile initials="Rp" />
                <View>
                  <Text style={type.rowLabel}>Tabungan syariah</Text>
                  <Text style={type.secondary}>3 rekening</Text>
                </View>
              </>
            }
            right={
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[type.rowFigure, tabularNumerals]}>{formatCurrency(COMPLIANT_CASH)}</Text>
                <StatusTag label="Sesuai" tone="accent" />
              </View>
            }
          />
          <Row
            left={
              <>
                <IconTile initials="IV" />
                <View>
                  <Text style={type.rowLabel}>Investasi syariah</Text>
                  <Text style={type.secondary}>{HOLDINGS.length} kepemilikan</Text>
                </View>
              </>
            }
            onPress={() => navigation.navigate('Main')}
            right={
              isThinState ? (
                <Text style={type.secondary}>Belum ada</Text>
              ) : (
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[type.rowFigure, tabularNumerals]}>{formatCurrency(PORTFOLIO_VALUE)}</Text>
                  <StatusTag label={`${reviewCount} perlu tinjau`} tone="rose" />
                </View>
              )
            }
          />
          <Row
            left={
              <>
                <IconTile initials="Au" />
                <View>
                  <Text style={type.rowLabel}>Emas</Text>
                  <Text style={type.secondary}>{formatGrams(GOLD_HOLDING_GRAMS)}</Text>
                </View>
              </>
            }
            right={
              isThinState ? (
                <Text style={type.secondary}>Belum ada</Text>
              ) : (
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[type.rowFigure, tabularNumerals]}>{formatCurrency(goldValue)}</Text>
                  <StatusTag label="Sesuai" tone="accent" />
                </View>
              )
            }
          />
          <Row
            left={
              <>
                <IconTile initials="Hu" />
                <View>
                  <Text style={type.rowLabel}>Utang</Text>
                  <Text style={type.secondary}>2 kewajiban</Text>
                </View>
              </>
            }
            right={
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[type.rowFigure, tabularNumerals]}>{formatCurrency(-DEBTS_TOTAL)}</Text>
                <StatusTag label="Bebas riba" tone="accent" />
              </View>
            }
          />
        </View>

        <Hairline />

        {/* Nearest goals */}
        <Text style={[type.kicker, { marginBottom: 12 }]}>Tujuan terdekat</Text>
        {isThinState ? (
          <Pressable
            onPress={() => navigation.navigate('Main')}
            style={{ backgroundColor: color.surface, borderRadius: 8, padding: 16 }}
          >
            <Text style={type.rowLabel}>Buat tujuan pertama Anda</Text>
            <Text style={[type.secondary, { marginTop: 4 }]}>Mulai menabung untuk haji, umrah, atau dana darurat.</Text>
          </Pressable>
        ) : (
          <View style={{ gap: 10 }}>
            {nearestGoals.map((g) => (
              <Pressable
                key={g.id}
                onPress={() => navigation.navigate('GoalDetail', { goalId: g.id })}
                style={{ backgroundColor: color.surface, borderRadius: 8, padding: 14, gap: 10 }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={type.rowLabel}>{g.name}</Text>
                  <Text style={[type.secondary, tabularNumerals]}>{formatPercent(g.saved / g.target, 0)}</Text>
                </View>
                <ProgressBar progress={g.saved / g.target} height={4} />
                <Text style={[type.note, tabularNumerals]}>
                  {formatCurrency(g.saved)} dari {formatCurrency(g.target)}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function LegendRow({ flag, label, amount }: { flag: 'halal' | 'syubhat' | 'bad'; label: string; amount: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <ComplianceDot flag={flag} />
      <Text style={[type.secondary, { flex: 1 }]}>{label}</Text>
      <Text style={[type.secondary, tabularNumerals, { color: color.textMuted }]}>{formatCurrency(amount)}</Text>
    </View>
  );
}

function StatusTag({ label, tone }: { label: string; tone: 'accent' | 'rose' }) {
  return (
    <Text
      style={{
        fontFamily: type.note.fontFamily,
        fontSize: 11.5,
        color: tone === 'accent' ? color.accentLight : color.rose,
        marginTop: 2,
      }}
    >
      {label}
    </Text>
  );
}

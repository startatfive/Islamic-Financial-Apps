import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenHeader from '../components/ScreenHeader';
import RadioRow from '../components/RadioRow';
import TintedPanel from '../components/TintedPanel';
import { color } from '../theme/tokens';
import { type, tabularNumerals } from '../theme/typography';
import { formatCurrency, formatSignedCurrency } from '../domain/format';
import { formatWithHijri } from '../domain/hijri';
import { isExcluded } from '../domain/compliance';
import { baselineZakat } from '../domain/zakatSummary';
import { useAppState } from '../domain/state/AppStateContext';
import type { ComplianceFlag } from '../domain/types';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'TransactionDetail'>;

const RADIO_LABEL: Record<ComplianceFlag, string> = {
  halal: 'Sesuai',
  syubhat: 'Syubhat',
  bad: 'Tidak sesuai',
};

export default function TransactionDetailScreen({ route, navigation }: Props) {
  const { transactions, overrideMerchantFlag, nisabBasis } = useAppState();
  const tx = transactions.find((t) => t.id === route.params.transactionId);
  const [pending, setPending] = useState<ComplianceFlag | null>(null);

  if (!tx) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
        <ScreenHeader onBack={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  const selected = pending ?? tx.flag;
  const { zakatBase } = baselineZakat(nisabBasis);
  const wasExcluded = isExcluded(tx.autoFlag);

  const consequence: Record<ComplianceFlag, string> = {
    halal: wasExcluded
      ? `${formatCurrency(Math.abs(tx.amount))} akan ditambahkan kembali ke dasar zakat Anda.`
      : `${formatCurrency(Math.abs(tx.amount))} tetap termasuk dalam dasar zakat Anda.`,
    syubhat: 'Jumlah tetap dihitung, tetapi muncul di daftar tinjauan bulanan.',
    bad: `Dasar zakat Anda tetap ${formatCurrency(zakatBase)}.`,
  };

  const stamp = formatWithHijri(new Date(tx.dateISO));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <ScreenHeader onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 32, alignItems: 'center' }}>
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            backgroundColor: color.surface,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 12,
          }}
        >
          <Text style={{ fontFamily: type.rowLabel.fontFamily, fontSize: 18, color: color.iconTileText }}>
            {tx.merchant.slice(0, 2).toUpperCase()}
          </Text>
        </View>

        <Text
          style={[
            type.bigFigure,
            tabularNumerals,
            { marginTop: 16, color: tx.amount > 0 ? color.accentLight : color.text },
          ]}
        >
          {formatSignedCurrency(tx.amount)}
        </Text>
        <Text style={[type.rowLabel, { marginTop: 6 }]}>{tx.merchant}</Text>
        <Text style={[type.secondary, { marginTop: 2, textTransform: 'capitalize' }]}>{tx.category}</Text>
        <Text style={[type.timestamp, tabularNumerals, { marginTop: 8 }]}>
          {stamp.gregorian} · {stamp.hijri}
        </Text>

        {wasExcluded && tx.autoFlagReason ? (
          <TintedPanel tone="rose" style={{ width: '100%', marginTop: 24 }}>
            <Text style={[type.body, { color: color.roseBody }]}>{tx.autoFlagReason}</Text>
          </TintedPanel>
        ) : null}

        <View style={{ width: '100%', marginTop: 24, gap: 8 }}>
          <Text style={[type.kicker, { marginBottom: 4 }]}>Ubah status syariah</Text>
          {(['halal', 'syubhat', 'bad'] as ComplianceFlag[]).map((flag) => (
            <RadioRow
              key={flag}
              label={RADIO_LABEL[flag]}
              note={consequence[flag]}
              selected={selected === flag}
              onPress={() => {
                setPending(flag);
                overrideMerchantFlag(tx.merchant, flag, tx.category);
              }}
            />
          ))}
        </View>

        <Text style={[type.note, { width: '100%', marginTop: 16 }]}>
          Perubahan ini akan diingat untuk semua transaksi dari "{tx.merchant}" di masa mendatang.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenHeader from '../../components/ScreenHeader';
import SegmentedControl from '../../components/SegmentedControl';
import TintedPanel from '../../components/TintedPanel';
import Button from '../../components/Button';
import { color } from '../../theme/tokens';
import { type, tabularNumerals } from '../../theme/typography';
import { useAppState } from '../../domain/state/AppStateContext';
import { formatWithHijri } from '../../domain/hijri';
import { HAUL_DATE } from '../../domain/mockData';
import type { OnboardingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'CurrencyHaul'>;

export default function CurrencyHaulScreen({ navigation }: Props) {
  const { currency, setCurrency } = useAppState();
  const haul = formatWithHijri(HAUL_DATE);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <ScreenHeader onBack={() => navigation.goBack()} />
      <View style={{ paddingHorizontal: 22, flex: 1 }}>
        <Text style={type.accentKicker}>Langkah 2 dari 3</Text>
        <Text style={[type.screenTitle, { marginTop: 8, marginBottom: 20 }]}>Currency and your first haul</Text>

        <Text style={[type.rowLabel, { marginBottom: 8 }]}>Mata uang</Text>
        <SegmentedControl
          options={[
            { value: 'IDR', label: 'IDR' },
            { value: 'MYR', label: 'MYR' },
          ]}
          value={currency}
          onChange={setCurrency}
        />

        <Text style={[type.rowLabel, { marginTop: 24, marginBottom: 8 }]}>Tanggal haul</Text>
        <View
          style={{
            backgroundColor: color.surface,
            borderRadius: 8,
            padding: 14,
          }}
        >
          <Text style={[type.rowFigure, tabularNumerals]}>{haul.gregorian}</Text>
          <Text style={[type.secondary, tabularNumerals, { marginTop: 3 }]}>{haul.hijri}</Text>
        </View>

        <TintedPanel tone="accent" style={{ marginTop: 20 }}>
          <Text style={type.body}>
            Kami akan mengingatkan Anda 30, 7 dan 1 hari sebelum haul. Setelah tanggal ini, perhitungan tetap
            terbuka selama satu bulan lunar penuh sebagai masa tenggang.
          </Text>
        </TintedPanel>

        <View style={{ flex: 1 }} />
        <Button label="Lanjutkan" style={{ marginBottom: 24 }} onPress={() => navigation.navigate('AccountLinking')} />
      </View>
    </SafeAreaView>
  );
}

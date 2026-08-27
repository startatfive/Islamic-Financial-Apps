import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenHeader from '../../components/ScreenHeader';
import RadioRow from '../../components/RadioRow';
import Button from '../../components/Button';
import { color } from '../../theme/tokens';
import { type } from '../../theme/typography';
import { useAppState } from '../../domain/state/AppStateContext';
import type { Madhhab } from '../../domain/types';
import type { OnboardingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Madhhab'>;

const OPTIONS: { value: Madhhab; label: string; note: string }[] = [
  { value: 'hanafi', label: 'Hanafi', note: 'Nisab perak · zakat atas barang dagang' },
  { value: 'syafii', label: "Syafi'i", note: 'Umum di Indonesia & Malaysia (default)' },
  { value: 'maliki', label: 'Maliki', note: 'Nisab emas · haul lunar penuh' },
  { value: 'hanbali', label: 'Hanbali', note: 'Nisab emas · perhitungan konservatif' },
];

export default function MadhhabScreen({ navigation }: Props) {
  const { madhhab, setMadhhab } = useAppState();
  const [selected, setSelected] = useState<Madhhab>(madhhab);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <ScreenHeader onBack={() => navigation.goBack()} />
      <View style={{ paddingHorizontal: 22, flex: 1 }}>
        <Text style={type.accentKicker}>Langkah 1 dari 3</Text>
        <Text style={[type.screenTitle, { marginTop: 8, marginBottom: 20 }]}>
          Which school of law should we follow?
        </Text>

        <View style={{ gap: 8 }}>
          {OPTIONS.map((opt) => (
            <RadioRow
              key={opt.value}
              label={opt.label}
              note={opt.note}
              selected={selected === opt.value}
              onPress={() => setSelected(opt.value)}
            />
          ))}
        </View>

        <View style={{ flex: 1 }} />
        <Button
          label="Lanjutkan"
          style={{ marginBottom: 24 }}
          onPress={() => {
            setMadhhab(selected);
            navigation.navigate('CurrencyHaul');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

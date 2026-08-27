import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenHeader from '../components/ScreenHeader';
import Chip from '../components/Chip';
import Keypad from '../components/Keypad';
import Button from '../components/Button';
import TintedPanel from '../components/TintedPanel';
import { color } from '../theme/tokens';
import { type, tabularNumerals } from '../theme/typography';
import { suggestedFlagFor, reasonFor, nextFlag, complianceLabel } from '../domain/compliance';
import { useAppState } from '../domain/state/AppStateContext';
import type { Category, ComplianceFlag } from '../domain/types';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddTransaction'>;

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'belanja', label: 'Belanja' },
  { value: 'transportasi', label: 'Transportasi' },
  { value: 'gaji', label: 'Gaji' },
  { value: 'sadaqah', label: 'Sadaqah' },
  { value: 'hiburan', label: 'Hiburan' },
  { value: 'investasi', label: 'Investasi' },
];

export default function AddTransactionScreen({ navigation }: Props) {
  const { addTransaction } = useAppState();
  const [digits, setDigits] = useState('');
  const [category, setCategory] = useState<Category | null>(null);
  const [flagOverride, setFlagOverride] = useState<ComplianceFlag | null>(null);

  const amount = digits === '' ? 0 : parseInt(digits, 10);
  const suggestedFlag = category ? suggestedFlagFor(category) : null;
  const effectiveFlag = flagOverride ?? suggestedFlag;
  const ready = amount > 0 && category != null;

  const onKey = (key: string) => {
    if (key === 'del') {
      setDigits((d) => d.slice(0, -1));
      return;
    }
    if (digits.length >= 12) return;
    setDigits((d) => (d === '0' ? key.replace(/^0+/, '') || '0' : d + key));
  };

  const onCategoryPress = (value: Category) => {
    setCategory(value);
    setFlagOverride(null);
  };

  const onSubmit = () => {
    if (!ready || !category || !effectiveFlag) return;
    const signedAmount = category === 'gaji' ? amount : -amount;
    addTransaction({ merchant: CATEGORIES.find((c) => c.value === category)!.label, amount: signedAmount, category, flag: effectiveFlag });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <ScreenHeader onClose={() => navigation.goBack()} />
      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        <View style={{ alignItems: 'center', paddingVertical: 16 }}>
          <Text
            style={[
              type.bigFigure,
              tabularNumerals,
              { fontSize: 36, color: digits === '' ? color.textGhost : color.text },
            ]}
          >
            {digits === '' ? 'Rp 0' : `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {CATEGORIES.map((c) => (
            <Chip key={c.value} label={c.label} active={category === c.value} onPress={() => onCategoryPress(c.value)} />
          ))}
        </View>

        {category && effectiveFlag && (
          <TintedPanel tone={effectiveFlag === 'bad' ? 'rose' : 'accent'} style={{ marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    type.rowLabel,
                    { color: effectiveFlag === 'bad' ? color.rosePale : color.accentPale },
                  ]}
                >
                  {complianceLabel[effectiveFlag]}
                </Text>
                <Text style={[type.note, { marginTop: 3 }]}>{reasonFor(category)}</Text>
              </View>
              <Pressable onPress={() => setFlagOverride(nextFlag(effectiveFlag))} hitSlop={8}>
                <Text style={{ fontFamily: type.secondary.fontFamily, fontSize: 13, color: color.accentLight }}>
                  Ubah
                </Text>
              </Pressable>
            </View>
          </TintedPanel>
        )}

        <View style={{ flex: 1 }} />
        <Keypad onKey={onKey} />
        <Button
          label={ready ? 'Simpan transaksi' : 'Isi jumlah & kategori'}
          disabled={!ready}
          onPress={onSubmit}
          style={{ marginTop: 16, marginBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

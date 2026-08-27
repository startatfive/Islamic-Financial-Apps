import React, { useMemo, useState } from 'react';
import { Linking, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenHeader from '../../components/ScreenHeader';
import Row from '../../components/Row';
import RadioRow from '../../components/RadioRow';
import TintedPanel from '../../components/TintedPanel';
import Button from '../../components/Button';
import { color } from '../../theme/tokens';
import { type, tabularNumerals } from '../../theme/typography';
import { formatCurrency, formatGrams } from '../../domain/format';
import { computeZakat } from '../../domain/zakat';
import {
  CASH_ACCOUNTS,
  COMPLIANT_CASH,
  DEBTS,
  DEBTS_TOTAL,
  EXCLUDED_AMOUNT,
  GOLD_HOLDING_GRAMS,
  GOLD_SPOT_PER_GRAM,
  HOLDINGS,
  PASSING_HOLDINGS_VALUE,
  SILVER_SPOT_PER_GRAM,
} from '../../domain/mockData';
import { useAppState } from '../../domain/state/AppStateContext';
import type { NisabBasis } from '../../domain/types';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ZakatWizard'>;

const STEP_META = [
  { kicker: 'Langkah 1 dari 4', title: 'Aset Anda', blurb: 'Kekayaan yang dihitung dalam dasar zakat tahun ini.' },
  { kicker: 'Langkah 2 dari 4', title: 'Kewajiban Anda', blurb: 'Utang yang jatuh tempo dalam satu haul dikurangkan.' },
  { kicker: 'Langkah 3 dari 4', title: 'Nisab', blurb: 'Ambang batas kewajiban zakat, mengikuti mazhab Anda.' },
  { kicker: 'Langkah 4 dari 4', title: 'Hasil', blurb: 'Zakat yang wajib ditunaikan tahun ini.' },
];

const AMIL = [
  { id: 'baznas', name: 'BAZNAS', url: 'https://baznas.go.id' },
  { id: 'dompet-dhuafa', name: 'Dompet Dhuafa', url: 'https://www.dompetdhuafa.org' },
  { id: 'rumah-zakat', name: 'Rumah Zakat', url: 'https://www.rumahzakat.org' },
];

export default function ZakatWizardScreen({ navigation }: Props) {
  const { nisabBasis: globalNisabBasis, setNisabBasis: setGlobalNisabBasis } = useAppState();
  const [step, setStep] = useState(0);
  const [nisabBasis, setNisabBasis] = useState<NisabBasis>(globalNisabBasis);

  const result = useMemo(
    () =>
      computeZakat({
        compliantCash: COMPLIANT_CASH,
        goldGrams: GOLD_HOLDING_GRAMS,
        goldSpotPerGram: GOLD_SPOT_PER_GRAM,
        passingHoldingsValue: PASSING_HOLDINGS_VALUE,
        debtsDueWithinHaul: DEBTS_TOTAL,
        nisabBasis,
        silverSpotPerGram: SILVER_SPOT_PER_GRAM,
      }),
    [nisabBasis]
  );

  const meta = STEP_META[step];
  const failingHolding = HOLDINGS.find((h) => !h.passesDES);
  const goldValue = GOLD_HOLDING_GRAMS * GOLD_SPOT_PER_GRAM;

  const goBackOrExit = () => {
    if (step === 0) navigation.goBack();
    else setStep((s) => s - 1);
  };

  const goNext = () => {
    if (step === 3) {
      navigation.goBack();
      return;
    }
    if (step === 2) setGlobalNisabBasis(nisabBasis);
    setStep((s) => s + 1);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <ScreenHeader onBack={goBackOrExit} />
      <View style={{ paddingHorizontal: 22 }}>
        <View style={{ flexDirection: 'row', gap: 6, marginBottom: 16 }}>
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              style={{ flex: 1, height: 3, borderRadius: 1.5, backgroundColor: i <= step ? color.accent : color.border }}
            />
          ))}
        </View>
        <Text style={type.accentKicker}>{meta.kicker}</Text>
        <Text style={[type.screenTitle, { marginTop: 6 }]}>{meta.title}</Text>
        <Text style={[type.body, { marginTop: 6, marginBottom: 20 }]}>{meta.blurb}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 24 }}>
        {step === 0 && (
          <View style={{ gap: 2 }}>
            <Row
              left={<RowText label="Tabungan syariah" note={`${CASH_ACCOUNTS.length} rekening`} />}
              right={<Figure value={formatCurrency(COMPLIANT_CASH)} />}
              carded
            />
            <Row
              left={<RowText label="Emas" note={formatGrams(GOLD_HOLDING_GRAMS)} />}
              right={<Figure value={formatCurrency(goldValue)} />}
              carded
            />
            <Row
              left={<RowText label="Investasi lolos DES" note={`5 dari ${HOLDINGS.length} kepemilikan`} />}
              right={<Figure value={formatCurrency(PASSING_HOLDINGS_VALUE)} />}
              carded
            />
            {failingHolding && (
              <Row
                left={<RowText label={failingHolding.name} note="Dikecualikan — keluar dari DES" rose />}
                right={<Figure value="—" rose />}
                carded
              />
            )}
            <Row
              left={<RowText label="Bunga tabungan (kumulatif)" note="Dikecualikan — terdeteksi riba" rose />}
              right={<Figure value="—" rose />}
              carded
            />
            <TintedPanel tone="rose" style={{ marginTop: 12 }}>
              <Text style={[type.body, { color: color.roseBody }]}>
                {formatCurrency(EXCLUDED_AMOUNT)} dikecualikan dari dasar zakat. Jumlah ini tetap ditampilkan agar
                dapat diperiksa, bukan disembunyikan.
              </Text>
            </TintedPanel>
            <Text style={[type.kicker, { marginTop: 20 }]}>Total aset zakat</Text>
            <Text style={[type.sectionFigure, tabularNumerals, { marginTop: 4 }]}>{formatCurrency(result.zakatAssets)}</Text>
          </View>
        )}

        {step === 1 && (
          <View style={{ gap: 2 }}>
            <Row left={<RowText label="Total aset zakat" />} right={<Figure value={formatCurrency(result.zakatAssets)} />} carded />
            {DEBTS.map((d) => (
              <Row
                key={d.id}
                left={<RowText label={d.name} note={(d as { dueLabel?: string }).dueLabel} />}
                right={<Figure value={`-${formatCurrency(d.amount)}`} />}
                carded
              />
            ))}
            <Text style={[type.kicker, { marginTop: 20 }]}>Dasar zakat bersih</Text>
            <Text style={[type.sectionFigure, tabularNumerals, { marginTop: 4 }]}>{formatCurrency(result.zakatBase)}</Text>
          </View>
        )}

        {step === 2 && (
          <View style={{ gap: 10 }}>
            <RadioRow
              label={`Emas · ${formatGrams(85)}`}
              note="Digunakan Syafi'i, Maliki, Hanbali"
              selected={nisabBasis === 'gold'}
              onPress={() => setNisabBasis('gold')}
              trailing={<Text style={[type.secondary, tabularNumerals, { color: color.accentLight }]}>{formatCurrency(result.nisabGold)}</Text>}
            />
            <RadioRow
              label={`Perak · ${formatGrams(595)}`}
              note="Digunakan Hanafi"
              selected={nisabBasis === 'silver'}
              onPress={() => setNisabBasis('silver')}
              trailing={<Text style={[type.secondary, tabularNumerals, { color: color.accentLight }]}>{formatCurrency(result.nisabSilver)}</Text>}
            />
            <TintedPanel tone={result.meetsNisab ? 'accent' : 'rose'} style={{ marginTop: 8 }}>
              <Text style={[type.body, { color: result.meetsNisab ? color.accentPale : color.roseBody }]}>
                {result.meetsNisab
                  ? `Dasar zakat Anda (${formatCurrency(result.zakatBase)}) melebihi nisab yang dipilih. Zakat wajib ditunaikan.`
                  : `Dasar zakat Anda (${formatCurrency(result.zakatBase)}) berada di bawah nisab yang dipilih. Zakat belum wajib tahun ini.`}
              </Text>
            </TintedPanel>
          </View>
        )}

        {step === 3 && (
          <View>
            <View style={{ alignItems: 'center', paddingVertical: 12 }}>
              <Text style={[type.bigFigure, tabularNumerals]}>{formatCurrency(result.zakatOwed)}</Text>
              <Text style={[type.secondary, { marginTop: 4 }]}>2,5% dari dasar zakat</Text>
            </View>
            <View style={{ gap: 2, marginTop: 12 }}>
              <Row left={<RowText label="Total aset zakat" />} right={<Figure value={formatCurrency(result.zakatAssets)} />} carded />
              <Row left={<RowText label="Kewajiban dikurangkan" />} right={<Figure value={`-${formatCurrency(DEBTS_TOTAL)}`} />} carded />
              <Row
                left={<RowText label="Nisab digunakan" note={nisabBasis === 'gold' ? 'Emas 85 g' : 'Perak 595 g'} />}
                right={<Figure value={formatCurrency(result.nisabUsed)} />}
                carded
              />
              <Row left={<RowText label="Jumlah dikecualikan" note="Lihat langkah 1" rose />} right={<Figure value={formatCurrency(EXCLUDED_AMOUNT)} rose />} carded />
            </View>

            <Text style={[type.kicker, { marginTop: 24, marginBottom: 10 }]}>Salurkan melalui</Text>
            <View style={{ gap: 8 }}>
              {AMIL.map((a) => (
                <Pressable
                  key={a.id}
                  onPress={() => Linking.openURL(a.url)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 14,
                    borderRadius: 8,
                    backgroundColor: color.surface,
                  }}
                >
                  <Text style={type.rowLabel}>{a.name}</Text>
                  <Text style={{ fontFamily: type.secondary.fontFamily, fontSize: 12.5, color: color.accentLight }}>
                    Buka →
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={{ paddingHorizontal: 22, paddingBottom: 20 }}>
        <Button label={step === 3 ? 'Selesai' : 'Lanjutkan'} onPress={goNext} />
      </View>
    </SafeAreaView>
  );
}

function RowText({ label, note, rose }: { label: string; note?: string; rose?: boolean }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={[type.rowLabel, rose && { color: color.roseBody }]}>{label}</Text>
      {note ? <Text style={[type.secondary, { marginTop: 2 }, rose && { color: color.rose }]}>{note}</Text> : null}
    </View>
  );
}

function Figure({ value, rose }: { value: string; rose?: boolean }) {
  return (
    <Text style={[type.rowFigure, tabularNumerals, rose && { color: color.rose }]}>{value}</Text>
  );
}

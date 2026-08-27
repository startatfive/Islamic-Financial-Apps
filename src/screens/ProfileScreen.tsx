import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { SignOut } from 'phosphor-react-native';
import ScreenHeader from '../components/ScreenHeader';
import IconTile from '../components/IconTile';
import Row from '../components/Row';
import Hairline from '../components/Hairline';
import { color } from '../theme/tokens';
import { type } from '../theme/typography';
import { formatWithHijri } from '../domain/hijri';
import { HAUL_DATE } from '../domain/mockData';
import { useAppState } from '../domain/state/AppStateContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const MADHHAB_LABEL: Record<string, string> = { hanafi: 'Hanafi', syafii: "Syafi'i", maliki: 'Maliki', hanbali: 'Hanbali' };
const NISAB_LABEL: Record<string, string> = { gold: 'Emas · 85 g', silver: 'Perak · 595 g' };

export default function ProfileScreen({ navigation }: Props) {
  const { madhhab, nisabBasis, linkedAccounts } = useAppState();

  const preferences = [
    { label: 'Mazhab', value: MADHHAB_LABEL[madhhab] },
    { label: 'Dasar nisab', value: NISAB_LABEL[nisabBasis] },
    { label: 'Tanggal haul', value: formatWithHijri(HAUL_DATE).gregorian },
    { label: 'Penandaan otomatis', value: 'Aktif' },
    { label: 'Kalender', value: 'Gregorian + Hijri' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <ScreenHeader onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 32 }}>
        <View style={{ alignItems: 'center', paddingVertical: 12 }}>
          <View
            style={{
              width: 68,
              height: 68,
              borderRadius: 34,
              backgroundColor: color.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontFamily: type.screenTitle.fontFamily, fontSize: 22, color: color.iconTileText }}>AR</Text>
          </View>
          <Text style={[type.rowLabel, { fontSize: 16, marginTop: 12 }]}>Ahmad Rahman</Text>
          <Text style={[type.secondary, { marginTop: 3 }]}>ahmad.rahman@email.com · Jakarta</Text>
        </View>

        <Hairline />

        <Text style={[type.kicker, { marginBottom: 8 }]}>Preferensi syariah</Text>
        <View style={{ gap: 2 }}>
          {preferences.map((p) => (
            <Row
              key={p.label}
              left={<Text style={type.rowLabel}>{p.label}</Text>}
              right={<Text style={{ fontFamily: type.rowLabel.fontFamily, fontSize: 14, color: color.accentLight }}>{p.value}</Text>}
            />
          ))}
        </View>

        <Hairline />

        <Text style={[type.kicker, { marginBottom: 8 }]}>Rekening tertaut</Text>
        <View style={{ gap: 2 }}>
          {linkedAccounts
            .filter((a) => a.connected || a.conventional)
            .map((a) => (
              <Row
                key={a.id}
                left={
                  <>
                    <IconTile initials={a.initials} />
                    <View>
                      <Text style={type.rowLabel}>{a.name}</Text>
                      <Text style={[type.secondary, { marginTop: 2 }]}>
                        {a.conventional ? 'Hanya baca · ditandai konvensional' : a.syncedLabel}
                      </Text>
                    </View>
                  </>
                }
              />
            ))}
        </View>

        <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 28, alignSelf: 'center' }}>
          <SignOut size={16} color={color.textFaint} weight="regular" />
          <Text style={{ fontFamily: type.secondary.fontFamily, fontSize: 13, color: color.textFaint }}>Keluar</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

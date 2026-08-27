import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenHeader from '../../components/ScreenHeader';
import IconTile from '../../components/IconTile';
import Button from '../../components/Button';
import { color } from '../../theme/tokens';
import { type } from '../../theme/typography';
import { useAppState } from '../../domain/state/AppStateContext';
import type { OnboardingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'AccountLinking'>;

export default function AccountLinkingScreen({ navigation }: Props) {
  const { linkedAccounts, toggleAccount, linkedCount, completeOnboarding } = useAppState();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <ScreenHeader onBack={() => navigation.goBack()} />
      <View style={{ paddingHorizontal: 22, flex: 1 }}>
        <Text style={type.accentKicker}>Langkah 3 dari 3</Text>
        <Text style={[type.screenTitle, { marginTop: 8, marginBottom: 20 }]}>Hubungkan rekening Anda</Text>

        <ScrollView contentContainerStyle={{ gap: 7 }} showsVerticalScrollIndicator={false}>
          {linkedAccounts.map((acc) => (
            <Pressable
              key={acc.id}
              onPress={() => toggleAccount(acc.id)}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                padding: 12,
                borderRadius: 8,
                backgroundColor: pressed ? color.surfaceHover : color.surface,
              })}
            >
              <IconTile initials={acc.initials} />
              <View style={{ flex: 1 }}>
                <Text style={type.rowLabel}>{acc.name}</Text>
                <Text style={[type.secondary, { marginTop: 2 }]}>{acc.type}</Text>
              </View>
              <Text
                style={{
                  fontFamily: type.secondary.fontFamily,
                  fontSize: 12.5,
                  color: acc.connected ? color.accentLight : color.textFaint,
                }}
              >
                {acc.connected ? 'Terhubung' : 'Hubungkan'}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={{ paddingVertical: 20, gap: 12 }}>
          <Button
            label={linkedCount > 0 ? `Hubungkan ${linkedCount} akun` : 'Pilih minimal satu akun'}
            disabled={linkedCount === 0}
            onPress={completeOnboarding}
          />
          <Button label="Lewati untuk sekarang" variant="ghost" onPress={completeOnboarding} />
        </View>
      </View>
    </SafeAreaView>
  );
}

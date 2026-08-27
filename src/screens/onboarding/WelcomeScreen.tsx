import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../../components/Button';
import { color } from '../../theme/tokens';
import { type } from '../../theme/typography';
import type { OnboardingStackParamList } from '../../navigation/types';
import { useAppState } from '../../domain/state/AppStateContext';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  const { completeOnboarding } = useAppState();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'space-between' }}>
        <View
          style={{
            marginTop: 28,
            width: 42,
            height: 42,
            borderRadius: 11,
            borderWidth: 1,
            borderColor: color.accent,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: color.accent,
            shadowOpacity: 0.55,
            shadowRadius: 13,
            shadowOffset: { width: 0, height: 0 },
          }}
        >
          <Text style={{ fontFamily: type.screenTitle.fontFamily, fontSize: 18, color: color.accentLight }}>B</Text>
        </View>

        <View style={{ paddingBottom: 36, gap: 14 }}>
          <Text style={type.heroHeadline}>Money you can account for.</Text>
          <Text style={type.body}>
            Barakah tracks your net worth, cashflow and investments — then shows you which parts are syariah
            compliant, and which still need a decision.
          </Text>
          <Text style={type.secondary}>Gratis untuk memulai. Tidak perlu rekening bank.</Text>

          <View style={{ gap: 12, marginTop: 10 }}>
            <Button label="Mulai" onPress={() => navigation.navigate('Madhhab')} />
            <Button label="Saya sudah punya akun" variant="ghost" onPress={completeOnboarding} />
          </View>

          <View style={{ flexDirection: 'row', gap: 6, marginTop: 20 }}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={{
                  width: 20,
                  height: 3,
                  borderRadius: 1.5,
                  backgroundColor: i === 0 ? color.accent : color.border,
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

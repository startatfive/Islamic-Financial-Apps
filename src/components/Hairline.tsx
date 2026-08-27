import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { hairlineMargin } from '../theme/tokens';

/** Section-separating hairline that fades to transparent 48px from each end. */
export default function Hairline({ marginTop = hairlineMargin, marginBottom = hairlineMargin }: {
  marginTop?: number;
  marginBottom?: number;
}) {
  return (
    <View style={{ marginTop, marginBottom }}>
      <LinearGradient
        colors={[
          'rgba(233,233,237,0)',
          'rgba(233,233,237,0.14)',
          'rgba(233,233,237,0.14)',
          'rgba(233,233,237,0)',
        ]}
        locations={[0, 0.12, 0.88, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ height: 1 }}
      />
    </View>
  );
}

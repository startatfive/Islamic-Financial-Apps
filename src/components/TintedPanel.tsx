import React from 'react';
import { View, ViewStyle } from 'react-native';
import { color, tint } from '../theme/tokens';

/** Tinted panel: 10-12% accent/rose fill, 2px left border in the solid color. */
export default function TintedPanel({
  tone = 'accent',
  children,
  style,
}: {
  tone?: 'accent' | 'rose';
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: tint(tone, 0.11),
          borderLeftWidth: 2,
          borderLeftColor: tone === 'accent' ? color.accent : color.rose,
          borderRadius: 8,
          padding: 14,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

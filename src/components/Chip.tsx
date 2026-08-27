import React from 'react';
import { Pressable, Text } from 'react-native';
import { color, radius, tint } from '../theme/tokens';
import { fontFamily } from '../theme/typography';

export default function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => ({
        paddingVertical: 8,
        paddingHorizontal: 13,
        borderRadius: radius.chip,
        backgroundColor: active ? tint('accent', 0.18) : color.surface,
        borderWidth: active ? 1 : 0,
        borderColor: active ? color.accent : 'transparent',
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <Text
        style={{
          fontFamily: fontFamily.regular,
          fontSize: 13,
          color: active ? color.chipActiveText : color.textDim,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

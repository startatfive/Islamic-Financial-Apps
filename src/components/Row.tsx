import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { color, radius } from '../theme/tokens';

/** Flush list row: 8px inset so the press/hover background extends past the text. */
export default function Row({
  left,
  right,
  onPress,
  style,
  carded = false,
}: {
  left: React.ReactNode;
  right?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  carded?: boolean;
}) {
  const base: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: carded ? 13 : 10,
    paddingHorizontal: 8,
    borderRadius: radius.row,
    backgroundColor: carded ? color.surface : 'transparent',
  };
  const content = (
    <>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }}>{left}</View>
      {right}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [base, pressed && { backgroundColor: color.surfaceHover }, style]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[base, style]}>{content}</View>;
}

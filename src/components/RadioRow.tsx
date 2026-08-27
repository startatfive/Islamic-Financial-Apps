import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { color, radius } from '../theme/tokens';
import { fontFamily } from '../theme/typography';

export default function RadioRow({
  label,
  note,
  selected,
  onPress,
  trailing,
}: {
  label: string;
  note?: string;
  selected: boolean;
  onPress: () => void;
  /** Optional right-aligned content, e.g. a threshold amount. */
  trailing?: React.ReactNode;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 13,
        paddingHorizontal: 14,
        borderRadius: radius.row,
        backgroundColor: color.surface,
        borderWidth: 1,
        borderColor: selected ? color.accent : 'transparent',
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <View
        style={{
          width: 16,
          height: 16,
          borderRadius: 8,
          borderWidth: selected ? 5 : 1.5,
          borderColor: selected ? color.accent : '#595d6c',
          backgroundColor: selected ? color.surface : 'transparent',
        }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: fontFamily.medium, fontSize: 14, color: color.text }}>{label}</Text>
        {note ? (
          <Text style={{ fontFamily: fontFamily.regular, fontSize: 12, color: color.textFaint, marginTop: 3 }}>
            {note}
          </Text>
        ) : null}
      </View>
      {trailing}
    </Pressable>
  );
}

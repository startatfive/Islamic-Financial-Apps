import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { color, radius } from '../theme/tokens';
import { fontFamily } from '../theme/typography';

export default function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: color.surface,
        borderRadius: radius.row,
        padding: 3,
      }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={{
              flex: 1,
              paddingVertical: 9,
              borderRadius: radius.row - 2,
              alignItems: 'center',
              backgroundColor: active ? color.surfaceHover : 'transparent',
              borderWidth: active ? 1 : 0,
              borderColor: active ? color.accent : 'transparent',
            }}
          >
            <Text
              style={{
                fontFamily: fontFamily.medium,
                fontSize: 14,
                color: active ? color.text : color.textFaint,
              }}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

import React from 'react';
import { Pressable, Text, ViewStyle, ActivityIndicator } from 'react-native';
import { color, radius } from '../theme/tokens';
import { fontFamily } from '../theme/typography';

type Variant = 'primary' | 'secondary' | 'ghost';

export default function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}) {
  const isOutline = variant === 'primary' || variant === 'secondary';
  const borderColor = variant === 'primary' ? color.accent : variant === 'secondary' ? color.border : 'transparent';
  const textColor = variant === 'primary' ? color.accentLight : variant === 'secondary' ? color.text : color.textFaint;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          height: variant === 'ghost' ? 'auto' : 45,
          minHeight: variant === 'ghost' ? 22 : 45,
          borderRadius: radius.row,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          opacity: disabled ? 0.45 : pressed ? 0.72 : 1,
          backgroundColor: variant === 'ghost' ? 'transparent' : pressed ? 'rgba(145,132,217,0.08)' : 'transparent',
          borderWidth: isOutline ? 1 : 0,
          borderColor,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          style={{
            fontFamily: fontFamily.medium,
            fontSize: 15,
            color: textColor,
          }}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

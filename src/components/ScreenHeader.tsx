import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { CaretLeft, X } from 'phosphor-react-native';
import { color, iconStroke } from '../theme/tokens';
import { type } from '../theme/typography';

export default function ScreenHeader({
  title,
  onBack,
  onClose,
  trailing,
}: {
  title?: string;
  onBack?: () => void;
  onClose?: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 22,
        paddingTop: 8,
        paddingBottom: 14,
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={onClose ? 'Tutup' : 'Kembali'}
        onPress={onBack ?? onClose}
        hitSlop={10}
        style={{ width: 32, height: 32, alignItems: 'flex-start', justifyContent: 'center' }}
      >
        {onClose ? (
          <X size={22} color={color.textMuted} weight="regular" />
        ) : (
          <CaretLeft size={22} color={color.textMuted} weight="regular" />
        )}
      </Pressable>
      {title ? (
        <Text style={[type.screenTitle, { flex: 1, textAlign: 'center' }]} numberOfLines={1}>
          {title}
        </Text>
      ) : (
        <View style={{ flex: 1 }} />
      )}
      <View style={{ minWidth: 32, alignItems: 'flex-end' }}>{trailing}</View>
    </View>
  );
}

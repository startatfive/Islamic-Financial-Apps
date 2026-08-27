import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Backspace } from 'phosphor-react-native';
import { color } from '../theme/tokens';
import { fontFamily } from '../theme/typography';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '000', '0', 'del'];

export default function Keypad({ onKey }: { onKey: (key: string) => void }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
      {KEYS.map((key) => (
        <Pressable
          key={key}
          onPress={() => onKey(key)}
          style={({ pressed }) => ({
            width: '30%',
            height: 50,
            borderRadius: 9,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: pressed ? color.surfaceHover : 'transparent',
          })}
        >
          {key === 'del' ? (
            <Backspace size={20} color={color.textDim} weight="regular" />
          ) : (
            <Text style={{ fontFamily: fontFamily.regular, fontSize: 22, color: color.text }}>{key}</Text>
          )}
        </Pressable>
      ))}
    </View>
  );
}

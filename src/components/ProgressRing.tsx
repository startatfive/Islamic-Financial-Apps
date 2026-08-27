import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { color } from '../theme/tokens';
import { fontFamily } from '../theme/typography';

/**
 * Home ring: size 118, r=51, circumference 320.4
 * Goal detail ring: size 104, r=45, circumference 282.7
 */
export default function ProgressRing({
  size = 118,
  radiusPx = 51,
  circumference = 320.4,
  progress,
  strokeColor = color.accent,
  center,
  caption,
}: {
  size?: number;
  radiusPx?: number;
  circumference?: number;
  /** 0..1, or null for the empty/no-data thin state. */
  progress: number | null;
  strokeColor?: string;
  center?: React.ReactNode;
  caption?: string;
}) {
  const offset = progress == null ? circumference : circumference * (1 - progress);
  const cx = size / 2;
  const cy = size / 2;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle cx={cx} cy={cy} r={radiusPx} stroke={color.border} strokeWidth={7} fill="none" />
        {progress != null && (
          <Circle
            cx={cx}
            cy={cy}
            r={radiusPx}
            stroke={strokeColor}
            strokeWidth={7}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            rotation={-90}
            origin={`${cx}, ${cy}`}
          />
        )}
      </Svg>
      <View style={{ alignItems: 'center' }}>
        {center ?? (
          <Text style={{ fontFamily: fontFamily.medium, fontSize: 28, color: color.text }}>
            {progress == null ? '—' : `${Math.round(progress * 100)}%`}
          </Text>
        )}
        {caption ? (
          <Text
            style={{
              fontFamily: fontFamily.regular,
              fontSize: 10,
              letterSpacing: 0.8,
              color: color.textFaint,
              textTransform: 'uppercase',
              marginTop: 2,
            }}
          >
            {caption}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

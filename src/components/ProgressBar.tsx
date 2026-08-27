import React from 'react';
import { View } from 'react-native';
import { color, radius } from '../theme/tokens';

export default function ProgressBar({
  progress,
  height = 5,
  fillColor = color.accent,
  /** 0..1 position of a threshold tick, e.g. the DES screening-ratio limit. */
  thresholdAt,
}: {
  progress: number;
  height?: number;
  fillColor?: string;
  thresholdAt?: number;
}) {
  const pct = Math.max(0, Math.min(1, progress));
  return (
    <View
      style={{
        height,
        borderRadius: height / 2,
        backgroundColor: color.border,
        overflow: 'visible',
        width: '100%',
      }}
    >
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: `${pct * 100}%`,
          borderRadius: height / 2,
          backgroundColor: fillColor,
        }}
      />
      {thresholdAt != null && (
        <View
          style={{
            position: 'absolute',
            left: `${Math.max(0, Math.min(1, thresholdAt)) * 100}%`,
            top: -2,
            bottom: -2,
            width: 1,
            backgroundColor: '#9397ab',
          }}
        />
      )}
    </View>
  );
}

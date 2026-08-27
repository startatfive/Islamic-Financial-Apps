import React from 'react';
import { View, Text } from 'react-native';
import { color, radius } from '../theme/tokens';
import { fontFamily } from '../theme/typography';

/** 30-34px surface-fill tile holding either 1-2 letter initials or an icon element. */
export default function IconTile({
  initials,
  icon,
  size = 32,
}: {
  initials?: string;
  icon?: React.ReactNode;
  size?: number;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius.iconTile,
        backgroundColor: color.surface,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon ??
        (initials ? (
          <Text style={{ fontFamily: fontFamily.medium, fontSize: size >= 32 ? 12 : 10, color: color.iconTileText }}>
            {initials}
          </Text>
        ) : null)}
    </View>
  );
}

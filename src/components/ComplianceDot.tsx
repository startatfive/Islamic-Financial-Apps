import React from 'react';
import { View } from 'react-native';
import { complianceColor } from '../theme/tokens';
import type { ComplianceFlag } from '../domain/types';

export default function ComplianceDot({ flag, size = 7 }: { flag: ComplianceFlag; size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: complianceColor[flag],
      }}
    />
  );
}

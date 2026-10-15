import React from 'react';
import { Text, View } from 'react-native';

type BadgeTone = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
}

const toneStyles: Record<BadgeTone, string> = {
  primary: 'bg-primaryFixed',
  info: 'bg-secondaryFixed',
  success: 'bg-tertiaryFixed',
  warning: 'bg-[#f5e6c8]',
  danger: 'bg-errorContainer',
  neutral: 'bg-surfaceContainer',
};

const textToneStyles: Record<BadgeTone, string> = {
  primary: 'text-onPrimaryFixed',
  info: 'text-onSecondaryFixed',
  success: 'text-onTertiaryFixed',
  warning: 'text-[#7a5a1e]',
  danger: 'text-onErrorContainer',
  neutral: 'text-onSurfaceVariant',
};

/** Pill-shaped tag — statuses, categories, data-source indicators. */
export function Badge({ label, tone = 'neutral' }: BadgeProps) {
  return (
    <View className={`self-start rounded-full px-3 py-1 ${toneStyles[tone]}`}>
      <Text className={`text-xs font-semibold ${textToneStyles[tone]}`}>{label}</Text>
    </View>
  );
}

export default Badge;

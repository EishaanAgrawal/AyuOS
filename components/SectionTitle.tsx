import React from 'react';
import { Text, View } from 'react-native';

interface SectionTitleProps {
  title: string;
  action?: React.ReactNode;
}

/** Section heading row used to separate content blocks. */
export function SectionTitle({ title, action }: SectionTitleProps) {
  return (
    <View className="mb-3 mt-6 flex-row items-center justify-between px-5">
      <Text className="text-lg font-semibold text-onSurface">{title}</Text>
      {action}
    </View>
  );
}

export default SectionTitle;

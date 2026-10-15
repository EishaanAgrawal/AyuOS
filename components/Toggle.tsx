import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  testID?: string;
}

/** High-clarity toggle switch (used for family visibility settings etc.). */
export function Toggle({ value, onChange, label, description, disabled = false, testID }: ToggleProps) {
  return (
    <Pressable
      testID={testID}
      onPress={() => onChange(!value)}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      className="flex-row items-center justify-between py-3"
    >
      <View className="mr-4 flex-1">
        {label ? <Text className="text-base text-onSurface">{label}</Text> : null}
        {description ? (
          <Text className="mt-0.5 text-sm text-onSurfaceVariant">{description}</Text>
        ) : null}
      </View>
      <View
        className={`h-8 w-[52px] items-start justify-center rounded-full px-1 ${
          value ? 'bg-primary' : 'bg-outlineVariant'
        } ${disabled ? 'opacity-50' : ''}`}
      >
        <View
          className={`h-6 w-6 rounded-full bg-surfaceContainerLowest ${value ? 'self-end' : 'self-start'}`}
        />
      </View>
    </Pressable>
  );
}

export default Toggle;

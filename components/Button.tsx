import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  testID?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary active:bg-primaryContainer',
  secondary: 'bg-surfaceContainerLowest border border-outlineVariant active:bg-surfaceContainerLow',
  ghost: 'bg-transparent active:bg-surfaceContainer',
  danger: 'bg-error active:opacity-90',
};

const textStyles: Record<ButtonVariant, string> = {
  primary: 'text-onPrimary',
  secondary: 'text-onSurface',
  ghost: 'text-primary',
  danger: 'text-onError',
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
  testID,
}: ButtonProps) {
  const busy = disabled || loading;
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={busy}
      accessibilityRole="button"
      accessibilityState={{ disabled: busy, busy: loading }}
      className={`h-12 items-center justify-center rounded-lg px-6 ${variantStyles[variant]} ${
        busy ? 'opacity-50' : ''
      } ${className}`}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'danger' ? '#ffffff' : '#004345'}
        />
      ) : (
        <Text className={`text-base font-semibold ${textStyles[variant]}`}>{title}</Text>
      )}
    </Pressable>
  );
}

export default Button;

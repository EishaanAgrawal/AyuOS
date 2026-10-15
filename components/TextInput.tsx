import React, { useState } from 'react';
import {
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  hint?: string;
}

/**
 * Standard AyuOS text input: white surface, 1px outline, 44px min-height,
 * 16px lateral padding. Focus ring is teal per DESIGN.md.
 */
export function TextInput({ label, error, hint, className = '', ...props }: TextInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View className="mb-4">
      {label ? (
        <Text className="mb-1.5 text-sm font-medium text-onSurface">{label}</Text>
      ) : null}
      <RNTextInput
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        placeholderTextColor="#6f7979"
        className={`min-h-[44px] rounded-lg border bg-surfaceContainerLowest px-4 py-3 text-base text-onSurface ${
          error ? 'border-error' : focused ? 'border-primary' : 'border-outlineVariant'
        } ${className}`}
      />
      {error ? (
        <Text className="mt-1.5 text-xs text-error">{error}</Text>
      ) : hint ? (
        <Text className="mt-1.5 text-xs text-onSurfaceVariant">{hint}</Text>
      ) : null}
    </View>
  );
}

export default TextInput;

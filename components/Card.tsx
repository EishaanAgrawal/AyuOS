import React from 'react';
import { Pressable, View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  testID?: string;
}

/**
 * Level-1 surface card: white with a hairline border, 16px radius —
 * the standard container for health content per DESIGN.md.
 */
export function Card({ children, className = '', onPress, testID }: CardProps) {
  const classes = `rounded-2xl border border-outlineVariant bg-surfaceContainerLowest p-6 ${className}`;
  if (onPress) {
    return (
      <Pressable testID={testID} onPress={onPress} accessibilityRole="button" className={classes}>
        {children}
      </Pressable>
    );
  }
  return (
    <View testID={testID} className={classes}>
      {children}
    </View>
  );
}

export default Card;

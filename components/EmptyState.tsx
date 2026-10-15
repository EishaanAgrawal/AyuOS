import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionTitle?: string;
  onAction?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

/** Friendly "nothing here yet" placeholder. Default copy is the "None added" variant. */
export function EmptyState({
  title = 'None added',
  message = 'Nothing has been added here yet.',
  actionTitle,
  onAction,
  icon = 'folder-open-outline',
}: EmptyStateProps) {
  return (
    <View className="items-center justify-center px-8 py-12">
      <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-surfaceContainer">
        <Ionicons name={icon} size={30} color="#6f7979" />
      </View>
      <Text className="mb-1 text-lg font-semibold text-onSurface">{title}</Text>
      <Text className="mb-5 text-center text-sm text-onSurfaceVariant">{message}</Text>
      {actionTitle && onAction ? (
        <Button title={actionTitle} onPress={onAction} variant="secondary" />
      ) : null}
    </View>
  );
}

export default EmptyState;

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  right?: React.ReactNode;
}

/** Standard screen header: back chevron + title (+ optional subtitle). */
export function PageHeader({ title, subtitle, showBack = true, right }: PageHeaderProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center px-5 pb-4 pt-2">
      {showBack && (
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={12}
          className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-surfaceContainerLow"
        >
          <Ionicons name="chevron-back" size={22} color="#181c1c" />
        </Pressable>
      )}
      <View className="flex-1">
        <Text className="text-2xl font-semibold text-onSurface" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-0.5 text-sm text-onSurfaceVariant" numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right ? <View className="ml-3">{right}</View> : null}
    </View>
  );
}

export default PageHeader;

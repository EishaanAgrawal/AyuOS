import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from './Button';
import { PageHeader } from './PageHeader';

/**
 * Placeholder for routes the screen builders haven't filled in yet.
 * Always shows a real back button, the screen title, and an honest
 * "Demo preview" note — never fake functionality.
 */
export function StubScreen({ title, note }: { title: string; note?: string }) {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader title={title} />
      <ScrollView contentContainerClassName="flex-1 justify-center px-8">
        <View className="items-center">
          <Text className="mb-2 text-center text-lg font-semibold text-onSurface">
            {title}
          </Text>
          <Text className="mb-1 text-center text-sm font-semibold uppercase tracking-widest text-secondary">
            Demo preview
          </Text>
          <Text className="mb-6 text-center text-sm leading-6 text-onSurfaceVariant">
            {note ??
              'This screen is part of the AyuOS demo preview. The full experience will be built here next — using fictional demo data only.'}
          </Text>
          <Button title="Go back" variant="secondary" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default StubScreen;

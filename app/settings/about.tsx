import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { SectionTitle } from '../../components/SectionTitle';

const LEGAL = [
  { title: 'Terms of Service', icon: 'document-text-outline' },
  { title: 'Privacy Policy', icon: 'shield-checkmark-outline' },
  { title: 'Open Source Licenses', icon: 'code-slash-outline' },
] as const;

export default function AboutAyuOSScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader title="About AyuOS" />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <Card className="mb-2">
          <View className="items-center py-4">
            <View className="mb-3 h-20 w-20 items-center justify-center rounded-3xl bg-primary">
              <Ionicons name="heart" size={40} color="#ffffff" />
            </View>
            <Text className="text-2xl font-bold text-onSurface">AyuOS</Text>
            <Text className="mt-1 text-sm text-onSurfaceVariant">
              Your health, organised.
            </Text>
            <View className="mt-3 rounded-full bg-surfaceContainer px-4 py-1.5">
              <Text className="text-sm font-semibold text-onSurfaceVariant">Version 1.0.0</Text>
            </View>
          </View>
        </Card>

        <SectionTitle title="Legal" />
        <View className="overflow-hidden rounded-2xl border border-outlineVariant bg-surfaceContainerLowest">
          {LEGAL.map((item, index) => (
            <Pressable
              key={item.title}
              accessibilityRole="button"
              className={`flex-row items-center px-5 py-4 ${
                index < LEGAL.length - 1 ? 'border-b border-outlineVariant/60' : ''
              }`}
            >
              <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-surfaceContainer">
                <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={20} color="#004345" />
              </View>
              <Text className="flex-1 text-base text-onSurface">{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#6f7979" />
            </Pressable>
          ))}
        </View>

        <Text className="mt-6 text-center text-xs text-onSurfaceVariant">
          AyuOS is a demo build. All data shown is fictional.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

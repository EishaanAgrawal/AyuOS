import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';

const SIZES = [
  { id: 'S', label: 'Small', body: 'text-sm', title: 'text-base' },
  { id: 'M', label: 'Medium', body: 'text-base', title: 'text-lg' },
  { id: 'L', label: 'Large', body: 'text-lg', title: 'text-xl' },
  { id: 'XL', label: 'Extra Large', body: 'text-xl', title: 'text-2xl' },
] as const;

type SizeId = (typeof SIZES)[number]['id'];

export default function TextSizeScreen() {
  const [size, setSize] = useState<SizeId>('M');
  const active = SIZES.find((s) => s.id === size)!;

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader title="Text Size" subtitle="Choose a comfortable reading size." />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <Card className="mb-5">
          {SIZES.map((option, index) => {
            const selected = option.id === size;
            return (
              <Pressable
                key={option.id}
                onPress={() => setSize(option.id)}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                className={`flex-row items-center py-4 ${
                  index < SIZES.length - 1 ? 'border-b border-outlineVariant/60' : ''
                }`}
              >
                <View
                  className={`mr-4 h-6 w-6 items-center justify-center rounded-full border-2 ${
                    selected ? 'border-primary' : 'border-outlineVariant'
                  }`}
                >
                  {selected && <View className="h-3 w-3 rounded-full bg-primary" />}
                </View>
                <View className="flex-1">
                  <Text className={`${option.title} font-semibold text-onSurface`}>
                    {option.label}
                  </Text>
                  <Text className={`${option.body} text-onSurfaceVariant`}>
                    Sample body text at this size
                  </Text>
                </View>
                <Text className="text-2xl font-bold text-onSurfaceVariant">{option.id}</Text>
              </Pressable>
            );
          })}
        </Card>

        <Text className="mb-3 px-1 text-lg font-semibold text-onSurface">Live preview</Text>
        <Card>
          <View className="flex-row items-center">
            <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-primaryFixed/40">
              <Ionicons name="document-text-outline" size={24} color="#004345" />
            </View>
            <View className="flex-1">
              <Text className={`${active.title} font-semibold text-onSurface`}>
                Lab report ready
              </Text>
              <Text className={`${active.body} text-onSurfaceVariant`}>
                Your HbA1c report from City Diagnostics is ready to view. This is a fictional
                demo preview.
              </Text>
            </View>
          </View>
        </Card>

        <Text className="mt-4 text-center text-xs text-onSurfaceVariant">
          Preview only — applying text size app-wide needs the preferences backend.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

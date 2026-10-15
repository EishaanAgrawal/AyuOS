import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { SectionTitle } from '../../components/SectionTitle';

const LANGUAGES = [
  { id: 'en', label: 'English', native: 'English' },
  { id: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { id: 'mr', label: 'Marathi', native: 'मराठी' },
  { id: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { id: 'te', label: 'Telugu', native: 'తెలుగు' },
  { id: 'bn', label: 'Bengali', native: 'বাংলা' },
] as const;

const REGIONS = [
  { id: 'in', label: 'India', detail: 'INR · DD/MM/YYYY' },
  { id: 'us', label: 'United States', detail: 'USD · MM/DD/YYYY' },
  { id: 'uk', label: 'United Kingdom', detail: 'GBP · DD/MM/YYYY' },
] as const;

export default function LanguageRegionScreen() {
  const [language, setLanguage] = useState<string>('en');
  const [region, setRegion] = useState<string>('in');

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader title="Language & Region" />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <SectionTitle title="App language" />
        <Card>
          {LANGUAGES.map((option, index) => {
            const selected = language === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => setLanguage(option.id)}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                className={`flex-row items-center py-4 ${
                  index < LANGUAGES.length - 1 ? 'border-b border-outlineVariant/60' : ''
                }`}
              >
                <View className="flex-1">
                  <Text className="text-base text-onSurface">{option.label}</Text>
                  <Text className="mt-0.5 text-sm text-onSurfaceVariant">{option.native}</Text>
                </View>
                <View
                  className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
                    selected ? 'border-primary' : 'border-outlineVariant'
                  }`}
                >
                  {selected && <View className="h-3 w-3 rounded-full bg-primary" />}
                </View>
              </Pressable>
            );
          })}
        </Card>

        <SectionTitle title="Region" />
        <Card>
          {REGIONS.map((option, index) => {
            const selected = region === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => setRegion(option.id)}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                className={`flex-row items-center py-4 ${
                  index < REGIONS.length - 1 ? 'border-b border-outlineVariant/60' : ''
                }`}
              >
                <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-surfaceContainer">
                  <Ionicons name="globe-outline" size={20} color="#004345" />
                </View>
                <View className="flex-1">
                  <Text className="text-base text-onSurface">{option.label}</Text>
                  <Text className="mt-0.5 text-sm text-onSurfaceVariant">{option.detail}</Text>
                </View>
                <View
                  className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
                    selected ? 'border-primary' : 'border-outlineVariant'
                  }`}
                >
                  {selected && <View className="h-3 w-3 rounded-full bg-primary" />}
                </View>
              </Pressable>
            );
          })}
        </Card>

        <Text className="mt-4 text-center text-xs text-onSurfaceVariant">
          Selection is local for now — a restart applies language app-wide (demo).
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

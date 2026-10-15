import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { SectionTitle } from '../../components/SectionTitle';
import { Toggle } from '../../components/Toggle';

const THEMES = [
  { id: 'system', label: 'System default', icon: 'phone-portrait-outline' },
  { id: 'light', label: 'Light', icon: 'sunny-outline' },
  { id: 'dark', label: 'Dark', icon: 'moon-outline' },
] as const;

const ACCENTS = [
  { id: 'teal', label: 'Ocean Teal', color: '#004345' },
  { id: 'blue', label: 'Deep Blue', color: '#226584' },
  { id: 'green', label: 'Forest', color: '#2e5d3a' },
] as const;

type ThemeId = (typeof THEMES)[number]['id'];
type AccentId = (typeof ACCENTS)[number]['id'];

function RadioRow<T extends string>({
  label,
  icon,
  iconColor,
  selected,
  onPress,
  last,
}: {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  selected: boolean;
  onPress: () => void;
  last: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      className={`flex-row items-center py-4 ${last ? '' : 'border-b border-outlineVariant/60'}`}
    >
      {icon ? (
        <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-surfaceContainer">
          {iconColor ? (
            <View style={{ backgroundColor: iconColor }} className="h-6 w-6 rounded-full" />
          ) : (
            <Ionicons name={icon} size={20} color="#004345" />
          )}
        </View>
      ) : null}
      <Text className="flex-1 text-base text-onSurface">{label}</Text>
      <View
        className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
          selected ? 'border-primary' : 'border-outlineVariant'
        }`}
      >
        {selected && <View className="h-3 w-3 rounded-full bg-primary" />}
      </View>
    </Pressable>
  );
}

export default function AppearanceScreen() {
  const [theme, setTheme] = useState<ThemeId>('system');
  const [accent, setAccent] = useState<AccentId>('teal');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader title="Appearance" />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <SectionTitle title="Theme" />
        <Card>
          {THEMES.map((option, index) => (
            <RadioRow
              key={option.id}
              label={option.label}
              icon={option.icon as keyof typeof Ionicons.glyphMap}
              selected={theme === option.id}
              onPress={() => setTheme(option.id)}
              last={index === THEMES.length - 1}
            />
          ))}
        </Card>

        <SectionTitle title="Accent color" />
        <Card>
          {ACCENTS.map((option, index) => (
            <RadioRow
              key={option.id}
              label={option.label}
              iconColor={option.color}
              selected={accent === option.id}
              onPress={() => setAccent(option.id)}
              last={index === ACCENTS.length - 1}
            />
          ))}
        </Card>

        <SectionTitle title="Motion & clarity" />
        <Card>
          <Toggle
            value={reduceMotion}
            onChange={setReduceMotion}
            label="Reduce motion"
            description="Minimises animations and transitions."
          />
          <View className="border-t border-outlineVariant/60">
            <Toggle
              value={highContrast}
              onChange={setHighContrast}
              label="High contrast"
              description="Increases text and element contrast."
            />
          </View>
        </Card>

        <Text className="mt-4 text-center text-xs text-onSurfaceVariant">
          Preview only — applying appearance app-wide needs the preferences backend.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

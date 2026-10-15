import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { SectionTitle } from '../components/SectionTitle';
import { demoUser } from '../lib/demo-data';

type IconName = keyof typeof Ionicons.glyphMap;

interface SettingRow {
  title: string;
  subtitle?: string;
  icon: IconName;
  route: string;
}

const ACCOUNT: SettingRow[] = [
  { title: 'Personal Information', subtitle: 'Name, DOB, contact details', icon: 'person-outline', route: '/settings/personal-information' },
  { title: 'Password & Security', subtitle: 'Password, 2FA, devices', icon: 'lock-closed-outline', route: '/settings/password-security' },
];

const PREFERENCES: SettingRow[] = [
  { title: 'Senior Mode', subtitle: 'Larger text and simpler layout', icon: 'accessibility-outline', route: '/settings/senior-mode' },
  { title: 'Text Size', subtitle: 'Adjust reading size', icon: 'text-outline', route: '/settings/text-size' },
  { title: 'Appearance', subtitle: 'Theme, accent and motion', icon: 'color-palette-outline', route: '/settings/appearance' },
  { title: 'Language & Region', subtitle: 'App language and region', icon: 'globe-outline', route: '/settings/language-region' },
  { title: 'Notifications', subtitle: 'Channels, categories, quiet hours', icon: 'notifications-outline', route: '/settings/notifications' },
];

const SUPPORT: SettingRow[] = [
  { title: 'About AyuOS', subtitle: 'Version and legal', icon: 'information-circle-outline', route: '/settings/about' },
  { title: 'Help & Support', subtitle: 'FAQs and contact', icon: 'help-circle-outline', route: '/settings/help-support' },
];

function SettingRowItem({ row, last }: { row: SettingRow; last: boolean }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(row.route as never)}
      accessibilityRole="button"
      accessibilityLabel={row.title}
      className={`flex-row items-center px-5 py-4 ${last ? '' : 'border-b border-outlineVariant/60'}`}
    >
      <View className="mr-4 h-11 w-11 items-center justify-center rounded-full bg-surfaceContainer">
        <Ionicons name={row.icon} size={22} color="#004345" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-onSurface">{row.title}</Text>
        {row.subtitle ? (
          <Text className="mt-0.5 text-sm text-onSurfaceVariant">{row.subtitle}</Text>
        ) : null}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#6f7979" />
    </Pressable>
  );
}

function SettingsGroup({ rows }: { rows: SettingRow[] }) {
  return (
    <View className="overflow-hidden rounded-2xl border border-outlineVariant bg-surfaceContainerLowest">
      {rows.map((row, index) => (
        <SettingRowItem key={row.route} row={row} last={index === rows.length - 1} />
      ))}
    </View>
  );
}

export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader title="Profile & Settings" subtitle="Account, security, preferences and accessibility." />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <Card className="mb-2">
          <View className="flex-row items-center">
            <View className="mr-4 h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Text className="text-xl font-bold text-onPrimary">{demoUser.avatarInitials}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-semibold text-onSurface">{demoUser.name}</Text>
              <Text className="mt-0.5 text-sm text-onSurfaceVariant">
                Blood group {demoUser.bloodType}
              </Text>
            </View>
          </View>
        </Card>

        <SectionTitle title="Account" />
        <SettingsGroup rows={ACCOUNT} />

        <SectionTitle title="Preferences" />
        <SettingsGroup rows={PREFERENCES} />

        <SectionTitle title="Support" />
        <SettingsGroup rows={SUPPORT} />

        <Text className="mt-6 text-center text-xs text-onSurfaceVariant">
          Fictional demo profile — backend not connected.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

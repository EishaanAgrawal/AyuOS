import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PageHeader } from '../../components/PageHeader';

type IconName = keyof typeof Ionicons.glyphMap;

const MENU: { title: string; subtitle: string; icon: IconName; route: string }[] = [
  { title: 'Family Care', subtitle: 'Manage profiles for loved ones', icon: 'people-outline', route: '/family-care' },
  { title: 'Finance', subtitle: 'Bills, insurance & claims', icon: 'wallet-outline', route: '/finance' },
  { title: 'Emergency', subtitle: 'Quick card & contacts', icon: 'alert-circle-outline', route: '/emergency' },
  { title: 'Notifications', subtitle: 'Reminders & alerts', icon: 'notifications-outline', route: '/notifications' },
  { title: 'Privacy & Permissions', subtitle: 'Who can see your health data', icon: 'shield-checkmark-outline', route: '/privacy-permissions' },
  { title: 'Settings', subtitle: 'Account, appearance & more', icon: 'settings-outline', route: '/settings' },
  { title: 'Sign in', subtitle: 'Backend not connected yet', icon: 'log-in-outline', route: '/login' },
];

export default function MoreScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader title="More" showBack={false} />
      <ScrollView contentContainerClassName="px-5 pb-8">
        <View className="overflow-hidden rounded-2xl border border-outlineVariant bg-surfaceContainerLowest">
          {MENU.map((item, index) => (
            <Pressable
              key={item.title}
              onPress={() => router.push(item.route)}
              className={`flex-row items-center px-4 py-4 ${
                index < MENU.length - 1 ? 'border-b border-outlineVariant' : ''
              }`}
            >
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-surfaceContainer">
                <Ionicons name={item.icon} size={20} color="#004345" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-onSurface">{item.title}</Text>
                <Text className="text-sm text-onSurfaceVariant">{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#6f7979" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

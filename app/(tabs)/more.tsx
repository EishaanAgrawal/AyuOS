import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { demoUser } from '../../lib/demo-data';

type IconName = keyof typeof Ionicons.glyphMap;

interface MenuItem {
  title: string;
  subtitle: string;
  icon: IconName;
  route: string;
  destructive?: boolean;
}

const MENU: MenuItem[] = [
  {
    title: 'Family Care',
    subtitle: 'Manage health information for people you care for.',
    icon: 'people-outline',
    route: '/family-care',
  },
  {
    title: 'Healthcare Finance',
    subtitle: 'Medical expenses, bills, treatment costs and insurance.',
    icon: 'card-outline',
    route: '/finance',
  },
  {
    title: 'Emergency',
    subtitle: 'Manage your emergency health information.',
    icon: 'medical-outline',
    route: '/emergency',
  },
  {
    title: 'Notifications',
    subtitle: 'Manage alerts and reminders.',
    icon: 'notifications-outline',
    route: '/notifications',
  },
  {
    title: 'Privacy & Permissions',
    subtitle: 'Control access to your health information.',
    icon: 'shield-checkmark-outline',
    route: '/privacy-permissions',
  },
  {
    title: 'Profile & Settings',
    subtitle: 'Account, security, preferences and accessibility.',
    icon: 'settings-outline',
    route: '/settings',
  },
  {
    title: 'Delete My Account',
    subtitle: 'Permanently delete your account and all data.',
    icon: 'trash-outline',
    route: '/settings/delete-account',
    destructive: true,
  },
];

export default function MoreScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <View className="flex-row items-center px-5 pb-2 pt-2">
        <View className="mr-4 h-14 w-14 items-center justify-center rounded-full bg-primary">
          <Text className="text-lg font-bold text-onPrimary">{demoUser.avatarInitials}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-2xl font-semibold text-onSurface">More</Text>
          <View className="mt-0.5 flex-row items-center self-start rounded-full bg-primaryFixed px-3 py-0.5">
            <Text className="text-xs font-semibold text-onPrimaryFixedVariant">
              {demoUser.name} · My Health
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerClassName="px-5 pb-10 pt-3">
        {MENU.map((item) => (
          <Pressable
            key={item.route}
            onPress={() => router.push(item.route as never)}
            accessibilityRole="button"
            accessibilityLabel={item.title}
            className={`mb-3 flex-row items-center rounded-2xl border bg-surfaceContainerLowest p-4 ${
              item.destructive ? 'border-error/30' : 'border-outlineVariant'
            }`}
          >
            <View
              className={`mr-4 h-14 w-14 items-center justify-center rounded-full ${
                item.destructive ? 'bg-errorContainer' : 'bg-primaryFixed/40'
              }`}
            >
              <Ionicons
                name={item.icon}
                size={26}
                color={item.destructive ? '#ba1a1a' : '#004345'}
              />
            </View>
            <View className="flex-1">
              <Text
                className={`text-lg font-semibold ${
                  item.destructive ? 'text-error' : 'text-onSurface'
                }`}
              >
                {item.title}
              </Text>
              <Text className="mt-0.5 text-sm text-onSurfaceVariant" numberOfLines={2}>
                {item.subtitle}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={22}
              color={item.destructive ? '#ba1a1a' : '#6f7979'}
            />
          </Pressable>
        ))}

        <View className="mt-2 items-center">
          <Text className="text-xs text-onSurfaceVariant">
            AyuOS v1.0.0 · Fictional demo data
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

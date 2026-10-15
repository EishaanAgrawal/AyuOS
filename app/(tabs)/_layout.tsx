import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

type IconName = keyof typeof Ionicons.glyphMap;

const TABS: { name: string; title: string; icon: IconName; activeIcon: IconName }[] = [
  { name: 'home', title: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { name: 'records', title: 'Records', icon: 'document-text-outline', activeIcon: 'document-text' },
  { name: 'medicines', title: 'Medicines', icon: 'medkit-outline', activeIcon: 'medkit' },
  { name: 'care', title: 'Care', icon: 'heart-outline', activeIcon: 'heart' },
  { name: 'more', title: 'More', icon: 'ellipsis-horizontal', activeIcon: 'ellipsis-horizontal-circle' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#004345',
        tabBarInactiveTintColor: '#6f7979',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#bfc8c8',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? tab.activeIcon : tab.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

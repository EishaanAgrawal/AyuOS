import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../components/Badge';
import { PageHeader } from '../components/PageHeader';

type IconName = keyof typeof Ionicons.glyphMap;

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  icon: IconName;
  tone: 'danger' | 'warning' | 'info' | 'success';
}

const toneColor: Record<NotificationItem['tone'], string> = {
  danger: '#ba1a1a',
  warning: '#7a5a1e',
  info: '#1b607f',
  success: '#1d6b4f',
};

/** Fictional demo notifications. */
const NEEDS_ATTENTION: NotificationItem[] = [
  {
    id: 'na-1',
    title: 'Medicine refill due',
    body: "Mummy's Metformin refill is due tomorrow.",
    time: '2h ago',
    icon: 'medkit-outline',
    tone: 'danger',
  },
  {
    id: 'na-2',
    title: 'Lab report ready',
    body: "Mummy's HbA1c report from City Diagnostics is ready to view.",
    time: '5h ago',
    icon: 'flask-outline',
    tone: 'warning',
  },
];

const REMINDERS: NotificationItem[] = [
  {
    id: 're-1',
    title: 'Evening dose at 9:30 PM',
    body: 'Metformin 500mg — after dinner.',
    time: 'Today',
    icon: 'alarm-outline',
    tone: 'info',
  },
  {
    id: 're-2',
    title: 'Cardiology appointment',
    body: 'Dr. Rao on Sat, 17 Oct 2026 at 10:30 AM.',
    time: 'Tomorrow',
    icon: 'calendar-outline',
    tone: 'info',
  },
];

const RECENT: NotificationItem[] = [
  {
    id: 'rc-1',
    title: 'BP logged',
    body: '120/78 mmHg recorded this morning.',
    time: 'Yesterday',
    icon: 'heart-outline',
    tone: 'success',
  },
  {
    id: 'rc-2',
    title: 'Prescription added',
    body: 'Daddy added a new prescription to your shared record.',
    time: '2 days ago',
    icon: 'document-text-outline',
    tone: 'info',
  },
];

function NotificationRow({
  item,
  read,
  onToggleRead,
}: {
  item: NotificationItem;
  read: boolean;
  onToggleRead: () => void;
}) {
  return (
    <Pressable
      onPress={onToggleRead}
      accessibilityRole="button"
      accessibilityLabel={`${item.title}. ${read ? 'Read' : 'Unread'}. Tap to mark ${read ? 'unread' : 'read'}.`}
      className={`flex-row items-start rounded-2xl border p-4 ${
        read ? 'border-outlineVariant/60 bg-surfaceContainerLowest' : 'border-primary/30 bg-primaryFixed/10'
      }`}
    >
      <View
        className="mr-3 h-11 w-11 items-center justify-center rounded-full"
        style={{ backgroundColor: `${toneColor[item.tone]}14` }}
      >
        <Ionicons name={item.icon} size={22} color={toneColor[item.tone]} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className={`flex-1 text-base ${read ? 'font-medium text-onSurfaceVariant' : 'font-semibold text-onSurface'}`}>
            {item.title}
          </Text>
          {!read && <View className="ml-2 h-2.5 w-2.5 rounded-full bg-primary" />}
        </View>
        <Text className="mt-0.5 text-sm text-onSurfaceVariant" numberOfLines={2}>
          {item.body}
        </Text>
        <Text className="mt-1.5 text-xs text-onSurfaceVariant">{item.time}</Text>
      </View>
    </Pressable>
  );
}

function Section({ title, items, readMap, onToggle }: {
  title: string;
  items: NotificationItem[];
  readMap: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const unread = items.filter((i) => !readMap[i.id]).length;
  return (
    <View className="mb-6">
      <View className="mb-3 flex-row items-center justify-between px-1">
        <Text className="text-lg font-semibold text-onSurface">{title}</Text>
        {unread > 0 ? <Badge label={`${unread} new`} tone="primary" /> : null}
      </View>
      <View className="gap-3">
        {items.map((item) => (
          <NotificationRow
            key={item.id}
            item={item}
            read={!!readMap[item.id]}
            onToggleRead={() => onToggle(item.id)}
          />
        ))}
      </View>
    </View>
  );
}

export default function NotificationsScreen() {
  const [readMap, setReadMap] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setReadMap((prev) => ({ ...prev, [id]: !prev[id] }));

  const markAllRead = () =>
    setReadMap(Object.fromEntries([...NEEDS_ATTENTION, ...REMINDERS, ...RECENT].map((i) => [i.id, true])));

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader
        title="Notifications"
        subtitle="Alerts and reminders for you and your family."
        right={
          <Pressable
            onPress={markAllRead}
            accessibilityRole="button"
            accessibilityLabel="Mark all as read"
            className="rounded-full bg-surfaceContainer px-4 py-2.5"
          >
            <Text className="text-sm font-semibold text-primary">Mark all read</Text>
          </Pressable>
        }
      />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <Section title="Needs Attention" items={NEEDS_ATTENTION} readMap={readMap} onToggle={toggle} />
        <Section title="Reminders" items={REMINDERS} readMap={readMap} onToggle={toggle} />
        <Section title="Recent" items={RECENT} readMap={readMap} onToggle={toggle} />

        <Text className="mt-2 text-center text-xs text-onSurfaceVariant">
          Notifications shown are fictional demo data.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

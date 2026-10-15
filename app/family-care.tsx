import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { Tabs } from '../components/Tabs';

type IconName = keyof typeof Ionicons.glyphMap;

/** Fictional demo people — not real individuals. */
const PEOPLE = [
  {
    id: 'mummy',
    name: 'Mummy',
    relation: 'Mother',
    initials: 'M',
    access: 'Full Access' as const,
    attention: '1 medicine refill needed',
    attentionTone: 'danger' as const,
  },
  {
    id: 'daddy',
    name: 'Daddy',
    relation: 'Father',
    initials: 'D',
    access: 'Limited Access' as const,
    attention: 'No current attention',
    attentionTone: 'success' as const,
  },
];

const CARE_TASKS = [
  { id: 'task-1', title: 'Refill Metformin for Mummy', subtitle: 'Medicine refill', date: '10 Oct 2026' },
  { id: 'task-2', title: "Mummy's follow up on lab results", subtitle: 'HbA1c', date: '12 Oct 2026' },
  { id: 'task-3', title: 'Schedule checkup for Daddy', subtitle: 'General Physician', date: '25 Oct 2026' },
];

function Avatar({ initials, size = 56 }: { initials: string; size?: number }) {
  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2 }}
      className="items-center justify-center bg-primaryFixed/50"
    >
      <Text className="text-xl font-bold text-onPrimaryFixedVariant">{initials}</Text>
    </View>
  );
}

function PersonRow({ person, onPress }: { person: (typeof PEOPLE)[number]; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`View ${person.name}'s health`}
      className="mb-3 flex-row items-center rounded-2xl border border-outlineVariant bg-surfaceContainerLowest p-4"
    >
      <Avatar initials={person.initials} />
      <View className="ml-4 flex-1">
        <Text className="text-lg font-semibold text-onSurface">{person.name}</Text>
        <Text className="text-sm text-onSurfaceVariant">{person.relation}</Text>
        <View className="mt-1.5">
          <Badge
            label={person.access}
            tone={person.access === 'Full Access' ? 'primary' : 'info'}
          />
        </View>
        <View className="mt-1.5">
          <Badge label={person.attention} tone={person.attentionTone} />
        </View>
      </View>
      <View className="flex-row items-center rounded-full bg-surfaceContainer px-4 py-2">
        <Text className="mr-1 text-sm font-semibold text-primary">View health</Text>
        <Ionicons name="chevron-forward" size={18} color="#004345" />
      </View>
    </Pressable>
  );
}

function CareTasks() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  return (
    <Card>
      <View className="mb-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-tertiaryFixed/40">
            <Ionicons name="checkmark-circle" size={22} color="#004345" />
          </View>
          <Text className="text-lg font-semibold text-onSurface">Care Tasks</Text>
        </View>
        <Text className="text-sm font-semibold text-primary">View all</Text>
      </View>
      {CARE_TASKS.map((task, index) => {
        const completed = !!done[task.id];
        return (
          <Pressable
            key={task.id}
            onPress={() => setDone((prev) => ({ ...prev, [task.id]: !prev[task.id] }))}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: completed }}
            className={`flex-row items-center py-3.5 ${
              index < CARE_TASKS.length - 1 ? 'border-b border-outlineVariant/60' : ''
            }`}
          >
            <View
              className={`mr-4 h-7 w-7 items-center justify-center rounded-lg border-2 ${
                completed ? 'border-primary bg-primary' : 'border-outlineVariant bg-surfaceContainerLowest'
              }`}
            >
              {completed ? <Ionicons name="checkmark" size={16} color="#ffffff" /> : null}
            </View>
            <View className="flex-1">
              <Text
                className={`text-base font-medium ${
                  completed ? 'text-onSurfaceVariant line-through' : 'text-onSurface'
                }`}
              >
                {task.title}
              </Text>
              <Text className="mt-0.5 text-sm text-onSurfaceVariant">{task.subtitle}</Text>
            </View>
            <View className="rounded-full bg-surfaceContainer px-3 py-1.5">
              <Text className="text-xs font-medium text-onSurfaceVariant">{task.date}</Text>
            </View>
          </Pressable>
        );
      })}
    </Card>
  );
}

const TAB_IDS = ['overview', 'people', 'tasks'] as const;
type TabId = (typeof TAB_IDS)[number];

export default function FamilyCareScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<TabId>('overview');

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader
        title="Family Care"
        subtitle="Manage health information for people you care for."
        right={
          <Pressable
            onPress={() => {}}
            accessibilityRole="button"
            accessibilityLabel="Add family member"
            className="h-10 w-10 items-center justify-center rounded-full border border-outlineVariant bg-surfaceContainerLowest"
          >
            <Ionicons name="add" size={22} color="#181c1c" />
          </Pressable>
        }
      />

      <View className="px-5 pb-3">
        <Tabs
          options={[
            { key: 'overview', label: 'Overview' },
            { key: 'people', label: 'People' },
            { key: 'tasks', label: 'Tasks' },
          ]}
          value={tab}
          onChange={(key) => setTab(key as TabId)}
        />
      </View>

      <ScrollView contentContainerClassName="px-5 pb-10">
        {(tab === 'overview' || tab === 'people') && (
          <Card className="mb-5">
            <View className="mb-4 flex-row items-center">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-primaryFixed/40">
                <Ionicons name="people" size={22} color="#004345" />
              </View>
              <Text className="text-lg font-semibold text-onSurface">People I Care For</Text>
            </View>
            {PEOPLE.map((person) => (
              <PersonRow
                key={person.id}
                person={person}
                onPress={() => router.push(`/family-care/${person.id}` as never)}
              />
            ))}
          </Card>
        )}

        {(tab === 'overview' || tab === 'tasks') && <CareTasks />}

        <View className="mt-5">
          <Button
            title="Add Family Member"
            variant="secondary"
            onPress={() => {}}
          />
        </View>
        <Text className="mt-3 text-center text-xs text-onSurfaceVariant">
          All profiles shown are fictional demo data.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

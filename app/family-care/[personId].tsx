import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';

type IconName = keyof typeof Ionicons.glyphMap;

/** Fictional demo people — not real individuals. */
const PEOPLE: Record<string, { name: string; relation: string; initials: string; access: 'Full Access' | 'Limited Access' }> = {
  mummy: { name: 'Mummy', relation: 'Mother', initials: 'M', access: 'Full Access' },
  daddy: { name: 'Daddy', relation: 'Father', initials: 'D', access: 'Limited Access' },
};

interface HealthTile {
  title: string;
  subtitle: string;
  count?: string;
  icon: IconName;
}

const TILES: HealthTile[] = [
  { title: 'Lab Reports', subtitle: 'View and add lab reports.', count: '12 reports', icon: 'flask-outline' },
  { title: 'Prescriptions', subtitle: 'View and add prescriptions.', count: '8 prescriptions', icon: 'document-text-outline' },
  { title: 'Medicines', subtitle: 'View current and past medicines.', count: '6 medicines', icon: 'medkit-outline' },
  { title: 'Appointments', subtitle: 'View past and upcoming appointments.', count: '4 appointments', icon: 'calendar-outline' },
];

const ROWS: HealthTile[] = [
  { title: 'Medical History', subtitle: 'Past conditions, treatments and health summary.', icon: 'reader-outline' },
  { title: 'Scan Reports', subtitle: 'X-rays, MRI, CT scans and other imaging reports.', icon: 'image-outline' },
  { title: 'Doctor Notes', subtitle: 'Consultation notes from doctors.', icon: 'clipboard-outline' },
  { title: 'Health Trends', subtitle: 'Track key health parameters over time.', icon: 'stats-chart-outline' },
  { title: 'Medical Bills', subtitle: 'Bills and invoices related to treatment.', icon: 'receipt-outline' },
];

export default function FamilyMemberHealthScreen() {
  const router = useRouter();
  const { personId } = useLocalSearchParams<{ personId: string }>();
  const person = PEOPLE[personId] ?? { name: 'Family Member', relation: '', initials: '?', access: 'Limited Access' as const };
  const base = `/family-care/${personId}` as never;

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader
        title={`${person.name}'s Health Data`}
        subtitle={`View and manage ${person.name}'s health information.`}
      />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <Card className="mb-5">
          <View className="flex-row items-center">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-primaryFixed/50">
              <Text className="text-2xl font-bold text-onPrimaryFixedVariant">{person.initials}</Text>
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-xl font-semibold text-onSurface">{person.name}</Text>
              <View className="mt-1.5">
                <Badge
                  label={person.access}
                  tone={person.access === 'Full Access' ? 'primary' : 'info'}
                />
              </View>
              <Text className="mt-1.5 text-sm text-onSurfaceVariant">
                You are viewing {person.name}'s health data. You can also add data for them.
              </Text>
            </View>
            <Pressable
              onPress={() =>
                Alert.alert('Demo', 'Editing a family profile is not wired up in this demo.')
              }
              accessibilityRole="button"
              accessibilityLabel="Edit profile"
              className="flex-row items-center rounded-full border border-outlineVariant px-3 py-2"
            >
              <Ionicons name="pencil-outline" size={16} color="#181c1c" />
              <Text className="ml-1 text-sm font-medium text-onSurface">Edit Profile</Text>
            </Pressable>
          </View>
        </Card>

        <View className="mb-5 flex-row gap-3">
          <Pressable
            onPress={() =>
              Alert.alert('Demo', 'The health-record creator is not wired up in this demo.')
            }
            accessibilityRole="button"
            className="flex-1 rounded-2xl border border-outlineVariant bg-surfaceContainerLowest p-4"
          >
            <View className="flex-row items-center justify-between">
              <View className="h-11 w-11 items-center justify-center rounded-full bg-tertiaryFixed/40">
                <Ionicons name="add-circle-outline" size={24} color="#004345" />
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6f7979" />
            </View>
            <Text className="mt-3 text-base font-semibold text-onSurface">Add Record</Text>
            <Text className="mt-0.5 text-sm text-onSurfaceVariant">
              Add lab reports, prescriptions and more.
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push(`${base}/summary` as never)}
            accessibilityRole="button"
            className="flex-1 rounded-2xl border border-outlineVariant bg-surfaceContainerLowest p-4"
          >
            <View className="flex-row items-center justify-between">
              <View className="h-11 w-11 items-center justify-center rounded-full bg-tertiaryFixed/40">
                <Ionicons name="document-text-outline" size={24} color="#004345" />
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6f7979" />
            </View>
            <Text className="mt-3 text-base font-semibold text-onSurface">View Summary</Text>
            <Text className="mt-0.5 text-sm text-onSurfaceVariant">
              See an AI-generated summary of {person.name}'s health.
            </Text>
          </Pressable>
        </View>

        <View className="mb-3 flex-row items-center justify-between px-1">
          <Text className="text-lg font-semibold text-onSurface">Health Information</Text>
          <Text className="text-sm font-semibold text-primary">View All</Text>
        </View>

        <View className="mb-2 flex-row flex-wrap gap-3">
          {TILES.map((tile) => (
            <Pressable
              key={tile.title}
              onPress={() => Alert.alert('Demo', `${tile.title} are not wired up in this demo.`)}
              accessibilityRole="button"
              accessibilityLabel={tile.title}
              className="w-[48%] rounded-2xl border border-outlineVariant bg-surfaceContainerLowest p-4"
            >
              <View className="flex-row items-center justify-between">
                <View className="h-11 w-11 items-center justify-center rounded-full bg-tertiaryFixed/40">
                  <Ionicons name={tile.icon} size={24} color="#004345" />
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6f7979" />
              </View>
              <Text className="mt-3 text-base font-semibold text-onSurface">{tile.title}</Text>
              <Text className="mt-0.5 text-sm text-onSurfaceVariant" numberOfLines={2}>
                {tile.subtitle}
              </Text>
              {tile.count ? (
                <View className="mt-2 self-start rounded-full bg-tertiaryFixed/40 px-3 py-1">
                  <Text className="text-xs font-semibold text-onTertiaryFixedVariant">
                    {tile.count}
                  </Text>
                </View>
              ) : null}
            </Pressable>
          ))}
        </View>

        <View className="mb-5 overflow-hidden rounded-2xl border border-outlineVariant bg-surfaceContainerLowest">
          {ROWS.map((row, index) => (
            <Pressable
              key={row.title}
              onPress={() => Alert.alert('Demo', `${row.title} are not wired up in this demo.`)}
              accessibilityRole="button"
              className={`flex-row items-center px-4 py-4 ${
                index < ROWS.length - 1 ? 'border-b border-outlineVariant/60' : ''
              }`}
            >
              <View className="mr-4 h-11 w-11 items-center justify-center rounded-full bg-tertiaryFixed/40">
                <Ionicons name={row.icon} size={24} color="#004345" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-onSurface">{row.title}</Text>
                <Text className="mt-0.5 text-sm text-onSurfaceVariant" numberOfLines={2}>
                  {row.subtitle}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6f7979" />
            </Pressable>
          ))}
        </View>

        <View className="mb-3 flex-row gap-3">
          <View className="flex-1">
            <Button
              title="What I Can Access"
              variant="secondary"
              onPress={() => router.push(`${base}/access` as never)}
            />
          </View>
          <View className="flex-1">
            <Button
              title="Manage Visibility"
              variant="secondary"
              onPress={() => router.push(`${base}/visibility` as never)}
            />
          </View>
        </View>

        <Button
          title={`+ Add Health Data for ${person.name}`}
          onPress={() => Alert.alert('Demo', 'The health-record creator is not wired up in this demo.')}
        />

        <Text className="mt-3 text-center text-xs text-onSurfaceVariant">
          All health records shown are fictional demo data.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';

/** Fictional demo people — not real individuals. */
const I_HAVE_ACCESS = [
  { id: 'mummy', name: 'Mummy', access: 'Full Access' as const, initials: 'M' },
  { id: 'daddy', name: 'Daddy', access: 'Limited Access' as const, initials: 'D' },
];

const CAN_ACCESS_MINE = [
  { id: 'mummy', name: 'Mummy', access: 'Full Access' as const, initials: 'M' },
  { id: 'daddy', name: 'Daddy', access: 'Limited Access' as const, initials: 'D' },
];

function PersonCard({
  person,
  action,
  actionRoute,
  blurb,
}: {
  person: { id: string; name: string; access: 'Full Access' | 'Limited Access'; initials: string };
  action: string;
  actionRoute: string;
  blurb: string;
}) {
  const router = useRouter();
  return (
    <View className="mb-5 rounded-2xl border border-outlineVariant bg-surfaceContainerLowest p-4">
      <View className="flex-row items-center">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-primaryFixed/50">
          <Text className="text-xl font-bold text-onPrimaryFixedVariant">{person.initials}</Text>
        </View>
        <View className="ml-4 flex-1">
          <Text className="text-lg font-semibold text-onSurface">{person.name}</Text>
          <View className="mt-1.5">
            <Badge label={person.access} tone={person.access === 'Full Access' ? 'primary' : 'info'} />
          </View>
        </View>
        <Pressable
          onPress={() => router.push(actionRoute as never)}
          accessibilityRole="button"
          accessibilityLabel={`${action} for ${person.name}`}
          className="flex-row items-center rounded-full bg-surfaceContainer px-4 py-2.5"
        >
          <Text className="mr-1 text-sm font-semibold text-primary">{action}</Text>
          <Ionicons name="chevron-forward" size={18} color="#004345" />
        </Pressable>
      </View>
      <Text className="mt-3 text-sm text-onSurfaceVariant">{blurb}</Text>
    </View>
  );
}

export default function PrivacyPermissionsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader
        title="Privacy & Permissions"
        subtitle="Manage whose health you can access and who can access your health."
      />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <Card className="mb-5">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-1 flex-row items-center">
              <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-tertiaryFixed/40">
                <Ionicons name="people-outline" size={24} color="#004345" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-onSurface">Whose Access I Have</Text>
                <Text className="text-sm text-onSurfaceVariant">
                  People whose health information you can access.
                </Text>
              </View>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Request access"
              className="h-10 w-10 items-center justify-center rounded-full border border-outlineVariant"
            >
              <Ionicons name="add" size={20} color="#181c1c" />
            </Pressable>
          </View>

          {I_HAVE_ACCESS.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              action="View Health"
              actionRoute={`/family-care/${person.id}`}
              blurb={
                person.access === 'Full Access'
                  ? `You can view and add data for ${person.name}. You can also manage what ${person.name} can see.`
                  : `You can view and add data for ${person.name}. You cannot manage ${person.name}'s visibility.`
              }
            />
          ))}

          <View className="rounded-2xl bg-surfaceContainer p-4">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#004345" />
              <Text className="ml-3 flex-1 text-sm text-onSurfaceVariant">
                You can always add lab reports, prescriptions and other health information for
                people whose health you can access. The updates will be reflected in their
                AyuOS account.
              </Text>
            </View>
          </View>
        </Card>

        <Card>
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-1 flex-row items-center">
              <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-tertiaryFixed/40">
                <Ionicons name="shield-checkmark-outline" size={24} color="#004345" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-onSurface">Who Can Access My Health</Text>
                <Text className="text-sm text-onSurfaceVariant">
                  People you have given access to your health information.
                </Text>
              </View>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Grant access"
              className="h-10 w-10 items-center justify-center rounded-full border border-outlineVariant"
            >
              <Ionicons name="add" size={20} color="#181c1c" />
            </Pressable>
          </View>

          {CAN_ACCESS_MINE.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              action="Manage Access"
              actionRoute={`/privacy-permissions/manage/${person.id}`}
              blurb={
                person.access === 'Full Access'
                  ? `Can view and add data to your health record. Can also manage what you can see.`
                  : `Can view and add data to your health record. Cannot manage what you can see.`
              }
            />
          ))}

          <View className="rounded-2xl bg-surfaceContainer p-4">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#004345" />
              <Text className="ml-3 flex-1 text-sm text-onSurfaceVariant">
                People with access can add lab reports, prescriptions and other health
                information for you. Any information they add will be reflected in your AyuOS
                account.
              </Text>
            </View>
          </View>
        </Card>

        <Text className="mt-4 text-center text-xs text-onSurfaceVariant">
          Access grants shown are fictional demo data.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

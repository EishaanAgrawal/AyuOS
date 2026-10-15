import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../../components/Badge';
import { Card } from '../../../components/Card';
import { PageHeader } from '../../../components/PageHeader';
import { Toggle } from '../../../components/Toggle';

type IconName = keyof typeof Ionicons.glyphMap;

const PEOPLE: Record<string, { name: string; access: 'Full Access' | 'Limited Access' }> = {
  mummy: { name: 'Mummy', access: 'Full Access' },
  daddy: { name: 'Daddy', access: 'Limited Access' },
};

/** Fictional granted categories — DISPLAY of what the recipient granted (local preview). */
const CATEGORIES: { title: string; description: string; icon: IconName }[] = [
  { title: 'Medical History', description: 'Past conditions, treatments and health summary.', icon: 'reader-outline' },
  { title: 'Lab Reports', description: 'Blood work, urine tests and other lab results.', icon: 'flask-outline' },
  { title: 'Scan Reports', description: 'X-rays, MRI, CT scans and imaging.', icon: 'image-outline' },
  { title: 'Doctor Notes', description: 'Consultation notes from doctors.', icon: 'clipboard-outline' },
  { title: 'Prescriptions', description: 'Current and past prescriptions.', icon: 'document-text-outline' },
  { title: 'Medicines', description: 'Active medication list.', icon: 'medkit-outline' },
  { title: 'Appointments', description: 'Past and upcoming appointments.', icon: 'calendar-outline' },
  { title: 'Health Trends', description: 'Key health parameters over time.', icon: 'stats-chart-outline' },
  { title: 'Medical Bills', description: 'Bills and invoices related to treatment.', icon: 'receipt-outline' },
  { title: 'Medical Expenses', description: 'Recorded medical spending.', icon: 'card-outline' },
  { title: 'Treatment Costs', description: 'Estimated and actual treatment costs.', icon: 'cash-outline' },
  { title: 'Insurance Details', description: 'Policy and claim information.', icon: 'shield-checkmark-outline' },
];

export default function WhatICanAccessScreen() {
  const { personId } = useLocalSearchParams<{ personId: string }>();
  const person = PEOPLE[personId] ?? { name: 'Family Member', access: 'Limited Access' as const };
  const full = person.access === 'Full Access';

  const [granted, setGranted] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      CATEGORIES.map((c) => [
        c.title,
        full ? true : ['Prescriptions', 'Medicines', 'Appointments'].includes(c.title),
      ]),
    ),
  );

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader
        title={`What I Can Access of ${person.name}'s Data`}
        subtitle="Access = what you, as a caregiver, may retrieve and add."
      />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <Card className="mb-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-onSurface">Access level</Text>
            <Badge label={person.access} tone={full ? 'primary' : 'info'} />
          </View>
          <Text className="mt-2 text-sm text-onSurfaceVariant">
            You can view and add data for {person.name} in the categories below.
          </Text>
        </Card>

        <Card>
          <View className="mb-2 flex-row items-center">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-tertiaryFixed/40">
              <Ionicons name="shield-checkmark-outline" size={22} color="#004345" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-onSurface">Granted Categories</Text>
              <Text className="text-sm text-onSurfaceVariant">
                Toggles show what {person.name} has granted you.
              </Text>
            </View>
          </View>
          {CATEGORIES.map((category, index) => (
            <View
              key={category.title}
              className={index < CATEGORIES.length - 1 ? 'border-b border-outlineVariant/60' : ''}
            >
              <View className="flex-row items-center">
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-surfaceContainer">
                  <Ionicons name={category.icon} size={20} color="#004345" />
                </View>
                <View className="flex-1">
                  <Toggle
                    value={!!granted[category.title]}
                    onChange={(value) =>
                      setGranted((prev) => ({ ...prev, [category.title]: value }))
                    }
                    label={category.title}
                    description={category.description}
                  />
                </View>
              </View>
            </View>
          ))}
        </Card>

        <View className="mt-5 rounded-2xl border border-[#bcd9db] bg-primaryFixed/20 p-4">
          <View className="flex-row items-start">
            <Ionicons name="information-circle-outline" size={22} color="#004345" />
            <Text className="ml-3 flex-1 text-sm text-onSurfaceVariant">
              Grants are managed by {person.name}. These toggles are a display of the access{' '}
              {person.name} has granted you — changes here are a local demo preview and do not
              change the real grant.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

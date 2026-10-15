import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { PageHeader } from '../../../components/PageHeader';
import { Toggle } from '../../../components/Toggle';

type IconName = keyof typeof Ionicons.glyphMap;

const PEOPLE: Record<string, { name: string; access: 'Full Access' | 'Limited Access' }> = {
  mummy: { name: 'Mummy', access: 'Full Access' },
  daddy: { name: 'Daddy', access: 'Limited Access' },
};

/** Fictional categories — 12 total. */
const CATEGORIES: { title: string; description: string; icon: IconName; initial: boolean }[] = [
  { title: 'Medical History', description: 'Past conditions and treatments.', icon: 'reader-outline', initial: false },
  { title: 'Lab Reports', description: 'Blood work and lab results.', icon: 'flask-outline', initial: true },
  { title: 'Scan Reports', description: 'X-rays, MRI and imaging.', icon: 'image-outline', initial: true },
  { title: 'Doctor Notes', description: 'Consultation notes from doctors.', icon: 'clipboard-outline', initial: true },
  { title: 'Prescriptions', description: 'Current and past prescriptions.', icon: 'document-text-outline', initial: true },
  { title: 'Medicines', description: 'Active medication list.', icon: 'medkit-outline', initial: false },
  { title: 'Appointments', description: 'Past and upcoming appointments.', icon: 'calendar-outline', initial: true },
  { title: 'Health Trends', description: 'Key parameters over time.', icon: 'stats-chart-outline', initial: false },
  { title: 'Medical Bills', description: 'Bills and invoices.', icon: 'receipt-outline', initial: true },
  { title: 'Medical Expenses', description: 'Recorded medical spending.', icon: 'card-outline', initial: false },
  { title: 'Treatment Costs', description: 'Estimated and actual costs.', icon: 'cash-outline', initial: false },
  { title: 'Insurance Details', description: 'Policy and claim info.', icon: 'shield-checkmark-outline', initial: true },
];

export default function ManageVisibilityScreen() {
  const { personId } = useLocalSearchParams<{ personId: string }>();
  const person = PEOPLE[personId] ?? { name: 'Family Member', access: 'Limited Access' as const };
  const full = person.access === 'Full Access';

  const [visible, setVisible] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CATEGORIES.map((c) => [c.title, c.initial])),
  );

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader
        title={`Manage What ${person.name} Can See`}
        subtitle="Visibility = what the recipient sees of your health data."
      />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <Card className="mb-5">
          <View className="flex-row items-center">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-primaryFixed/50">
              <Text className="text-xl font-bold text-onPrimaryFixedVariant">
                {person.name.charAt(0)}
              </Text>
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-lg font-semibold text-onSurface">{person.name}</Text>
              <View className="mt-1.5">
                <Badge label={person.access} tone={full ? 'primary' : 'info'} />
              </View>
            </View>
          </View>
        </Card>

        {full ? (
          <Card>
            <View className="mb-2 flex-row items-center">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-tertiaryFixed/40">
                <Ionicons name="eye-outline" size={22} color="#004345" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-onSurface">
                  What {person.name} Can See
                </Text>
                <Text className="text-sm text-onSurfaceVariant">
                  Choose which parts of your health information {person.name} can view.
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
                      value={!!visible[category.title]}
                      onChange={(value) =>
                        setVisible((prev) => ({ ...prev, [category.title]: value }))
                      }
                      label={category.title}
                      description={category.description}
                    />
                  </View>
                </View>
              </View>
            ))}
          </Card>
        ) : (
          <Card>
            <View className="items-center py-6">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-surfaceContainer">
                <Ionicons name="lock-closed-outline" size={30} color="#6f7979" />
              </View>
              <Text className="text-center text-lg font-semibold text-onSurface">
                Visibility managed by {person.name}
              </Text>
              <Text className="mt-2 px-4 text-center text-sm text-onSurfaceVariant">
                {person.name} has granted you Limited Access. Visibility controls are only
                available when Full Access is granted, and the recipient manages what you can
                see.
              </Text>
            </View>
          </Card>
        )}

        {full && (
          <>
            <View className="mt-5 rounded-2xl border border-[#bcd9db] bg-primaryFixed/20 p-4">
              <View className="flex-row items-start">
                <Ionicons name="information-circle-outline" size={22} color="#004345" />
                <Text className="ml-3 flex-1 text-sm text-onSurfaceVariant">
                  {person.name} can view information only in the categories you allow. These
                  controls do not delete your data, and you will always be able to access all
                  of your information.
                </Text>
              </View>
            </View>
            <View className="mt-4">
              <Button title="Save Visibility Settings" onPress={() => {}} />
            </View>
          </>
        )}

        <View className="mt-5 rounded-2xl bg-surfaceContainer p-4">
          <Text className="text-sm text-onSurfaceVariant">
            <Text className="font-semibold text-onSurface">Access ≠ Visibility.</Text> Access is
            what a caregiver may retrieve and add; visibility is what the recipient chooses to
            show of their own health data.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

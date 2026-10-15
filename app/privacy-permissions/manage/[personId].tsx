import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { Modal } from '../../../components/Modal';
import { PageHeader } from '../../../components/PageHeader';
import { Toggle } from '../../../components/Toggle';

type IconName = keyof typeof Ionicons.glyphMap;

const PEOPLE: Record<string, { name: string; initials: string }> = {
  mummy: { name: 'Mummy', initials: 'M' },
  daddy: { name: 'Daddy', initials: 'D' },
};

const CATEGORIES: { title: string; description: string; icon: IconName; initial: boolean }[] = [
  { title: 'Medical History', description: 'Past conditions, treatments and health summary.', icon: 'reader-outline', initial: false },
  { title: 'Lab Reports', description: 'Blood work, urine tests and other lab results.', icon: 'flask-outline', initial: true },
  { title: 'Scan Reports', description: 'X-rays, MRI, CT scans and other imaging reports.', icon: 'image-outline', initial: true },
  { title: 'Doctor Notes', description: 'Consultation notes from doctors.', icon: 'clipboard-outline', initial: true },
  { title: 'Prescriptions', description: 'Current and past prescriptions.', icon: 'document-text-outline', initial: true },
  { title: 'Medicines', description: 'Active medication list.', icon: 'medkit-outline', initial: false },
  { title: 'Appointments', description: 'Past and upcoming appointments.', icon: 'calendar-outline', initial: true },
  { title: 'Health Trends', description: 'Track key health parameters over time.', icon: 'stats-chart-outline', initial: false },
  { title: 'Medical Bills', description: 'Bills and invoices related to treatment.', icon: 'receipt-outline', initial: true },
  { title: 'Medical Expenses', description: 'Recorded medical spending.', icon: 'card-outline', initial: false },
  { title: 'Treatment Costs', description: 'Estimated and actual treatment costs.', icon: 'cash-outline', initial: false },
  { title: 'Insurance Details', description: 'Policy and claim information.', icon: 'shield-checkmark-outline', initial: true },
];

export default function ManagePersonAccessScreen() {
  const { personId } = useLocalSearchParams<{ personId: string }>();
  const person = PEOPLE[personId] ?? { name: 'Family Member', initials: '?' };

  const [accessLevel, setAccessLevel] = useState<'full' | 'limited'>('full');
  const [allowed, setAllowed] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CATEGORIES.map((c) => [c.title, c.initial])),
  );
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [revoked, setRevoked] = useState(false);

  const grantCount = Object.values(allowed).filter(Boolean).length;

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader
        title={person.name}
        subtitle={`Manage what ${person.name} can access of your health data.`}
      />

      <ScrollView contentContainerClassName="px-5 pb-10">
        {revoked ? (
          <Card>
            <View className="items-center py-8">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-errorContainer">
                <Ionicons name="shield-outline" size={30} color="#ba1a1a" />
              </View>
              <Text className="text-lg font-semibold text-onSurface">Access revoked</Text>
              <Text className="mt-2 px-4 text-center text-sm text-onSurfaceVariant">
                {person.name} can no longer view or add data to your health record. This is a
                local demo preview.
              </Text>
              <View className="mt-5 w-full">
                <Button title="Restore Access" variant="secondary" onPress={() => setRevoked(false)} />
              </View>
            </View>
          </Card>
        ) : (
          <>
            <Card className="mb-5">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-primaryFixed/50">
                    <Text className="text-lg font-bold text-onPrimaryFixedVariant">
                      {person.initials}
                    </Text>
                  </View>
                  <Text className="text-lg font-semibold text-onSurface">{person.name}</Text>
                </View>
                <Badge label={accessLevel === 'full' ? 'Full Access' : 'Limited Access'} tone="primary" />
              </View>
              <View className="mt-4 flex-row rounded-full bg-surfaceContainer p-1">
                {(['full', 'limited'] as const).map((level) => {
                  const active = accessLevel === level;
                  return (
                    <View key={level} className="flex-1">
                      <Button
                        title={level === 'full' ? 'Full Access' : 'Limited Access'}
                        variant={active ? 'primary' : 'ghost'}
                        onPress={() => setAccessLevel(level)}
                      />
                    </View>
                  );
                })}
              </View>
            </Card>

            <Card>
              <View className="mb-2 flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-onSurface">
                  What {person.name} Can Access
                </Text>
                <Text className="text-sm text-onSurfaceVariant">{grantCount} of 12</Text>
              </View>
              <Text className="mb-2 text-sm text-onSurfaceVariant">
                Choose which parts of your health information {person.name} can view and add.
              </Text>
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
                        value={!!allowed[category.title]}
                        onChange={(value) =>
                          setAllowed((prev) => ({ ...prev, [category.title]: value }))
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
                  {person.name} can view and add information only in the categories you allow.
                  These controls do not delete your data, and you will always be able to access
                  all of your information.
                </Text>
              </View>
            </View>

            <View className="mt-5">
              <Button
                title="Revoke Access"
                variant="danger"
                onPress={() => setConfirmVisible(true)}
              />
            </View>
          </>
        )}
      </ScrollView>

      <Modal visible={confirmVisible} onClose={() => setConfirmVisible(false)} title="Revoke access?">
        <Text className="text-sm text-onSurfaceVariant">
          {person.name} will immediately lose access to your health data, including the ability
          to view and add records. This is a local demo preview and does not affect any real
          account.
        </Text>
        <View className="mt-6 gap-3">
          <Button
            title={`Revoke ${person.name}'s Access`}
            variant="danger"
            onPress={() => {
              setConfirmVisible(false);
              setRevoked(true);
            }}
          />
          <Button title="Keep Access" variant="secondary" onPress={() => setConfirmVisible(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

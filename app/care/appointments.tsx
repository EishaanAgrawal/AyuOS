import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { SectionTitle } from '../../components/SectionTitle';
import { DemoAppointment, demoAppointments } from '../../lib/demo-data';

interface Visit extends DemoAppointment {
  status: 'upcoming' | 'completed';
  reason?: string;
}

/**
 * Upcoming appointments come from lib/demo-data; history is fictional
 * demo data extended here (not in lib/).
 */
const HISTORY: Visit[] = [
  {
    id: 'appt-h1',
    doctor: 'Dr. Sharma',
    specialty: 'General Physician',
    date: 'Sat, 12 Sep 2026',
    time: '11:00 AM',
    location: 'VIT-AP Hospital, OPD 1',
    status: 'completed',
    reason: 'Quarterly checkup · BP reviewed',
  },
  {
    id: 'appt-h2',
    doctor: 'Dr. Mehta',
    specialty: 'Endocrinology',
    date: 'Fri, 14 Aug 2026',
    time: '4:00 PM',
    location: 'City Diagnostics, Room 4',
    status: 'completed',
    reason: 'HbA1c review',
  },
];

const UPCOMING: Visit[] = demoAppointments.map((a) => ({ ...a, status: 'upcoming' as const }));

function DateBadge({ date }: { date: string }) {
  const parts = date.split(', ')[1]?.split(' ') ?? [];
  const day = parts[0] ?? '';
  const month = parts[1] ?? '';
  return (
    <View className="h-16 w-14 items-center justify-center rounded-xl bg-primaryFixed">
      <Text className="text-base font-bold text-onPrimaryFixed">{day}</Text>
      <Text className="text-xs font-semibold text-onPrimaryFixedVariant">{month}</Text>
    </View>
  );
}

function VisitCard({ visit, onPress }: { visit: Visit; onPress: () => void }) {
  return (
    <Card className="p-4" onPress={onPress}>
      <View className="flex-row items-center gap-4">
        <DateBadge date={visit.date} />
        <View className="flex-1">
          <Text className="text-base font-semibold text-onSurface">{visit.doctor}</Text>
          <Text className="mt-0.5 text-sm text-onSurfaceVariant">
            {visit.specialty} · {visit.time}
          </Text>
          <Text className="text-sm text-onSurfaceVariant" numberOfLines={1}>
            {visit.location}
          </Text>
        </View>
        <View className="items-end gap-1.5">
          <Badge label={visit.status === 'upcoming' ? 'Upcoming' : 'Done'} tone={visit.status === 'upcoming' ? 'primary' : 'neutral'} />
          <Ionicons name="chevron-forward" size={18} color="#6f7979" />
        </View>
      </View>
    </Card>
  );
}

function VisitDetail({ visit, onBack }: { visit: Visit; onBack: () => void }) {
  const router = useRouter();

  const reschedule = () =>
    Alert.alert(
      'Backend pending',
      'Rescheduling appointments needs your hospital booking link, which is not connected yet.',
    );

  const cancel = () =>
    Alert.alert(
      'Backend pending',
      'Cancelling appointments needs your hospital booking link, which is not connected yet.',
    );

  const rows: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }[] = [
    { icon: 'person-outline', label: 'Doctor', value: visit.doctor },
    { icon: 'medical-outline', label: 'Specialty', value: visit.specialty },
    { icon: 'calendar-outline', label: 'Date', value: visit.date },
    { icon: 'time-outline', label: 'Time', value: visit.time },
    { icon: 'location-outline', label: 'Location', value: visit.location },
  ];
  if (visit.reason) {
    rows.push({ icon: 'clipboard-outline', label: 'Reason', value: visit.reason });
  }

  return (
    <View>
      <Pressable
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Back to appointments"
        className="mx-5 mb-1 flex-row items-center"
      >
        <Ionicons name="chevron-back" size={20} color="#004345" />
        <Text className="text-sm font-semibold text-primary">All appointments</Text>
      </Pressable>

      <View className="px-5">
        <Card className="p-5">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-onSurface">{visit.doctor}</Text>
            <Badge
              label={visit.status === 'upcoming' ? 'Upcoming' : 'Completed'}
              tone={visit.status === 'upcoming' ? 'primary' : 'neutral'}
            />
          </View>
          {rows.map((row) => (
            <View key={row.label} className="flex-row items-center gap-3 py-2.5">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-surfaceContainer">
                <Ionicons name={row.icon} size={18} color="#004345" />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-medium uppercase tracking-wide text-onSurfaceVariant">
                  {row.label}
                </Text>
                <Text className="text-base text-onSurface">{row.value}</Text>
              </View>
            </View>
          ))}
        </Card>
      </View>

      {visit.status === 'upcoming' && (
        <View className="mt-5 gap-3 px-5">
          <Button
            title="Prepare for this visit"
            variant="primary"
            onPress={() => router.push('/care/visit-prep')}
          />
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Button title="Reschedule" variant="secondary" onPress={reschedule} />
            </View>
            <View className="flex-1">
              <Button title="Cancel" variant="danger" onPress={cancel} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default function AppointmentsScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const all = [...UPCOMING, ...HISTORY];
  const selected = all.find((v) => v.id === selectedId) ?? null;

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader title="Appointments" subtitle="Fictional demo data" />
      <ScrollView contentContainerClassName="pb-8">
        {selected ? (
          <VisitDetail visit={selected} onBack={() => setSelectedId(null)} />
        ) : (
          <View>
            <SectionTitle title="Upcoming" action={<Badge label="Demo data" tone="neutral" />} />
            <View className="gap-3 px-5">
              {UPCOMING.map((visit) => (
                <VisitCard key={visit.id} visit={visit} onPress={() => setSelectedId(visit.id)} />
              ))}
            </View>

            <SectionTitle title="History" />
            <View className="gap-3 px-5">
              {HISTORY.map((visit) => (
                <VisitCard key={visit.id} visit={visit} onPress={() => setSelectedId(visit.id)} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

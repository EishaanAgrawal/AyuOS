import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { SectionTitle } from '../../components/SectionTitle';
import { demoAppointments } from '../../lib/demo-data';

const QUICK_LINKS = [
  { title: 'Appointments', icon: 'calendar-outline' as const, route: '/care/appointments' },
  { title: 'Visit prep', icon: 'clipboard-outline' as const, route: '/care/visit-prep' },
  { title: 'Emergency', icon: 'alert-circle-outline' as const, route: '/emergency' },
] as const;

export default function CareScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader title="Care" showBack={false} />
      <ScrollView contentContainerClassName="pb-8">
        <View className="flex-row gap-3 px-5">
          {QUICK_LINKS.map((link) => (
            <Pressable
              key={link.title}
              onPress={() => router.push(link.route)}
              className="flex-1 items-center rounded-2xl border border-outlineVariant bg-surfaceContainerLowest p-4"
            >
              <Ionicons name={link.icon} size={26} color="#004345" />
              <Text className="mt-2 text-center text-sm font-semibold text-onSurface">
                {link.title}
              </Text>
            </Pressable>
          ))}
        </View>

        <SectionTitle title="Upcoming visits" />
        <View className="gap-3 px-5">
          {demoAppointments.map((appt) => (
            <Card key={appt.id} className="p-4" onPress={() => router.push('/care/appointments')}>
              <Text className="text-base font-semibold text-onSurface">{appt.doctor}</Text>
              <Text className="mt-0.5 text-sm text-onSurfaceVariant">
                {appt.specialty} · {appt.date}
              </Text>
              <Text className="mt-0.5 text-sm text-onSurfaceVariant">
                {appt.time} · {appt.location}
              </Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

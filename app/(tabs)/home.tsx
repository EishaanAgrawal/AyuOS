import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { SectionTitle } from '../../components/SectionTitle';
import { demoAppointments, demoDocuments, demoMedicines, demoUser } from '../../lib/demo-data';

function PersonSwitcher() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Switch profile"
      className="flex-row items-center rounded-full bg-surfaceContainerLowest py-1.5 pl-1.5 pr-3"
    >
      <View className="mr-2 h-9 w-9 items-center justify-center rounded-full bg-primaryContainer">
        <Text className="text-sm font-bold text-onPrimary">{demoUser.avatarInitials}</Text>
      </View>
      <Text className="mr-1 text-sm font-semibold text-onSurface">My Health</Text>
      <Ionicons name="chevron-down" size={16} color="#3f4949" />
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerClassName="pb-8">
        <View className="flex-row items-center justify-between px-5 pb-2 pt-3">
          <View>
            <Text className="text-sm text-onSurfaceVariant">Good evening</Text>
            <Text className="text-2xl font-semibold text-onSurface">{demoUser.name}</Text>
          </View>
          <PersonSwitcher />
        </View>

        <SectionTitle
          title="Today's medicines"
          action={
            <Pressable onPress={() => router.push('/(tabs)/medicines')}>
              <Text className="text-sm font-semibold text-primary">View all</Text>
            </Pressable>
          }
        />
        <View className="gap-3 px-5">
          {demoMedicines.map((med) => (
            <Card
              key={med.id}
              className="p-4"
              onPress={() => router.push(`/medicines/${med.id}`)}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-onSurface">
                    {med.name} · {med.strength}
                  </Text>
                  <Text className="mt-0.5 text-sm text-onSurfaceVariant">{med.schedule}</Text>
                </View>
                <Badge label={med.takenToday ? 'Taken' : 'Due'} tone={med.takenToday ? 'success' : 'warning'} />
              </View>
            </Card>
          ))}
        </View>

        <SectionTitle
          title="Upcoming appointments"
          action={
            <Pressable onPress={() => router.push('/care/appointments')}>
              <Text className="text-sm font-semibold text-primary">View all</Text>
            </Pressable>
          }
        />
        <View className="gap-3 px-5">
          {demoAppointments.map((appt) => (
            <Card key={appt.id} className="p-4">
              <Text className="text-base font-semibold text-onSurface">{appt.doctor}</Text>
              <Text className="mt-0.5 text-sm text-onSurfaceVariant">
                {appt.specialty} · {appt.date} · {appt.time}
              </Text>
            </Card>
          ))}
        </View>

        <SectionTitle
          title="Recent documents"
          action={
            <Pressable onPress={() => router.push('/(tabs)/records')}>
              <Text className="text-sm font-semibold text-primary">View all</Text>
            </Pressable>
          }
        />
        <View className="gap-3 px-5">
          {demoDocuments.slice(0, 2).map((doc) => (
            <Card
              key={doc.docId}
              className="p-4"
              onPress={() => router.push(`/records/${doc.docId}`)}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-onSurface" numberOfLines={1}>
                    {doc.title}
                  </Text>
                  <Text className="mt-0.5 text-sm text-onSurfaceVariant">
                    {doc.date} · {doc.source}
                  </Text>
                </View>
                <Badge label={doc.verified ? 'Verified' : 'Pending'} tone={doc.verified ? 'success' : 'warning'} />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { SectionTitle } from '../../components/SectionTitle';
import {
  demoAppointments,
  demoDocuments,
  demoMedicines,
  demoUser,
} from '../../lib/demo-data';

type SubjectId = 'me' | 'mummy' | 'daddy';

interface Subject {
  id: SubjectId;
  label: string;
  /** Fictional name shown across the screen for the selected subject. */
  name: string;
  initials: string;
}

const SUBJECTS: Subject[] = [
  { id: 'me', label: "My Health", name: 'Eishaan', initials: 'ES' },
  { id: 'mummy', label: "Mummy's Health", name: 'Mummy', initials: 'M' },
  { id: 'daddy', label: "Daddy's Health", name: 'Daddy', initials: 'D' },
];

function greetingForNow(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const HEALTH_AREAS: { label: string; icon: keyof typeof Ionicons.glyphMap; route: string }[] = [
  { label: 'Heart', icon: 'heart', route: '/explorer/heart' },
  { label: 'Lungs', icon: 'cloud', route: '/explorer/lungs' },
  { label: 'Kidneys', icon: 'water', route: '/explorer/kidneys' },
  { label: 'Brain', icon: 'bulb', route: '/explorer/brain' },
  { label: 'Eyes', icon: 'eye', route: '/explorer/eyes' },
  { label: 'Dental', icon: 'bandage', route: '/explorer/dental' },
  { label: 'Bones', icon: 'body', route: '/explorer/bones' },
  { label: 'Skin', icon: 'hand-left', route: '/explorer/skin' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [subjectId, setSubjectId] = useState<SubjectId>('me');
  const subject = SUBJECTS.find((s) => s.id === subjectId) ?? SUBJECTS[0];

  const refillAlert = demoMedicines.find((m) => !m.takenToday) ?? demoMedicines[0];
  const nextAppointment = demoAppointments[0];
  const latestDoc = demoDocuments[0];

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerClassName="pb-10">
        {/* ---- Header: greeting + bell + avatar ---- */}
        <View className="flex-row items-center justify-between px-5 pb-1 pt-3">
          <View>
            <Text className="text-sm text-onSurfaceVariant">{greetingForNow()},</Text>
            <Text className="text-2xl font-semibold text-onSurface">{demoUser.name}</Text>
            <Text className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Viewing · {subject.label}
            </Text>
          </View>
          <View className="flex-row items-center gap-2.5">
            <Pressable
              onPress={() => router.push('/notifications')}
              accessibilityRole="button"
              accessibilityLabel="Notifications"
              className="h-11 w-11 items-center justify-center rounded-full bg-surfaceContainerLowest"
            >
              <Ionicons name="notifications-outline" size={22} color="#181c1c" />
              <View className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-mutedCoral" />
            </Pressable>
            <Pressable
              onPress={() => router.push('/settings')}
              accessibilityRole="button"
              accessibilityLabel="Profile settings"
              className="h-11 w-11 items-center justify-center rounded-full bg-primaryContainer"
            >
              <Text className="text-sm font-bold text-onPrimary">{demoUser.avatarInitials}</Text>
            </Pressable>
          </View>
        </View>

        {/* ---- Global subject selector ---- */}
        <View className="px-5 pt-3">
          <View
            accessibilityRole="tablist"
            className="flex-row rounded-2xl bg-surfaceContainerLow p-1.5"
          >
            {SUBJECTS.map((s) => {
              const active = s.id === subjectId;
              return (
                <Pressable
                  key={s.id}
                  onPress={() => setSubjectId(s.id)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={s.label}
                  className={`flex-1 items-center rounded-xl py-2.5 ${
                    active ? 'bg-primary' : ''
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      active ? 'text-onPrimary' : 'text-onSurfaceVariant'
                    }`}
                  >
                    {s.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* ---- Ask AyuOS entry ---- */}
        <View className="px-5 pt-4">
          <Pressable
            onPress={() => router.push('/ask-ai')}
            accessibilityRole="button"
            accessibilityLabel="Ask AyuOS"
            className="flex-row items-center rounded-2xl border border-outlineVariant bg-surfaceContainerLowest px-4 py-4"
          >
            <Ionicons name="search-outline" size={20} color="#6f7979" />
            <Text className="ml-3 flex-1 text-base text-onSurfaceVariant">
              Ask AyuOS anything…
            </Text>
            <Ionicons name="mic-outline" size={20} color="#6f7979" />
          </Pressable>
        </View>

        {/* ---- Upload Anything entry ---- */}
        <View className="px-5 pt-3">
          <Card className="p-5" onPress={() => router.push('/upload')}>
            <View className="flex-row items-center">
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-secondaryFixed">
                <Ionicons name="cloud-upload-outline" size={26} color="#1b607f" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-lg font-semibold text-onSurface">Upload Anything</Text>
                <Text className="mt-0.5 text-sm text-onSurfaceVariant">
                  Reports, prescriptions, bills, scans and more.
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#6f7979" />
            </View>
          </Card>
        </View>

        {/* ---- Things That Need Attention ---- */}
        <SectionTitle
          title={`Things needing attention`}
          action={
            <Pressable onPress={() => router.push('/notifications')}>
              <Text className="text-sm font-semibold text-primary">
                View all (3){' '}
                <Ionicons name="chevron-forward" size={14} color="#004345" />
              </Text>
            </Pressable>
          }
        />
        <View className="gap-3 px-5">
          {/* Refill alert */}
          <Card className="p-4" onPress={() => router.push('/medicines')}>
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-3">
                <View className="flex-row items-center gap-2">
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-errorContainer">
                    <Ionicons name="medkit-outline" size={18} color="#93000a" />
                  </View>
                  <Text className="text-base font-semibold text-onSurface" numberOfLines={1}>
                    {refillAlert.name} {refillAlert.strength}
                  </Text>
                </View>
                <Text className="mt-2 text-sm text-onSurfaceVariant">
                  {subject.name}&apos;s refill · May run out in{' '}
                  <Text className="font-bold text-mutedCoral">10 days</Text>
                </Text>
              </View>
              <Pressable
                onPress={() => router.push('/medicines')}
                accessibilityRole="button"
                accessibilityLabel="Order refill"
                className="rounded-full bg-primary px-4 py-2.5"
              >
                <Text className="text-sm font-bold text-onPrimary">Order Refill</Text>
              </Pressable>
            </View>
          </Card>

          {/* Upcoming appointment */}
          <Card className="p-4" onPress={() => router.push('/care')}>
            <View className="flex-row items-center">
              <View className="h-9 w-9 items-center justify-center rounded-full bg-secondaryFixed">
                <Ionicons name="calendar-outline" size={18} color="#004c69" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-base font-semibold text-onSurface">
                  Upcoming appointment · {subject.name}
                </Text>
                <Text className="mt-0.5 text-sm text-onSurfaceVariant">
                  {nextAppointment.doctor} · {nextAppointment.specialty} · {nextAppointment.date},{' '}
                  {nextAppointment.time}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6f7979" />
            </View>
          </Card>

          {/* New lab report */}
          <Card className="p-4" onPress={() => router.push('/records')}>
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-3">
                <View className="flex-row items-center gap-2">
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-tertiaryFixed">
                    <Ionicons name="document-text-outline" size={18} color="#394a47" />
                  </View>
                  <Text className="text-base font-semibold text-onSurface">
                    New lab report available
                  </Text>
                </View>
                <Text className="mt-2 text-sm text-onSurfaceVariant">
                  {latestDoc.title} · {latestDoc.date}
                </Text>
              </View>
              <Pressable
                onPress={() => router.push('/records')}
                accessibilityRole="button"
                accessibilityLabel="View report"
                className="rounded-full border border-outlineVariant px-4 py-2.5"
              >
                <Text className="text-sm font-bold text-primary">View report</Text>
              </Pressable>
            </View>
          </Card>
        </View>

        {/* ---- Health Explorer preview ---- */}
        <SectionTitle
          title="Health Areas"
          action={
            <Pressable onPress={() => router.push('/explorer')}>
              <Text className="text-sm font-semibold text-primary">
                View all <Ionicons name="chevron-forward" size={14} color="#004345" />
              </Text>
            </Pressable>
          }
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2.5 px-5"
        >
          {HEALTH_AREAS.map((area) => (
            <Pressable
              key={area.label}
              onPress={() => router.push(area.route)}
              accessibilityRole="button"
              accessibilityLabel={`Explore ${area.label}`}
              className="items-center rounded-2xl border border-outlineVariant bg-surfaceContainerLowest px-4 py-3.5"
            >
              <Ionicons name={area.icon} size={24} color="#004345" />
              <Text className="mt-1.5 text-xs font-semibold text-onSurface">{area.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* ---- Medicine + Family Care previews ---- */}
        <View className="flex-row gap-3 px-5 pt-4">
          <Card className="flex-1 p-4" onPress={() => router.push('/medicines')}>
            <Text className="text-sm font-bold text-onSurface">Medicines</Text>
            <Text className="mt-1.5 text-xs text-onSurfaceVariant">
              {demoMedicines.length} active · {subject.name}&apos;s list
            </Text>
            <View className="mt-2 flex-row items-center gap-1.5">
              <Ionicons name="alert-circle" size={14} color="#c65d5d" />
              <Text className="text-xs font-semibold text-mutedCoral">1 needs attention</Text>
            </View>
          </Card>
          <Card className="flex-1 p-4" onPress={() => router.push('/family-care')}>
            <Text className="text-sm font-bold text-onSurface">Family Care</Text>
            <View className="mt-2 flex-row items-center">
              <View className="h-8 w-8 items-center justify-center rounded-full bg-errorContainer">
                <Text className="text-xs font-bold text-onErrorContainer">M</Text>
              </View>
              <View className="ml-2 flex-1">
                <Text className="text-xs font-semibold text-onSurface">Mummy</Text>
                <Text className="text-xs text-onSurfaceVariant">Medicine refill needed</Text>
              </View>
            </View>
            <Text className="mt-2 text-xs text-onSurfaceVariant">Next sync: Today 8 PM</Text>
          </Card>
        </View>

        {/* ---- Fictional data note ---- */}
        <View className="mt-6 items-center px-5">
          <Badge label="Demo — all people and values are fictional" tone="neutral" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

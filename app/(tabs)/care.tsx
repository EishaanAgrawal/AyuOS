import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { SectionTitle } from '../../components/SectionTitle';
import { Tabs } from '../../components/Tabs';
import { demoAppointments } from '../../lib/demo-data';

type CareTab = 'overview' | 'appointments' | 'team';

const TAB_OPTIONS: { key: CareTab; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'appointments', label: 'Appointments' },
  { key: 'team', label: 'Care Team' },
];

interface CareTask {
  id: string;
  title: string;
  detail: string;
  due: string;
}

/** Fictional demo tasks — style matches the design reference. */
const CARE_TASKS: CareTask[] = [
  { id: 'task-1', title: 'Follow up on lab results', detail: 'HbA1c · 2 Oct 2026', due: '12 Oct 2026' },
  { id: 'task-2', title: 'Schedule next checkup', detail: 'General Physician', due: '20 Oct 2026' },
  { id: 'task-3', title: 'Review prescription refill', detail: 'Metformin · 500 mg', due: '24 Oct 2026' },
];

interface HistoryVisit {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  note: string;
}

/** Fictional demo history — extended here (not in lib/demo-data). */
const HISTORY: HistoryVisit[] = [
  {
    id: 'hist-1',
    doctor: 'Dr. Sharma',
    specialty: 'General Physician',
    date: 'Sat, 12 Sep 2026',
    time: '11:00 AM',
    note: 'Follow-up · completed',
  },
  {
    id: 'hist-2',
    doctor: 'Dr. Mehta',
    specialty: 'Endocrinology',
    date: 'Fri, 14 Aug 2026',
    time: '4:00 PM',
    note: 'Completed',
  },
];

interface CareTeamMember {
  id: string;
  name: string;
  role: string;
  place: string;
}

/** Fictional demo care team — hospital names in the video's style. */
const CARE_TEAM: CareTeamMember[] = [
  { id: 'team-1', name: 'Dr. Sharma', role: 'General Physician', place: 'VIT-AP Hospital' },
  { id: 'team-2', name: 'Dr. Rao', role: 'Cardiologist', place: 'Sunrise Hospital' },
  { id: 'team-3', name: 'Dr. Mehta', role: 'Endocrinologist', place: 'VIT-AP Hospital' },
];

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

function TaskRow({ task, done, onToggle }: { task: CareTask; done: boolean; onToggle: () => void }) {
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: done }}
      className="flex-row items-center gap-3 py-2"
    >
      <Ionicons
        name={done ? 'checkmark-circle' : 'ellipse-outline'}
        size={26}
        color={done ? '#3e8068' : '#6f7979'}
      />
      <View className="flex-1">
        <Text
          className={`text-base font-semibold text-onSurface ${done ? 'line-through opacity-50' : ''}`}
        >
          {task.title}
        </Text>
        <Text className="text-sm text-onSurfaceVariant">{task.detail}</Text>
      </View>
      <Text className="text-xs font-medium text-onSurfaceVariant">{task.due}</Text>
    </Pressable>
  );
}

function OverviewTab({ onOpenAppointments }: { onOpenAppointments: () => void }) {
  const next = demoAppointments[0];
  const [done, setDone] = useState<Record<string, boolean>>({});

  return (
    <View>
      <SectionTitle title="Next appointment" />
      <View className="px-5">
        <Card className="border-0 bg-primaryContainer p-5">
          <View className="flex-row items-center gap-4">
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primaryFixed">
              <Ionicons name="calendar" size={26} color="#004f51" />
            </View>
            <View className="flex-1">
              <Text className="text-xs font-semibold uppercase tracking-wide text-onPrimaryContainer">
                Next appointment
              </Text>
              <Text className="mt-0.5 text-lg font-bold text-onPrimary">{next.doctor}</Text>
              <Text className="text-sm text-onPrimaryContainer">
                {next.specialty} · {next.date} · {next.time}
              </Text>
              <Text className="text-sm text-onPrimaryContainer">{next.location}</Text>
            </View>
          </View>
          <Pressable
            onPress={onOpenAppointments}
            accessibilityRole="button"
            className="mt-4 flex-row items-center justify-center rounded-full bg-surfaceContainerLowest py-2.5"
          >
            <Text className="text-sm font-semibold text-primary">View details</Text>
            <Ionicons name="chevron-forward" size={16} color="#004345" />
          </Pressable>
        </Card>
      </View>

      <SectionTitle title="Health tasks" action={<Badge label="Demo data" tone="neutral" />} />
      <View className="px-5">
        <Card className="p-4">
          {CARE_TASKS.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              done={!!done[task.id]}
              onToggle={() => setDone((prev) => ({ ...prev, [task.id]: !prev[task.id] }))}
            />
          ))}
          <Text className="mt-2 text-xs text-onSurfaceVariant">
            Demo tasks — your real tasks will come from your care plan once the backend is connected.
          </Text>
        </Card>
      </View>

      <SectionTitle
        title="Upcoming visits"
        action={
          <Pressable onPress={onOpenAppointments}>
            <Text className="text-sm font-semibold text-primary">View all</Text>
          </Pressable>
        }
      />
      <View className="gap-3 px-5">
        {demoAppointments.map((appt) => (
          <Card key={appt.id} className="p-4" onPress={onOpenAppointments}>
            <View className="flex-row items-center gap-4">
              <DateBadge date={appt.date} />
              <View className="flex-1">
                <Text className="text-base font-semibold text-onSurface">{appt.doctor}</Text>
                <Text className="mt-0.5 text-sm text-onSurfaceVariant">
                  {appt.specialty} · {appt.time}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#6f7979" />
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
}

function AppointmentsTab({ onOpenAppointments }: { onOpenAppointments: () => void }) {
  return (
    <View>
      <SectionTitle title="Upcoming" action={<Badge label="Demo data" tone="neutral" />} />
      <View className="gap-3 px-5">
        {demoAppointments.map((appt) => (
          <Card key={appt.id} className="p-4" onPress={onOpenAppointments}>
            <View className="flex-row items-center gap-4">
              <DateBadge date={appt.date} />
              <View className="flex-1">
                <Text className="text-base font-semibold text-onSurface">{appt.doctor}</Text>
                <Text className="mt-0.5 text-sm text-onSurfaceVariant">
                  {appt.specialty} · {appt.time}
                </Text>
                <Text className="text-sm text-onSurfaceVariant">{appt.location}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#6f7979" />
            </View>
          </Card>
        ))}
      </View>

      <SectionTitle title="History" />
      <View className="gap-3 px-5">
        {HISTORY.map((visit) => (
          <Card key={visit.id} className="p-4" onPress={onOpenAppointments}>
            <View className="flex-row items-center gap-4">
              <DateBadge date={visit.date} />
              <View className="flex-1">
                <Text className="text-base font-semibold text-onSurface">{visit.doctor}</Text>
                <Text className="mt-0.5 text-sm text-onSurfaceVariant">
                  {visit.specialty} · {visit.time}
                </Text>
                <Text className="text-sm text-onSurfaceVariant">{visit.note}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#6f7979" />
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
}

function TeamTab() {
  return (
    <View>
      <SectionTitle title="Your care team" action={<Badge label="Demo data" tone="neutral" />} />
      <View className="gap-3 px-5">
        {CARE_TEAM.map((member) => (
          <Card key={member.id} className="p-4">
            <View className="flex-row items-center gap-4">
              <View className="h-14 w-14 items-center justify-center rounded-full bg-primaryFixed">
                <Ionicons name="person" size={26} color="#004f51" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-onSurface">{member.name}</Text>
                <Text className="mt-0.5 text-sm text-onSurfaceVariant">
                  {member.role} · {member.place}
                </Text>
              </View>
              <Pressable
                onPress={() =>
                  Alert.alert(
                    'Backend pending',
                    'Calling your care team needs your real contacts, which are not connected yet.',
                  )
                }
                accessibilityRole="button"
                accessibilityLabel={`Call ${member.name}`}
                hitSlop={10}
                className="h-11 w-11 items-center justify-center rounded-full border border-outlineVariant"
              >
                <Ionicons name="call-outline" size={20} color="#004345" />
              </Pressable>
            </View>
          </Card>
        ))}
      </View>
      <Text className="mx-5 mt-3 text-xs text-onSurfaceVariant">
        These are fictional demo contacts — your real care team will appear after onboarding.
      </Text>
    </View>
  );
}

export default function CareScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<CareTab>('overview');

  const openAppointments = () => router.push('/care/appointments');

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader title="Care" showBack={false} />
      <View className="px-5">
        <Tabs options={TAB_OPTIONS} value={tab} onChange={(key) => setTab(key as CareTab)} />
      </View>
      <ScrollView contentContainerClassName="pb-8">
        {tab === 'overview' && <OverviewTab onOpenAppointments={openAppointments} />}
        {tab === 'appointments' && <AppointmentsTab onOpenAppointments={openAppointments} />}
        {tab === 'team' && <TeamTab />}
      </ScrollView>
    </SafeAreaView>
  );
}

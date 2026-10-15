import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../../components/Badge';
import { Card } from '../../../components/Card';
import { PageHeader } from '../../../components/PageHeader';

type IconName = keyof typeof Ionicons.glyphMap;

const PEOPLE: Record<string, string> = { mummy: 'Mummy', daddy: 'Daddy' };

interface Insight {
  icon: IconName;
  title: string;
  body: string;
  tone: 'success' | 'warning' | 'info';
}

/** Fictional demo insights — not medical advice. */
const INSIGHTS: Insight[] = [
  {
    icon: 'trending-down-outline',
    title: 'HbA1c trending in range',
    body: 'Recent HbA1c readings (6.4% → 6.1% over 3 months) suggest good glucose control for this fictional profile.',
    tone: 'success',
  },
  {
    icon: 'medkit-outline',
    title: '1 medicine refill due',
    body: 'A Metformin refill is due soon. A timely refill keeps this fictional medication schedule on track.',
    tone: 'warning',
  },
  {
    icon: 'calendar-outline',
    title: 'Follow-up window approaching',
    body: 'A lab-results follow-up is on the calendar for 12 Oct 2026 in this demo profile.',
    tone: 'info',
  },
];

const toneIconColor: Record<Insight['tone'], string> = {
  success: '#1d6b4f',
  warning: '#7a5a1e',
  info: '#1b607f',
};

export default function HealthSummaryScreen() {
  const { personId } = useLocalSearchParams<{ personId: string }>();
  const name = PEOPLE[personId] ?? 'Family Member';

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader
        title={`${name}'s Health Summary`}
        subtitle="An AI-generated overview of recent health data."
      />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <View className="mb-5 rounded-2xl border border-[#e3c878] bg-[#f5e6c8]/60 p-4">
          <View className="flex-row items-start">
            <Ionicons name="information-circle-outline" size={22} color="#7a5a1e" />
            <View className="ml-3 flex-1">
              <Text className="text-base font-bold text-[#7a5a1e]">
                Demo insights — not medical advice.
              </Text>
              <Text className="mt-1 text-sm text-onSurfaceVariant">
                These insights are generated from fictional demo data for preview only. Always
                consult a qualified doctor for medical guidance.
              </Text>
            </View>
          </View>
        </View>

        <Card className="mb-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-onSurface">Overall Status</Text>
            <Badge label="Stable" tone="success" />
          </View>
          <Text className="mt-2 text-sm text-onSurfaceVariant">
            Based on fictional records from the last 90 days — 12 lab reports, 8 prescriptions
            and 6 active medicines.
          </Text>
          <View className="mt-4 flex-row gap-3">
            <View className="flex-1 items-center rounded-xl bg-surfaceContainer p-3">
              <Text className="text-2xl font-bold text-primary">6.1%</Text>
              <Text className="mt-0.5 text-xs text-onSurfaceVariant">HbA1c (latest)</Text>
            </View>
            <View className="flex-1 items-center rounded-xl bg-surfaceContainer p-3">
              <Text className="text-2xl font-bold text-primary">120/78</Text>
              <Text className="mt-0.5 text-xs text-onSurfaceVariant">BP (avg)</Text>
            </View>
            <View className="flex-1 items-center rounded-xl bg-surfaceContainer p-3">
              <Text className="text-2xl font-bold text-primary">6</Text>
              <Text className="mt-0.5 text-xs text-onSurfaceVariant">Active meds</Text>
            </View>
          </View>
        </Card>

        <Text className="mb-3 px-1 text-lg font-semibold text-onSurface">AI Insights</Text>
        {INSIGHTS.map((insight) => (
          <Card key={insight.title} className="mb-3">
            <View className="flex-row items-start">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-surfaceContainer">
                <Ionicons
                  name={insight.icon}
                  size={22}
                  color={toneIconColor[insight.tone]}
                />
              </View>
              <View className="flex-1">
                <View className="mb-1 flex-row items-center justify-between">
                  <Text className="flex-1 text-base font-semibold text-onSurface">
                    {insight.title}
                  </Text>
                  <Badge label="AI" tone={insight.tone === 'success' ? 'success' : 'info'} />
                </View>
                <Text className="text-sm text-onSurfaceVariant">{insight.body}</Text>
              </View>
            </View>
          </Card>
        ))}

        <Text className="mt-2 text-center text-xs text-onSurfaceVariant">
          Summary generated from fictional demo data on 15 Oct 2026.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

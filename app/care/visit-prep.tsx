import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { SectionTitle } from '../../components/SectionTitle';
import { Toggle } from '../../components/Toggle';
import { demoAppointments, demoDocuments, demoMedicines } from '../../lib/demo-data';

/** Fictional suggested questions — stored locally in this file. */
const SUGGESTED_QUESTIONS: { id: string; text: string }[] = [
  { id: 'q-1', text: 'What is this medicine for, and which side effects should I watch for?' },
  { id: 'q-2', text: 'Should the dose change if I start feeling better?' },
  { id: 'q-3', text: 'Do I need any lab tests before the next visit?' },
  { id: 'q-4', text: 'Are there diet or activity changes that would help my condition?' },
  { id: 'q-5', text: 'Is there anything in my reports you find concerning?' },
];

function QuestionRow({ text, checked, onToggle }: { text: string; checked: boolean; onToggle: () => void }) {
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      className="flex-row items-start gap-3 py-2.5"
    >
      <Ionicons
        name={checked ? 'checkmark-circle' : 'ellipse-outline'}
        size={24}
        color={checked ? '#3e8068' : '#6f7979'}
        style={{ marginTop: 1 }}
      />
      <Text className={`flex-1 text-base text-onSurface ${checked ? 'opacity-60' : ''}`}>{text}</Text>
    </Pressable>
  );
}

export default function VisitPrepScreen() {
  const visit = demoAppointments[0];

  // Review controls: the user explicitly chooses what goes into the share packet.
  const [includeMeds, setIncludeMeds] = useState<Record<string, boolean>>(
    Object.fromEntries(demoMedicines.map((m) => [m.id, true])),
  );
  const [includeDocs, setIncludeDocs] = useState<Record<string, boolean>>(
    Object.fromEntries(demoDocuments.map((d) => [d.docId, true])),
  );
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});

  const selectedQuestions = SUGGESTED_QUESTIONS.filter((q) => checkedQuestions[q.id]);
  const medCount = Object.values(includeMeds).filter(Boolean).length;
  const docCount = Object.values(includeDocs).filter(Boolean).length;

  const share = () =>
    Alert.alert(
      'Scoped sharing pending backend',
      `Review first: ${medCount} medicine(s), ${docCount} report(s)${
        selectedQuestions.length ? `, ${selectedQuestions.length} question(s)` : ''
      } selected for Dr. ${visit.doctor.replace('Dr. ', '')} — doctors never get automatic full access.`,
    );

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader
        title="Doctor Visit Prep"
        subtitle={`For your visit: ${visit.doctor} · ${visit.date} · ${visit.time}`}
      />
      <ScrollView contentContainerClassName="pb-8">
        <View className="px-5">
          <Card className="border-0 bg-primaryFixed p-4">
            <View className="flex-row items-start gap-3">
              <Ionicons name="shield-checkmark-outline" size={24} color="#004f51" />
              <View className="flex-1">
                <Text className="text-base font-semibold text-onPrimaryFixed">
                  Review before you share
                </Text>
                <Text className="mt-1 text-sm text-onPrimaryFixedVariant">
                  Nothing is sent to a doctor automatically. You pick every item below — doctors never
                  get full access to your health data.
                </Text>
              </View>
            </View>
          </Card>
        </View>

        <SectionTitle title="Current medicines" action={<Badge label="Demo data" tone="neutral" />} />
        <View className="px-5">
          <Card className="p-4">
            {demoMedicines.map((med) => (
              <Toggle
                key={med.id}
                label={`${med.name} · ${med.strength}`}
                description={med.schedule}
                value={includeMeds[med.id] ?? false}
                onChange={(v) => setIncludeMeds((prev) => ({ ...prev, [med.id]: v }))}
              />
            ))}
          </Card>
        </View>

        <SectionTitle title="Recent reports" />
        <View className="px-5">
          <Card className="p-4">
            {demoDocuments.map((doc) => (
              <Toggle
                key={doc.docId}
                label={doc.title}
                description={`${doc.date} · ${doc.source}`}
                value={includeDocs[doc.docId] ?? false}
                onChange={(v) => setIncludeDocs((prev) => ({ ...prev, [doc.docId]: v }))}
              />
            ))}
          </Card>
        </View>

        <SectionTitle title="Lab trends" />
        <View className="px-5">
          <Card className="p-4">
            <View className="flex-row items-start gap-3">
              <Ionicons name="trending-up-outline" size={22} color="#6f7979" />
              <View className="flex-1">
                <Text className="text-base font-semibold text-onSurface">Insufficient data</Text>
                <Text className="mt-1 text-sm text-onSurfaceVariant">
                  Trends appear once you have 2 or more lab reports for the same test. We never guess
                  or fabricate values.
                </Text>
              </View>
            </View>
          </Card>
        </View>

        <SectionTitle
          title="Questions for your doctor"
          action={
            selectedQuestions.length > 0 ? (
              <Badge label={`${selectedQuestions.length} selected`} tone="primary" />
            ) : undefined
          }
        />
        <View className="px-5">
          <Card className="p-4">
            {SUGGESTED_QUESTIONS.map((q) => (
              <QuestionRow
                key={q.id}
                text={q.text}
                checked={!!checkedQuestions[q.id]}
                onToggle={() =>
                  setCheckedQuestions((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                }
              />
            ))}
          </Card>
        </View>

        <View className="mt-6 px-5">
          <Button title="Share with doctor" onPress={share} />
          <Text className="mt-3 text-center text-xs text-onSurfaceVariant">
            Scoped, item-by-item sharing is pending backend — your selections above are reviewed first.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

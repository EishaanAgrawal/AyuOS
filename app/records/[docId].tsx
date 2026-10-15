import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/PageHeader';
import { SectionTitle } from '../../components/SectionTitle';
import { DemoDocument, demoDocuments } from '../../lib/demo-data';
import { DOC_AREA_TAGS, HEALTH_AREAS } from '../explorer';

const CATEGORY_TONES: Record<DemoDocument['category'], 'info' | 'primary' | 'neutral'> = {
  'Lab Report': 'info',
  Prescription: 'primary',
  'Discharge Summary': 'neutral',
};

export default function DocumentDetailScreen() {
  const router = useRouter();
  const { docId } = useLocalSearchParams<{ docId: string }>();

  const doc = demoDocuments.find((d) => d.docId === docId);

  if (!doc) {
    return (
      <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
        <PageHeader title="Document" />
        <EmptyState
          title="Document not found"
          message="This record does not exist in the demo set."
          icon="document-text-outline"
        />
      </SafeAreaView>
    );
  }

  /**
   * "Extracted" fields — shown strictly from the fictional demo fixture.
   * No medical values are invented beyond what the fixture carries.
   */
  const extractedFields: { label: string; value: string }[] = [
    { label: 'Document ID', value: doc.docId },
    { label: 'Category', value: doc.category },
    { label: 'Date', value: doc.date },
    { label: 'Source', value: doc.source },
    { label: 'Verification', value: doc.verified ? 'Verified' : 'Not verified' },
  ];

  const linkedAreaSlug = DOC_AREA_TAGS[doc.docId];
  const linkedArea = linkedAreaSlug
    ? HEALTH_AREAS.find((a) => a.slug === linkedAreaSlug)
    : undefined;

  const showSourcePending = () => {
    Alert.alert(
      'Source document pending',
      'The original file preview is not available yet — document storage connects with the backend.',
      [{ text: 'OK', style: 'default' }],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader title="Document" />
      <ScrollView contentContainerClassName="px-5 pb-8">
        {/* ---- Document header card ---- */}
        <Card className="p-5">
          <View className="mb-3 flex-row items-center justify-between">
            <Badge label={doc.category} tone={CATEGORY_TONES[doc.category]} />
            <Badge
              label={doc.verified ? 'Verified' : 'Unverified'}
              tone={doc.verified ? 'success' : 'warning'}
            />
          </View>
          <Text className="text-xl font-semibold text-onSurface">{doc.title}</Text>
          <View className="mt-3 gap-1.5">
            <View className="flex-row items-center gap-2">
              <Ionicons name="calendar-outline" size={16} color="#6f7979" />
              <Text className="text-sm text-onSurfaceVariant">{doc.date}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Ionicons name="business-outline" size={16} color="#6f7979" />
              <Text className="text-sm text-onSurfaceVariant">{doc.source}</Text>
            </View>
          </View>
          {linkedArea ? (
            <Pressable
              onPress={() => router.push(`/explorer/${linkedArea.slug}`)}
              accessibilityRole="button"
              className="mt-4 flex-row items-center justify-between rounded-2xl bg-surfaceContainerLow p-3 active:bg-surfaceContainer"
            >
              <View className="flex-row items-center gap-3">
                <View className="h-9 w-9 items-center justify-center rounded-xl bg-secondaryFixed">
                  <Ionicons name={linkedArea.icon} size={18} color="#004c69" />
                </View>
                <View>
                  <Text className="text-xs font-semibold uppercase tracking-wide text-onSurfaceVariant">
                    Linked health area
                  </Text>
                  <Text className="text-sm font-semibold text-onSurface">{linkedArea.name}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#6f7979" />
            </Pressable>
          ) : null}
        </Card>

        {/* ---- Extracted fields (fictional demo) ---- */}
        <SectionTitle title="Extracted fields" />
        <Card className="px-5 py-2">
          {extractedFields.map((field, index) => (
            <View
              key={field.label}
              className={`flex-row items-center justify-between py-3 ${
                index < extractedFields.length - 1 ? 'border-b border-outlineVariant' : ''
              }`}
            >
              <Text className="text-sm text-onSurfaceVariant">{field.label}</Text>
              <Text className="text-sm font-semibold text-onSurface">{field.value}</Text>
            </View>
          ))}
        </Card>
        <Text className="mt-2 px-1 text-xs italic text-onSurfaceVariant">
          Fictional demo values from the demo fixture — real AI extraction runs after upload
          connects.
        </Text>

        {/* ---- Source document ---- */}
        <View className="mt-6">
          <Button title="View source document" onPress={showSourcePending} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

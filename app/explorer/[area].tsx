import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/PageHeader';
import { SectionTitle } from '../../components/SectionTitle';
import { demoDocuments } from '../../lib/demo-data';
import { DOC_AREA_TAGS, HEALTH_AREAS } from '../explorer';

export default function HealthAreaScreen() {
  const router = useRouter();
  const { area } = useLocalSearchParams<{ area: string }>();

  const healthArea = useMemo(
    () => HEALTH_AREAS.find((a) => a.slug === area),
    [area],
  );

  /** Fictional fixtures tagged to this area — empty for almost every area. */
  const linkedRecords = useMemo(() => {
    if (!healthArea) return [];
    return demoDocuments.filter((doc) => DOC_AREA_TAGS[doc.docId] === healthArea.slug);
  }, [healthArea]);

  if (!healthArea) {
    return (
      <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
        <PageHeader title="Health Explorer" />
        <EmptyState
          title="Area not found"
          message="This health area does not exist."
          icon="compass-outline"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader title={healthArea.name} subtitle={healthArea.blurb} />
      <ScrollView contentContainerClassName="px-5 pb-8">
        {/* ---- Area header ---- */}
        <Card className="flex-row items-center p-5">
          <View className="mr-4 h-14 w-14 items-center justify-center rounded-2xl bg-secondaryFixed">
            <Ionicons name={healthArea.icon} size={28} color="#004c69" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-semibold text-onSurface">{healthArea.name}</Text>
            <Text className="text-sm text-onSurfaceVariant">
              {linkedRecords.length === 0
                ? 'No records linked yet'
                : `${linkedRecords.length} fictional demo record${linkedRecords.length === 1 ? '' : 's'} linked`}
            </Text>
          </View>
        </Card>

        {/* ---- Linked records ---- */}
        <SectionTitle title="Linked records" />
        {linkedRecords.length === 0 ? (
          <Card className="p-0">
            <EmptyState
              title="No records in this area yet"
              message="Fictional demo records linked to this area will appear here once the backend connects."
              icon="folder-open-outline"
              actionTitle="Upload record"
              onAction={() => router.push('/upload')}
            />
          </Card>
        ) : (
          <Card className="px-4 py-1">
            {linkedRecords.map((doc, index) => (
              <View
                key={doc.docId}
                className={
                  index < linkedRecords.length - 1 ? 'border-b border-outlineVariant' : ''
                }
              >
                <Pressable
                  onPress={() => router.push(`/records/${doc.docId}`)}
                  accessibilityRole="button"
                  className="flex-row items-center gap-3 py-3 active:opacity-70"
                >
                  <View className="h-11 w-11 items-center justify-center rounded-xl bg-secondaryFixed">
                    <Ionicons name="document-text" size={22} color="#004c69" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-onSurface" numberOfLines={1}>
                      {doc.title}
                    </Text>
                    <Text className="text-sm text-onSurfaceVariant" numberOfLines={1}>
                      {doc.category} · {doc.date}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#6f7979" />
                </Pressable>
              </View>
            ))}
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

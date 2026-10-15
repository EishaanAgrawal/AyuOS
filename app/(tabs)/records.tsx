import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/PageHeader';
import { SectionTitle } from '../../components/SectionTitle';
import { Tabs } from '../../components/Tabs';
import { TextInput } from '../../components/TextInput';
import { DemoDocument, demoDocuments, demoUser } from '../../lib/demo-data';
import { HEALTH_AREAS } from '../explorer';

type RecordsTab = 'overview' | 'documents' | 'lab' | 'imaging';

const TAB_OPTIONS: { key: RecordsTab; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'documents', label: 'Documents' },
  { key: 'lab', label: 'Lab Results' },
  { key: 'imaging', label: 'Imaging' },
];

const CATEGORY_CHIPS: ('All' | DemoDocument['category'])[] = [
  'All',
  'Lab Report',
  'Prescription',
  'Discharge Summary',
];

const CATEGORY_ICONS: Record<DemoDocument['category'], keyof typeof Ionicons.glyphMap> = {
  'Lab Report': 'flask',
  Prescription: 'receipt',
  'Discharge Summary': 'document-text',
};

/**
 * Health Summary tiles. Blood Group comes from the demo fixture
 * (demoUser.bloodType); the other five categories have no fixture data, so
 * they honestly render "None added" instead of invented values.
 */
const SUMMARY_TILES: {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
}[] = [
  { key: 'blood', label: 'BLOOD GROUP', icon: 'water', value: demoUser.bloodType },
  { key: 'allergies', label: 'ALLERGIES', icon: 'shield', value: 'None added' },
  { key: 'conditions', label: 'CONDITIONS', icon: 'pulse', value: 'None added' },
  { key: 'surgeries', label: 'SURGERIES', icon: 'cut', value: 'None added' },
  { key: 'immunizations', label: 'IMMUNIZATIONS', icon: 'medkit', value: 'None added' },
  { key: 'family', label: 'FAMILY HISTORY', icon: 'people', value: 'None added' },
];

/** Health areas previewed on the Overview tab (matches the design reference). */
const PREVIEW_AREA_SLUGS = ['cardiology', 'pulmonology', 'nephrology', 'neurology'];

const MONTH_INDEX: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

/** Parses fixture dates like "12 Oct 2026" for chronological ordering. */
function parseDemoDate(date: string): number {
  const [day, mon, year] = date.split(' ');
  return new Date(Number(year), MONTH_INDEX[mon] ?? 0, Number(day)).getTime();
}

function ViewAll({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="flex-row items-center py-1"
      hitSlop={8}
    >
      <Text className="text-sm font-semibold text-primary">View all</Text>
      <Ionicons name="chevron-forward" size={16} color="#004345" />
    </Pressable>
  );
}

function DocumentRow({ doc, onPress }: { doc: DemoDocument; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${doc.title}, ${doc.date}`}
      className="flex-row items-center gap-3 py-3 active:opacity-70"
    >
      <View className="h-11 w-11 items-center justify-center rounded-xl bg-secondaryFixed">
        <Ionicons name={CATEGORY_ICONS[doc.category]} size={22} color="#004c69" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-onSurface" numberOfLines={1}>
          {doc.title}
        </Text>
        <Text className="text-sm text-onSurfaceVariant" numberOfLines={1}>
          {doc.category} · {doc.source}
        </Text>
      </View>
      <Text className="text-xs text-onSurfaceVariant">{doc.date}</Text>
      <Ionicons name="chevron-forward" size={18} color="#6f7979" />
    </Pressable>
  );
}

export default function RecordsScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<RecordsTab>('overview');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORY_CHIPS)[number]>('All');

  const goToDocument = (docId: string) => router.push(`/records/${docId}`);

  const filteredDocuments = useMemo(() => {
    const q = query.trim().toLowerCase();
    return demoDocuments.filter((doc) => {
      const matchesCategory = category === 'All' || doc.category === category;
      const matchesQuery =
        q === '' ||
        `${doc.title} ${doc.source} ${doc.category}`.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const labDocuments = useMemo(
    () => demoDocuments.filter((doc) => doc.category === 'Lab Report'),
    [],
  );

  const timeline = useMemo(
    () => [...demoDocuments].sort((a, b) => parseDemoDate(b.date) - parseDemoDate(a.date)),
    [],
  );

  const previewAreas = useMemo(
    () =>
      PREVIEW_AREA_SLUGS.map((slug) => HEALTH_AREAS.find((a) => a.slug === slug)).filter(
        (a): a is (typeof HEALTH_AREAS)[number] => Boolean(a),
      ),
    [],
  );

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader title="Records" showBack={false} />
      <View className="px-5 pb-4">
        <Tabs
          options={TAB_OPTIONS}
          value={tab}
          onChange={(key) => setTab(key as RecordsTab)}
        />
      </View>

      {tab === 'overview' && (
        <ScrollView contentContainerClassName="pb-8">
          {/* ---- Health Summary ---- */}
          <SectionTitle title="Health Summary" />
          <View className="px-5">
            <Card className="p-3">
              <View className="flex-row flex-wrap">
                {SUMMARY_TILES.map((tile) => (
                  <View key={tile.key} className="w-1/2 p-1">
                    <View className="items-center rounded-2xl bg-surfaceContainerLow px-2 py-4">
                      <View className="mb-2 h-10 w-10 items-center justify-center rounded-xl bg-surfaceContainerLowest">
                        <Ionicons name={tile.icon} size={20} color="#004345" />
                      </View>
                      <Text className="text-center text-[11px] font-semibold tracking-wide text-onSurfaceVariant">
                        {tile.label}
                      </Text>
                      <Text
                        className={`mt-0.5 text-base ${
                          tile.value === 'None added'
                            ? 'text-onSurfaceVariant'
                            : 'font-semibold text-onSurface'
                        }`}
                      >
                        {tile.value}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </Card>
          </View>

          {/* ---- Recent Documents ---- */}
          <SectionTitle
            title="Recent Documents"
            action={<ViewAll onPress={() => setTab('documents')} />}
          />
          <View className="px-5">
            <Card className="px-4 py-1">
              {demoDocuments.map((doc, index) => (
                <View
                  key={doc.docId}
                  className={index < demoDocuments.length - 1 ? 'border-b border-outlineVariant' : ''}
                >
                  <DocumentRow doc={doc} onPress={() => goToDocument(doc.docId)} />
                </View>
              ))}
            </Card>
          </View>

          {/* ---- Health Areas ---- */}
          <SectionTitle
            title="Health Areas"
            action={<ViewAll onPress={() => router.push('/explorer')} />}
          />
          <View className="px-5">
            <View className="flex-row flex-wrap justify-between">
              {previewAreas.map((area) => (
                <Pressable
                  key={area.slug}
                  onPress={() => router.push(`/explorer/${area.slug}`)}
                  accessibilityRole="button"
                  className="mb-3 w-[48%] items-center rounded-2xl border border-outlineVariant bg-surfaceContainerLowest p-4 active:bg-surfaceContainerLow"
                >
                  <View className="mb-2 h-11 w-11 items-center justify-center rounded-full bg-secondaryFixed">
                    <Ionicons name={area.icon} size={22} color="#004c69" />
                  </View>
                  <Text className="text-sm font-semibold text-onSurface">{area.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* ---- Health Timeline (fictional demo events) ---- */}
          <SectionTitle title="Health Timeline" />
          <View className="px-5">
            <Card className="p-4">
              {timeline.map((doc, index) => (
                <View key={doc.docId} className="flex-row">
                  <View className="items-center">
                    <View className="h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-surfaceContainerLowest">
                      <View className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </View>
                    {index < timeline.length - 1 && (
                      <View className="w-0.5 flex-1 bg-outlineVariant" />
                    )}
                  </View>
                  <Pressable
                    onPress={() => goToDocument(doc.docId)}
                    accessibilityRole="button"
                    className="flex-1 pb-5 pl-3 active:opacity-70"
                  >
                    <Text className="text-xs text-onSurfaceVariant">{doc.date}</Text>
                    <Text className="text-base font-semibold text-onSurface">
                      {doc.title} added
                    </Text>
                    <Text className="text-sm text-onSurfaceVariant">
                      {doc.category} · {doc.source}
                    </Text>
                  </Pressable>
                </View>
              ))}
              <Text className="pt-1 text-xs italic text-onSurfaceVariant">
                Fictional demo events — your real timeline appears once records connect.
              </Text>
            </Card>
          </View>
        </ScrollView>
      )}

      {tab === 'documents' && (
        <ScrollView contentContainerClassName="px-5 pb-8">
          <TextInput
            placeholder="Search reports, prescriptions…"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2 pb-4"
          >
            {CATEGORY_CHIPS.map((chip) => {
              const active = chip === category;
              return (
                <Pressable
                  key={chip}
                  onPress={() => setCategory(chip)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  className={`rounded-full px-4 py-2 ${
                    active ? 'bg-primary' : 'bg-surfaceContainer'
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      active ? 'text-onPrimary' : 'text-onSurfaceVariant'
                    }`}
                  >
                    {chip}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
          {filteredDocuments.length === 0 ? (
            <Card className="p-0">
              <EmptyState
                message={
                  query.trim() === '' && category === 'All'
                    ? 'No documents added yet.'
                    : 'No documents match your search.'
                }
                icon="document-text-outline"
              />
            </Card>
          ) : (
            <Card className="px-4 py-1">
              {filteredDocuments.map((doc, index) => (
                <View
                  key={doc.docId}
                  className={
                    index < filteredDocuments.length - 1 ? 'border-b border-outlineVariant' : ''
                  }
                >
                  <DocumentRow doc={doc} onPress={() => goToDocument(doc.docId)} />
                </View>
              ))}
            </Card>
          )}
        </ScrollView>
      )}

      {tab === 'lab' && (
        <ScrollView contentContainerClassName="px-5 pb-8">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-onSurfaceVariant">
            {labDocuments.length} fictional demo lab report{labDocuments.length === 1 ? '' : 's'}
          </Text>
          {labDocuments.length === 0 ? (
            <Card className="p-0">
              <EmptyState
                message="No lab reports have been added yet."
                icon="flask-outline"
              />
            </Card>
          ) : (
            <Card className="px-4 py-1">
              {labDocuments.map((doc, index) => (
                <View
                  key={doc.docId}
                  className={
                    index < labDocuments.length - 1 ? 'border-b border-outlineVariant' : ''
                  }
                >
                  <DocumentRow doc={doc} onPress={() => goToDocument(doc.docId)} />
                </View>
              ))}
            </Card>
          )}
        </ScrollView>
      )}

      {tab === 'imaging' && (
        <ScrollView contentContainerClassName="px-5 pb-8">
          <Card className="p-0">
            <EmptyState
              message="No imaging records have been added yet."
              icon="images-outline"
            />
          </Card>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

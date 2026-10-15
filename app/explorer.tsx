import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { TextInput } from '../components/TextInput';

export interface HealthArea {
  slug: string;
  name: string;
  /** Short, generic description of the specialty — not user data. */
  blurb: string;
  icon: keyof typeof Ionicons.glyphMap;
}

/**
 * Directory of the 35 health areas. Icons and blurbs are generic specialty
 * labels; they carry no user information.
 */
export const HEALTH_AREAS: HealthArea[] = [
  { slug: 'cardiology', name: 'Cardiology', blurb: 'Heart & blood vessels', icon: 'heart' },
  { slug: 'neurology', name: 'Neurology', blurb: 'Brain, spine & nerves', icon: 'git-network' },
  { slug: 'nephrology', name: 'Nephrology', blurb: 'Kidneys', icon: 'water' },
  { slug: 'pulmonology', name: 'Pulmonology', blurb: 'Lungs & breathing', icon: 'cloud' },
  { slug: 'hepatology', name: 'Hepatology', blurb: 'Liver & bile ducts', icon: 'flask' },
  { slug: 'gastroenterology', name: 'Gastroenterology', blurb: 'Digestive system', icon: 'restaurant' },
  { slug: 'endocrinology', name: 'Endocrinology', blurb: 'Hormones & glands', icon: 'leaf' },
  { slug: 'hematology', name: 'Hematology', blurb: 'Blood disorders', icon: 'eyedrop' },
  { slug: 'urology', name: 'Urology', blurb: 'Urinary tract', icon: 'funnel' },
  { slug: 'orthopedics', name: 'Orthopedics', blurb: 'Bones & joints', icon: 'walk' },
  { slug: 'ophthalmology', name: 'Ophthalmology', blurb: 'Eyes & vision', icon: 'eye' },
  { slug: 'ent', name: 'ENT', blurb: 'Ear, nose & throat', icon: 'headset' },
  { slug: 'dermatology', name: 'Dermatology', blurb: 'Skin, hair & nails', icon: 'sunny' },
  { slug: 'dentistry', name: 'Dentistry', blurb: 'Teeth & oral care', icon: 'happy' },
  { slug: 'oncology', name: 'Oncology', blurb: 'Cancer care', icon: 'ribbon' },
  { slug: 'infections', name: 'Infections', blurb: 'Infectious diseases', icon: 'bug' },
  { slug: 'immune-system', name: 'Immune System', blurb: 'Immunity & allergies', icon: 'shield-checkmark' },
  { slug: 'genetics', name: 'Genetics', blurb: 'Inherited conditions', icon: 'git-branch' },
  { slug: 'mental-health', name: 'Mental Health', blurb: 'Mind & wellbeing', icon: 'flower' },
  { slug: 'pain', name: 'Pain', blurb: 'Pain management', icon: 'bandage' },
  { slug: 'older-adults', name: 'Older Adults', blurb: 'Geriatric care', icon: 'accessibility' },
  { slug: 'rehabilitation', name: 'Rehabilitation', blurb: 'Physio & recovery', icon: 'bicycle' },
  { slug: 'children', name: 'Children', blurb: 'Pediatric care', icon: 'people' },
  { slug: 'womens-health', name: "Women's Health", blurb: "Women's health", icon: 'female' },
  { slug: 'mens-health', name: "Men's Health", blurb: "Men's health", icon: 'male' },
  { slug: 'imaging', name: 'Imaging', blurb: 'Scans & radiology', icon: 'images' },
  { slug: 'laboratory-pathology', name: 'Laboratory & Pathology', blurb: 'Lab tests & pathology', icon: 'bar-chart' },
  { slug: 'surgery', name: 'Surgery', blurb: 'Surgical care', icon: 'cut' },
  { slug: 'transplantation', name: 'Transplantation', blurb: 'Organ transplants', icon: 'swap-horizontal' },
  { slug: 'emergency', name: 'Emergency', blurb: 'Emergency care', icon: 'alert-circle' },
  { slug: 'critical-care', name: 'Critical Care', blurb: 'ICU & intensive care', icon: 'pulse' },
  { slug: 'anesthesia', name: 'Anesthesia', blurb: 'Anesthesia & sedation', icon: 'moon' },
  { slug: 'nutrition', name: 'Nutrition', blurb: 'Diet & nutrition', icon: 'nutrition' },
  { slug: 'speech-hearing', name: 'Speech & Hearing', blurb: 'Speech & audiology', icon: 'mic' },
  { slug: 'oral-maxillofacial', name: 'Oral & Maxillofacial', blurb: 'Jaw & facial surgery', icon: 'medical' },
];

/**
 * Maps demo document ids to the health area they clearly belong to, derived
 * strictly from the fixture titles/categories:
 * - doc-1 "Lipid Panel — Annual Health Check" (Lab Report) → laboratory-pathology
 * - doc-2 "Cardiology Prescription" → cardiology
 * doc-3 is left untagged: its fixture does not name an area.
 */
export const DOC_AREA_TAGS: Record<string, string> = {
  'doc-1': 'laboratory-pathology',
  'doc-2': 'cardiology',
};

export default function HealthExplorerScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HEALTH_AREAS;
    return HEALTH_AREAS.filter(
      (area) =>
        area.name.toLowerCase().includes(q) || area.blurb.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader title="Health Explorer" subtitle="Browse your records by health area" />
      <View className="px-5">
        <TextInput
          placeholder="Search health areas…"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>
      <ScrollView contentContainerClassName="px-5 pb-8">
        <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-onSurfaceVariant">
          {filtered.length} of {HEALTH_AREAS.length} areas · fictional demo directory
        </Text>
        {filtered.length === 0 ? (
          <EmptyState
            message={`No health areas match "${query.trim()}".`}
            icon="search-outline"
          />
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {filtered.map((area) => (
              <Pressable
                key={area.slug}
                onPress={() => router.push(`/explorer/${area.slug}`)}
                accessibilityRole="button"
                accessibilityLabel={`${area.name} — ${area.blurb}`}
                className="mb-3 w-[48%] rounded-2xl border border-outlineVariant bg-surfaceContainerLowest p-4 active:bg-surfaceContainerLow"
              >
                <View className="mb-3 h-11 w-11 items-center justify-center rounded-xl bg-secondaryFixed">
                  <Ionicons name={area.icon} size={22} color="#004c69" />
                </View>
                <Text className="text-base font-semibold text-onSurface" numberOfLines={2}>
                  {area.name}
                </Text>
                <Text className="mt-0.5 text-xs text-onSurfaceVariant" numberOfLines={1}>
                  {area.blurb}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

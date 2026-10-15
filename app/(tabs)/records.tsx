import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { TextInput } from '../../components/TextInput';
import { demoDocuments } from '../../lib/demo-data';

export default function RecordsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = demoDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader title="Health Records" showBack={false} />
      <View className="px-5">
        <TextInput
          placeholder="Search reports, prescriptions…"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />
      </View>
      <ScrollView contentContainerClassName="gap-3 px-5 pb-8">
        {filtered.map((doc) => (
          <Card key={doc.docId} className="p-4" onPress={() => router.push(`/records/${doc.docId}`)}>
            <View className="flex-row items-center">
              <View className="mr-3 h-11 w-11 items-center justify-center rounded-xl bg-secondaryFixed">
                <Ionicons name="document-text" size={22} color="#004c69" />
              </View>
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
        <Pressable
          onPress={() => router.push('/upload')}
          className="mt-2 items-center rounded-2xl border-[1.5px] border-dashed border-secondary bg-secondaryFixed/20 p-6"
        >
          <Ionicons name="cloud-upload-outline" size={28} color="#226584" />
          <Text className="mt-2 text-base font-semibold text-secondary">Upload a document</Text>
          <Text className="mt-0.5 text-center text-sm text-onSurfaceVariant">
            Lab reports, prescriptions, discharge summaries
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

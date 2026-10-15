import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { TextInput } from '../../components/TextInput';

const TOPICS = [
  { title: 'Getting started', body: 'Create your profile, add family members and upload your first report.', icon: 'rocket-outline' },
  { title: 'Adding health records', body: 'Upload lab reports, prescriptions and scans from your phone.', icon: 'cloud-upload-outline' },
  { title: 'Sharing with family', body: 'Grant access to family members and manage what they can see.', icon: 'people-outline' },
  { title: 'Medicine reminders', body: 'Set up dose reminders and track what has been taken.', icon: 'alarm-outline' },
  { title: 'Emergency card', body: 'Keep critical info ready for emergency situations.', icon: 'medical-outline' },
  { title: 'Privacy & data', body: 'How your health data is stored and who can see it.', icon: 'shield-checkmark-outline' },
] as const;

const pendingAlert = () =>
  Alert.alert('Pending', 'Support chat and email are not connected in this demo yet.');

export default function HelpSupportScreen() {
  const [query, setQuery] = useState('');
  const filtered = TOPICS.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.body.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader title="Help & Support" subtitle="Find answers or reach out to us." />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <View className="mb-5">
          <TextInput
            placeholder="Search help topics…"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
        </View>

        <Text className="mb-3 px-1 text-lg font-semibold text-onSurface">Popular topics</Text>
        {filtered.length === 0 ? (
          <Card>
            <View className="items-center py-8">
              <Ionicons name="search-outline" size={32} color="#6f7979" />
              <Text className="mt-3 text-base font-medium text-onSurface">No topics found</Text>
              <Text className="mt-1 text-sm text-onSurfaceVariant">
                Try a different search term.
              </Text>
            </View>
          </Card>
        ) : (
          filtered.map((topic) => (
            <Pressable
              key={topic.title}
              onPress={pendingAlert}
              accessibilityRole="button"
              className="mb-3"
            >
              <Card>
                <View className="flex-row items-center">
                  <View className="mr-4 h-11 w-11 items-center justify-center rounded-full bg-surfaceContainer">
                    <Ionicons
                      name={topic.icon as keyof typeof Ionicons.glyphMap}
                      size={22}
                      color="#004345"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-onSurface">{topic.title}</Text>
                    <Text className="mt-0.5 text-sm text-onSurfaceVariant" numberOfLines={2}>
                      {topic.body}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#6f7979" />
                </View>
              </Card>
            </Pressable>
          ))
        )}

        <Text className="mb-3 mt-6 px-1 text-lg font-semibold text-onSurface">Contact us</Text>
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Pressable
              onPress={pendingAlert}
              accessibilityRole="button"
              className="items-center rounded-2xl border border-outlineVariant bg-surfaceContainerLowest p-5"
            >
              <Ionicons name="chatbubble-ellipses-outline" size={28} color="#004345" />
              <Text className="mt-2 text-base font-semibold text-onSurface">Chat</Text>
              <Text className="mt-0.5 text-xs text-onSurfaceVariant">Mon–Sat, 9–6</Text>
            </Pressable>
          </View>
          <View className="flex-1">
            <Pressable
              onPress={pendingAlert}
              accessibilityRole="button"
              className="items-center rounded-2xl border border-outlineVariant bg-surfaceContainerLowest p-5"
            >
              <Ionicons name="mail-outline" size={28} color="#004345" />
              <Text className="mt-2 text-base font-semibold text-onSurface">Email</Text>
              <Text className="mt-0.5 text-xs text-onSurfaceVariant">Replies in 24h</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';

type IconName = keyof typeof Ionicons.glyphMap;

/** Fictional demo emergency info — not real. Never dials real numbers. */
const CONTACTS = [
  { name: 'Mummy', relation: 'Mother' },
  { name: 'Daddy', relation: 'Father' },
  { name: 'Uncle', relation: 'Emergency' },
];

const demoContactAlert = (name: string, action: 'call' | 'message') =>
  Alert.alert(
    'Demo contact',
    `This is a fictional demo contact. ${action === 'call' ? 'Calling' : 'Messaging'} ${name} is not available in this demo.`,
  );

function InfoRow({ icon, label, value, valueColor = '#181c1c' }: { icon: IconName; label: string; value: string; valueColor?: string }) {
  return (
    <View className="flex-row items-center py-3.5">
      <View className="mr-4 h-11 w-11 items-center justify-center rounded-full bg-errorContainer/50">
        <Ionicons name={icon} size={22} color="#ba1a1a" />
      </View>
      <View className="flex-1">
        <Text className="text-sm text-onSurfaceVariant">{label}</Text>
        <Text className="mt-0.5 text-base font-semibold" style={{ color: valueColor }} numberOfLines={2}>
          {value}
        </Text>
      </View>
    </View>
  );
}

export default function EmergencyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader
        title="Emergency"
        subtitle="Manage your emergency health information."
      />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <Card className="mb-5">
          <Text className="mb-1 text-lg font-semibold text-onSurface">Critical Information</Text>
          <InfoRow icon="water-outline" label="Blood Group" value="O+" valueColor="#ba1a1a" />
          <View className="border-b border-outlineVariant/60" />
          <InfoRow icon="alert-circle-outline" label="Allergies" value="Penicillin, Pollen" valueColor="#ba1a1a" />
          <View className="border-b border-outlineVariant/60" />
          <InfoRow icon="heart-outline" label="Critical Conditions" value="Type 2 Diabetes" valueColor="#ba1a1a" />
        </Card>

        <View className="mb-3 px-1">
          <Text className="text-lg font-semibold text-onSurface">Emergency Contacts</Text>
        </View>

        <Card className="mb-5">
          {CONTACTS.map((contact, index) => (
            <View
              key={contact.name}
              className={`flex-row items-center py-3.5 ${
                index < CONTACTS.length - 1 ? 'border-b border-outlineVariant/60' : ''
              }`}
            >
              <View className="mr-4 h-11 w-11 items-center justify-center rounded-full bg-surfaceContainer">
                <Ionicons name="person-outline" size={22} color="#004345" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-onSurface">
                  {contact.name}{' '}
                  <Text className="font-normal text-onSurfaceVariant">({contact.relation})</Text>
                </Text>
                <Text className="text-sm text-onSurfaceVariant">Demo contact — no real number</Text>
              </View>
              <Pressable
                onPress={() => demoContactAlert(contact.name, 'call')}
                accessibilityRole="button"
                accessibilityLabel={`Call ${contact.name} (demo)`}
                className="mr-2 flex-row items-center rounded-full bg-tertiaryFixed/40 px-3.5 py-2"
              >
                <Ionicons name="call-outline" size={16} color="#004345" />
                <Text className="ml-1.5 text-sm font-semibold text-onTertiaryFixedVariant">Call</Text>
              </Pressable>
              <Pressable
                onPress={() => demoContactAlert(contact.name, 'message')}
                accessibilityRole="button"
                accessibilityLabel={`Message ${contact.name} (demo)`}
                className="flex-row items-center rounded-full bg-surfaceContainer px-3.5 py-2"
              >
                <Ionicons name="chatbubble-outline" size={16} color="#004345" />
                <Text className="ml-1.5 text-sm font-semibold text-onSurface">Message</Text>
              </Pressable>
            </View>
          ))}
        </Card>

        <Button
          title="View Emergency Health Card"
          onPress={() => router.push('/emergency/card' as never)}
        />

        <View className="mt-5 rounded-2xl border border-[#bcd9db] bg-primaryFixed/20 p-4">
          <View className="flex-row items-start">
            <Ionicons name="information-circle-outline" size={22} color="#004345" />
            <Text className="ml-3 flex-1 text-sm text-onSurfaceVariant">
              Emergency info only — does not contact emergency services. In a real emergency,
              call your local emergency number.
            </Text>
          </View>
        </View>

        <Text className="mt-4 text-center text-xs text-onSurfaceVariant">
          All details shown are fictional demo data.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

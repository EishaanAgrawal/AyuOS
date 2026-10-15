import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/Button';
import { PageHeader } from '../../components/PageHeader';
import { demoUser } from '../../lib/demo-data';

/** Fictional demo data — not real medical information. */
const CRITICAL_TILES = [
  { icon: 'water-outline' as const, label: 'Blood Group', value: 'O+' },
  { icon: 'alert-circle-outline' as const, label: 'Allergies', value: 'Penicillin, Pollen' },
  { icon: 'heart-outline' as const, label: 'Critical Conditions', value: 'Type 2 Diabetes' },
  { icon: 'medkit-outline' as const, label: 'Important Medicines', value: 'Metformin 500mg' },
];

const CONTACTS = [
  { name: 'Mummy', relation: 'Mother' },
  { name: 'Daddy', relation: 'Father' },
  { name: 'Uncle', relation: 'Emergency' },
];

function CriticalTile({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return (
    <View className="w-[48%] rounded-2xl border border-outlineVariant/70 bg-surfaceContainerLowest p-4">
      <View className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-errorContainer/50">
        <Ionicons name={icon} size={20} color="#ba1a1a" />
      </View>
      <Text className="text-sm text-onSurfaceVariant" numberOfLines={1}>{label}</Text>
      <Text className="mt-0.5 text-base font-bold text-error" numberOfLines={1}>{value}</Text>
    </View>
  );
}

export default function EmergencyCardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader
        title="Emergency Health Card"
        subtitle="Essential medical information for emergency situations."
      />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <View className="overflow-hidden rounded-3xl border border-error/25 bg-surfaceContainerLowest">
          <View className="bg-errorContainer/60 px-5 py-4">
            <View className="flex-row items-center">
              <Ionicons name="medical" size={30} color="#ba1a1a" />
              <View className="ml-3">
                <Text className="text-lg font-extrabold tracking-wide text-error">
                  EMERGENCY HEALTH CARD
                </Text>
                <Text className="text-sm text-error/80">Critical health information</Text>
              </View>
            </View>
          </View>

          <View className="px-5 py-5">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="mr-4 h-16 w-16 items-center justify-center rounded-full bg-primary">
                  <Text className="text-xl font-bold text-onPrimary">{demoUser.avatarInitials}</Text>
                </View>
                <View>
                  <Text className="text-xl font-bold text-onSurface">{demoUser.name}</Text>
                  <Text className="text-sm text-onSurfaceVariant">25 yrs · Male</Text>
                  <Text className="text-sm text-onSurfaceVariant">DOB: 14 Jan 2001</Text>
                </View>
              </View>
              <View className="items-center">
                <View className="h-24 w-24 items-center justify-center rounded-xl border-2 border-dashed border-outlineVariant bg-surfaceContainer">
                  <Ionicons name="qr-code-outline" size={40} color="#6f7979" />
                </View>
                <Text className="mt-1.5 text-center text-xs text-onSurfaceVariant">
                  QR placeholder{'\n'}(not scannable)
                </Text>
              </View>
            </View>

            <View className="mt-5 flex-row flex-wrap gap-3">
              {CRITICAL_TILES.map((tile) => (
                <CriticalTile key={tile.label} {...tile} />
              ))}
            </View>

            <View className="mt-5 border-t border-outlineVariant/60 pt-4">
              <View className="flex-row items-center py-2">
                <View className="mr-4 h-11 w-11 items-center justify-center rounded-full bg-tertiaryFixed/40">
                  <Ionicons name="person-outline" size={22} color="#004345" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-onSurfaceVariant">Primary Doctor</Text>
                  <Text className="text-base font-semibold text-onSurface">Dr. Sharma</Text>
                </View>
              </View>
              <View className="flex-row items-center py-2">
                <View className="mr-4 h-11 w-11 items-center justify-center rounded-full bg-tertiaryFixed/40">
                  <Ionicons name="business-outline" size={22} color="#004345" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-onSurfaceVariant">Preferred Hospital</Text>
                  <Text className="text-base font-semibold text-onSurface">Sunrise Hospital</Text>
                </View>
              </View>
            </View>

            <View className="mt-4 border-t border-outlineVariant/60 pt-4">
              <View className="mb-2 flex-row items-center">
                <Ionicons name="people-outline" size={20} color="#004345" />
                <Text className="ml-2 text-base font-semibold text-onSurface">Emergency Contacts</Text>
              </View>
              {CONTACTS.map((contact, index) => (
                <View key={contact.name} className="flex-row items-center py-2">
                  <Text className="w-8 text-sm text-onSurfaceVariant">{index + 1}.</Text>
                  <Text className="flex-1 text-base font-semibold text-onSurface">
                    {contact.name}{' '}
                    <Text className="font-normal text-onSurfaceVariant">({contact.relation})</Text>
                  </Text>
                  <Text className="text-sm text-onSurfaceVariant">Demo contact</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="mt-5 rounded-2xl border border-[#bcd9db] bg-primaryFixed/20 p-4">
          <View className="flex-row items-start">
            <Ionicons name="information-circle-outline" size={22} color="#004345" />
            <View className="ml-3 flex-1">
              <Text className="text-base font-semibold text-onSurface">For Emergency Use</Text>
              <Text className="mt-1 text-sm text-onSurfaceVariant">
                This card contains essential medical information. Emergency info only — does
                not contact emergency services. In a real emergency, call your local emergency
                number.
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-5">
          <Button
            title="Share / Save Card"
            onPress={() =>
              Alert.alert(
                'Pending',
                'Card sharing and saving needs the share/export backend. This will be connected later.',
              )
            }
          />
        </View>

        <Text className="mt-4 text-center text-xs text-onSurfaceVariant">
          Card details are fictional demo data.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

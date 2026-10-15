import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { TextInput } from '../../components/TextInput';

/** Fictional demo profile — editable locally only. */
const INITIAL = {
  fullName: 'Eishaan Shah',
  dateOfBirth: '14 Jan 2001',
  gender: 'Male',
  phone: '+91 98765 43210',
  email: 'eishaan.shah@example.com',
  bloodGroup: 'O+',
  address: 'Flat 4B, Green Park, New Delhi',
};

export default function PersonalInformationScreen() {
  const [form, setForm] = useState(INITIAL);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (key: keyof typeof INITIAL) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader
        title="Personal Information"
        right={
          <Pressable
            onPress={() => setEditing((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel={editing ? 'Cancel editing' : 'Edit'}
            className="flex-row items-center rounded-full bg-surfaceContainer px-4 py-2.5"
          >
            <Ionicons name={editing ? 'close-outline' : 'pencil-outline'} size={16} color="#004345" />
            <Text className="ml-1.5 text-sm font-semibold text-primary">
              {editing ? 'Cancel' : 'Edit'}
            </Text>
          </Pressable>
        }
      />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <Card className="mb-5">
          <View className="mb-4 items-center">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-primary">
              <Text className="text-2xl font-bold text-onPrimary">ES</Text>
            </View>
            {editing && (
              <Pressable
                accessibilityRole="button"
                className="mt-2 rounded-full bg-surfaceContainer px-4 py-2"
              >
                <Text className="text-sm font-semibold text-primary">Change photo</Text>
              </Pressable>
            )}
          </View>

          <TextInput label="Full name" value={form.fullName} onChangeText={set('fullName')} editable={editing} />
          <TextInput label="Date of birth" value={form.dateOfBirth} onChangeText={set('dateOfBirth')} editable={editing} />
          <TextInput label="Gender" value={form.gender} onChangeText={set('gender')} editable={editing} />
          <TextInput label="Phone" value={form.phone} onChangeText={set('phone')} keyboardType="phone-pad" editable={editing} />
          <TextInput label="Email" value={form.email} onChangeText={set('email')} keyboardType="email-address" editable={editing} />
          <TextInput label="Blood group" value={form.bloodGroup} onChangeText={set('bloodGroup')} editable={editing} />
          <TextInput label="Address" value={form.address} onChangeText={set('address')} multiline editable={editing} />

          {editing && (
            <Button
              title="Save Changes"
              onPress={() => {
                setEditing(false);
                setSaved(true);
              }}
            />
          )}
          {saved && !editing && (
            <View className="mt-3 flex-row items-center justify-center">
              <Ionicons name="checkmark-circle-outline" size={18} color="#1d6b4f" />
              <Text className="ml-2 text-sm font-medium text-[#1d6b4f]">
                Saved locally (demo) — backend not connected.
              </Text>
            </View>
          )}
        </Card>

        <Text className="text-center text-xs text-onSurfaceVariant">
          Profile details shown are fictional demo data.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

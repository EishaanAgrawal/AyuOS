import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { TextInput } from '../../components/TextInput';

type Step = 'warn' | 'confirm' | 'type' | 'result';

const CONSEQUENCES = [
  'Your profile, health records and family access grants are removed.',
  'Shared family members lose access to data you shared with them.',
  'This action cannot be undone.',
];

export default function DeleteAccountScreen() {
  const [step, setStep] = useState<Step>('warn');
  const [typed, setTyped] = useState('');
  const matches = typed.trim().toUpperCase() === 'DELETE';

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader title="Delete My Account" />

      <ScrollView contentContainerClassName="px-5 pb-10">
        {step === 'warn' && (
          <Card>
            <View className="items-center py-2">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-errorContainer">
                <Ionicons name="warning-outline" size={32} color="#ba1a1a" />
              </View>
              <Text className="text-center text-xl font-bold text-onSurface">
                Delete your AyuOS account?
              </Text>
              <Text className="mt-2 text-center text-sm text-onSurfaceVariant">
                This permanently deletes your account and all associated data.
              </Text>
            </View>
            <View className="mt-4 rounded-2xl bg-errorContainer/40 p-4">
              {CONSEQUENCES.map((item) => (
                <View key={item} className="mb-2 flex-row items-start">
                  <Ionicons name="alert-circle-outline" size={18} color="#ba1a1a" />
                  <Text className="ml-2 flex-1 text-sm text-onSurface">{item}</Text>
                </View>
              ))}
            </View>
            <View className="mt-6">
              <Button title="Continue" variant="danger" onPress={() => setStep('confirm')} />
            </View>
          </Card>
        )}

        {step === 'confirm' && (
          <Card>
            <Text className="text-lg font-semibold text-onSurface">Before you go</Text>
            <Text className="mt-2 text-sm text-onSurfaceVariant">
              Deleting your account removes every health record, family link and preference
              tied to it. There is no recovery afterwards.
            </Text>
            <View className="mt-6">
              <Button title="I Understand, Continue" variant="danger" onPress={() => setStep('type')} />
            </View>
            <View className="mt-3">
              <Button title="Keep My Account" variant="secondary" onPress={() => setStep('warn')} />
            </View>
          </Card>
        )}

        {step === 'type' && (
          <Card>
            <Text className="text-lg font-semibold text-onSurface">Final confirmation</Text>
            <Text className="mt-2 text-sm text-onSurfaceVariant">
              Type <Text className="font-bold text-error">DELETE</Text> below to confirm you want
              to permanently delete your account.
            </Text>
            <View className="mt-4">
              <TextInput
                placeholder="Type DELETE to confirm"
                value={typed}
                onChangeText={setTyped}
                autoCapitalize="characters"
              />
            </View>
            <Button
              title="Delete My Account Permanently"
              variant="danger"
              disabled={!matches}
              onPress={() => setStep('result')}
            />
          </Card>
        )}

        {step === 'result' && (
          <Card>
            <View className="items-center py-4">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-[#f5e6c8]">
                <Ionicons name="time-outline" size={32} color="#7a5a1e" />
              </View>
              <Text className="text-center text-xl font-bold text-onSurface">
                Deletion pending
              </Text>
              <Text className="mt-3 text-center text-sm text-onSurfaceVariant">
                Secure backend deletion is not connected yet, so{' '}
                <Text className="font-semibold text-onSurface">
                  your data was NOT deleted.
                </Text>{' '}
                Nothing was removed from this demo. Your account stays as it is until the
                deletion service is connected.
              </Text>
            </View>
            <View className="mt-4">
              <Button title="Back to Settings" variant="secondary" onPress={() => setStep('warn')} />
            </View>
          </Card>
        )}

        {step !== 'result' && (
          <Text className="mt-4 text-center text-xs text-onSurfaceVariant">
            Demo flow — no real deletion is performed at any step.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

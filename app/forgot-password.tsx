import React, { useState } from 'react';
import { Alert, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
import { PageHeader } from '../components/PageHeader';
import { TextInput } from '../components/TextInput';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    Alert.alert(
      'Backend pending',
      'Password reset is UI-only right now — Supabase is not connected. No email was sent.',
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader
        title="Reset password"
        subtitle="We'll email you a link to choose a new password."
      />
      <ScrollView contentContainerClassName="px-6 pb-8">
        <TextInput
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <Button title="Send reset link" onPress={handleReset} className="mt-2" />
        <Text className="mt-4 text-center text-xs text-onSurfaceVariant">
          Demo build — this button does not send anything yet.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

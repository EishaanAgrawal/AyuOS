import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
import { PageHeader } from '../components/PageHeader';
import { TextInput } from '../components/TextInput';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    Alert.alert(
      'Backend pending',
      'Account creation is UI-only right now — Supabase is not connected. Nothing was sent anywhere.',
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader title="Create account" subtitle="Start your AyuOS health profile" />
      <ScrollView contentContainerClassName="px-6 pb-8">
        <TextInput
          label="Full name"
          placeholder="Your name"
          value={name}
          onChangeText={setName}
          autoComplete="name"
        />
        <TextInput
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <TextInput
          label="Password"
          placeholder="Minimum 8 characters"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="new-password"
          hint="Use a strong, unique password."
        />

        <Button title="Create account" onPress={handleSignup} className="mt-2" />

        <Pressable onPress={() => router.back()} className="mt-6 items-center">
          <Text className="text-sm text-onSurfaceVariant">
            Already have an account? <Text className="font-semibold text-primary">Sign in</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

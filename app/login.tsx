import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import { useDemo } from '../lib/demo';

function backendPending() {
  Alert.alert(
    'Backend pending',
    'Sign-in is UI-only right now — Supabase is not connected. Nothing was sent anywhere.',
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const { exitDemo } = useDemo();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerClassName="flex-1 justify-center px-6">
        <View className="mb-8 items-center">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <Ionicons name="pulse" size={32} color="#ffffff" />
          </View>
          <Text className="text-3xl font-semibold text-onSurface">AyuOS</Text>
          <Text className="mt-1 text-sm text-onSurfaceVariant">
            Your health operating system
          </Text>
        </View>

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
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />

        <Button title="Sign in" onPress={backendPending} className="mt-2" />

        <Pressable
          onPress={() => router.push('/auth/google')}
          className="mt-3 h-12 flex-row items-center justify-center rounded-lg border border-outlineVariant bg-surfaceContainerLowest"
        >
          <Ionicons name="logo-google" size={20} color="#181c1c" />
          <Text className="ml-2 text-base font-semibold text-onSurface">Continue with Google</Text>
        </Pressable>

        <View className="mt-6 flex-row items-center justify-between">
          <Pressable onPress={() => router.push('/forgot-password')}>
            <Text className="text-sm font-semibold text-primary">Forgot password?</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/signup')}>
            <Text className="text-sm font-semibold text-primary">Create account</Text>
          </Pressable>
        </View>

        <Pressable onPress={() => router.replace('/(tabs)/home')} className="mt-8 items-center">
          <Text className="text-sm text-onSurfaceVariant">
            Just looking? <Text className="font-semibold text-primary">Continue in demo mode</Text>
          </Text>
        </Pressable>

        <Pressable onPress={exitDemo} className="mt-4 items-center">
          <Text className="text-xs text-onSurfaceVariant">Having trouble signing in?</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

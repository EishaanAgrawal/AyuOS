import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/Button';
import { PageHeader } from '../../components/PageHeader';

/** Google OAuth entry — UI only until Supabase Auth is wired up. */
export default function GoogleAuthScreen() {
  const router = useRouter();

  const handleGoogle = () => {
    Alert.alert(
      'Backend pending',
      'Google sign-in is UI-only right now — Supabase Auth is not connected. You were not signed in.',
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader title="Continue with Google" />
      <ScrollView contentContainerClassName="flex-1 justify-center px-6">
        <View className="mb-6 items-center">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-surfaceContainer">
            <Ionicons name="logo-google" size={32} color="#181c1c" />
          </View>
        </View>
        <Text className="mb-6 text-center text-sm leading-6 text-onSurfaceVariant">
          Sign in with your Google account to sync your AyuOS health profile across
          devices. This is a demo build — no account is created or linked yet.
        </Text>
        <Button title="Continue with Google" onPress={handleGoogle} />
        <Button
          title="Back to sign in"
          variant="ghost"
          className="mt-2"
          onPress={() => router.back()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

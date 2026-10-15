import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import type { TextInputProps as RNTextInputProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';

type IoniconName = keyof typeof Ionicons.glyphMap;

/** Simple teal leaf shapes used as background decoration (no external images). */
function LeafBackdrop() {
  return (
    <View pointerEvents="none" className="absolute inset-0">
      <View
        className="absolute -left-16 -top-8 h-72 w-48 bg-[#7cc4a8] opacity-50"
        style={{
          borderTopRightRadius: 150,
          borderBottomLeftRadius: 150,
          transform: [{ rotate: '-10deg' }],
        }}
      />
      <View
        className="absolute -right-12 top-24 h-56 w-36 bg-[#90d2d4] opacity-45"
        style={{
          borderTopLeftRadius: 120,
          borderBottomRightRadius: 120,
          transform: [{ rotate: '14deg' }],
        }}
      />
      <View
        className="absolute -bottom-20 -left-20 h-64 w-[130%] bg-[#2e7d74] opacity-25"
        style={{ borderTopLeftRadius: 220, borderTopRightRadius: 140 }}
      />
      <View
        className="absolute -bottom-24 -right-20 h-52 w-[120%] bg-primary opacity-20"
        style={{ borderTopLeftRadius: 160, borderTopRightRadius: 240 }}
      />
    </View>
  );
}

/** Two-petal AyuOS leaf emblem. */
function LeafEmblem({ size = 56 }: { size?: number }) {
  const petalW = size * 0.42;
  return (
    <View
      className="flex-row items-center justify-center"
      style={{ width: size, height: size }}
    >
      <View
        style={{
          width: petalW,
          height: size * 0.88,
          backgroundColor: '#90d2d4',
          borderTopRightRadius: petalW,
          borderBottomLeftRadius: petalW,
          transform: [{ rotate: '-16deg' }],
          marginRight: -size * 0.05,
        }}
      />
      <View
        style={{
          width: petalW,
          height: size * 0.94,
          backgroundColor: '#0f5c5e',
          borderTopLeftRadius: petalW,
          borderBottomRightRadius: petalW,
          transform: [{ rotate: '16deg' }],
        }}
      />
    </View>
  );
}

interface AuthFieldProps extends RNTextInputProps {
  label: string;
  icon: IoniconName;
  error?: string;
}

/** Text field with leading icon and error text. */
function AuthField({ label, icon, error, ...inputProps }: AuthFieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View className="mb-4">
      <Text className="mb-1.5 text-sm font-medium text-onSurface">{label}</Text>
      <View
        className={`min-h-[48px] flex-row items-center rounded-xl border bg-surfaceContainerLowest px-3.5 ${
          error ? 'border-error' : focused ? 'border-primary' : 'border-outlineVariant'
        }`}
      >
        <Ionicons name={icon} size={20} color="#8598a7" />
        <RNTextInput
          {...inputProps}
          onFocus={(e) => {
            setFocused(true);
            inputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            inputProps.onBlur?.(e);
          }}
          placeholderTextColor="#94a3b8"
          className="ml-2.5 flex-1 py-3 text-base text-onSurface"
        />
      </View>
      {error ? (
        <Text className="mt-1.5 pl-1 text-xs text-error">{error}</Text>
      ) : null}
    </View>
  );
}

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState<string | undefined>();

  const handleSend = () => {
    if (!identifier.trim()) {
      setError('Please enter your email or phone number');
      return;
    }
    setError(undefined);
    Alert.alert('Backend pending', 'Supabase not connected yet.');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <View className="relative flex-1">
        <LeafBackdrop />
        <ScrollView
          contentContainerClassName="flex-grow px-5 pb-8 pt-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Back to login"
            hitSlop={10}
            className="mb-2 h-10 w-10 items-center justify-center rounded-full"
          >
            <Ionicons name="chevron-back" size={26} color="#181c1c" />
          </Pressable>

          <View className="mb-5 mt-1 items-center">
            <LeafEmblem size={56} />
            <Text className="mt-2 text-3xl font-bold tracking-tight text-primary">
              AyuOS
            </Text>
          </View>

          <View
            className="rounded-[28px] bg-surfaceContainerLowest p-6"
            style={{
              shadowColor: '#0f5c5e',
              shadowOpacity: 0.1,
              shadowRadius: 28,
              shadowOffset: { width: 0, height: 10 },
              elevation: 6,
            }}
          >
            <Text className="text-[22px] font-bold tracking-tight text-onSurface">
              Reset password
            </Text>
            <Text className="mt-1 text-sm leading-5 text-onSurfaceVariant">
              Enter the email or phone number linked to your account and
              we&apos;ll send you a link to choose a new password.
            </Text>

            <View className="mt-5">
              <AuthField
                label="Email or phone number"
                icon="mail-outline"
                placeholder="Enter your email or phone number"
                value={identifier}
                onChangeText={(t) => {
                  setIdentifier(t);
                  if (error) setError(undefined);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={error}
              />
            </View>

            <Button
              title="Send reset link"
              onPress={handleSend}
              className="mt-2 h-[52px] rounded-2xl"
            />

            <View className="mt-5 flex-row items-center justify-center">
              <Text className="text-xs text-onSurfaceVariant">
                Remember your password?{' '}
              </Text>
              <Pressable onPress={() => router.replace('/login')} hitSlop={8}>
                <Text className="text-xs font-semibold text-primaryContainer">
                  Back to sign in
                </Text>
              </Pressable>
            </View>
          </View>

          <Text className="mt-6 text-center text-[11px] text-onSurfaceVariant">
            End-to-End Encrypted Health Vault • HIPAA &amp; ABDM Compliant
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

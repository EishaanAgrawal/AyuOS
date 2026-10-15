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
      {/* Top-left botanical leaf */}
      <View
        className="absolute -left-16 -top-8 h-72 w-48 bg-[#7cc4a8] opacity-50"
        style={{
          borderTopRightRadius: 150,
          borderBottomLeftRadius: 150,
          transform: [{ rotate: '-10deg' }],
        }}
      />
      <View
        className="absolute -left-8 top-40 h-40 w-24 bg-[#a5d5c1] opacity-40"
        style={{
          borderTopRightRadius: 100,
          borderBottomLeftRadius: 100,
          transform: [{ rotate: '-18deg' }],
        }}
      />
      {/* Top-right botanical leaf */}
      <View
        className="absolute -right-12 top-24 h-56 w-36 bg-[#90d2d4] opacity-45"
        style={{
          borderTopLeftRadius: 120,
          borderBottomRightRadius: 120,
          transform: [{ rotate: '14deg' }],
        }}
      />
      {/* Bottom hill layers */}
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
function LeafEmblem({ size = 64 }: { size?: number }) {
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

function BrandHeader({ tagline }: { tagline: string }) {
  return (
    <View className="items-center">
      <LeafEmblem size={64} />
      <Text className="mt-3 text-4xl font-bold tracking-tight text-primary">
        AyuOS
      </Text>
      <Text className="mt-1 text-center text-lg font-bold leading-6 text-primary">
        {tagline}
      </Text>
      <Text className="mt-1.5 max-w-[300px] text-center text-[13px] leading-5 text-onSurfaceVariant">
        Keep your health records, medicines, care and family health connected in
        one place.
      </Text>
    </View>
  );
}

interface AuthFieldProps extends RNTextInputProps {
  label: string;
  icon: IoniconName;
  error?: string;
  right?: React.ReactNode;
}

/** Text field with leading icon, optional trailing element and error text. */
function AuthField({ label, icon, error, right, ...inputProps }: AuthFieldProps) {
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
        {right}
      </View>
      {error ? (
        <Text className="mt-1.5 pl-1 text-xs text-error">{error}</Text>
      ) : null}
    </View>
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [idError, setIdError] = useState<string | undefined>();
  const [pwError, setPwError] = useState<string | undefined>();

  const handleSignIn = () => {
    let ok = true;
    if (!identifier.trim()) {
      setIdError('Please enter your email or phone number');
      ok = false;
    } else {
      setIdError(undefined);
    }
    if (!password) {
      setPwError('Please enter your password');
      ok = false;
    } else {
      setPwError(undefined);
    }
    if (!ok) return;
    Alert.alert('Backend pending', 'Supabase not connected yet.');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <View className="relative flex-1">
        <LeafBackdrop />
        <ScrollView
          contentContainerClassName="flex-grow px-5 pb-6 pt-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <BrandHeader tagline={'Your lifelong health\noperating system.'} />

          <View
            className="mt-6 rounded-[28px] bg-surfaceContainerLowest px-6 pb-6 pt-7"
            style={{
              shadowColor: '#0f5c5e',
              shadowOpacity: 0.1,
              shadowRadius: 28,
              shadowOffset: { width: 0, height: 10 },
              elevation: 6,
            }}
          >
            <Text className="text-[26px] font-bold tracking-tight text-onSurface">
              Welcome back
            </Text>
            <Text className="mt-1 text-sm text-onSurfaceVariant">
              Sign in to continue to your AyuOS workspace.
            </Text>

            <View className="mt-5">
              <AuthField
                label="Email or phone number"
                icon="mail-outline"
                placeholder="Enter your email or phone number"
                value={identifier}
                onChangeText={(t) => {
                  setIdentifier(t);
                  if (idError) setIdError(undefined);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={idError}
              />
              <AuthField
                label="Password"
                icon="lock-closed-outline"
                placeholder="Enter your password"
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  if (pwError) setPwError(undefined);
                }}
                secureTextEntry={!showPassword}
                autoComplete="password"
                error={pwError}
                right={
                  <Pressable
                    onPress={() => setShowPassword((v) => !v)}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color="#8598a7"
                    />
                  </Pressable>
                }
              />
            </View>

            <Pressable
              onPress={() => router.push('/forgot-password')}
              className="items-end"
              hitSlop={8}
            >
              <Text className="text-[13px] font-semibold text-primaryContainer">
                Forgot password?
              </Text>
            </Pressable>

            <Button
              title="Sign In →"
              onPress={handleSignIn}
              className="mt-3 h-[52px] rounded-2xl"
            />

            <View className="my-4 flex-row items-center">
              <View className="h-px flex-1 bg-outlineVariant" />
              <Text className="mx-3 text-xs font-semibold uppercase tracking-widest text-onSurfaceVariant">
                OR
              </Text>
              <View className="h-px flex-1 bg-outlineVariant" />
            </View>

            <Pressable
              onPress={() => router.push('/auth/google')}
              accessibilityRole="button"
              className="h-[52px] flex-row items-center justify-center rounded-2xl border border-outlineVariant bg-surfaceContainerLowest"
            >
              <Ionicons name="logo-google" size={20} color="#181c1c" />
              <Text className="ml-2.5 text-[15px] font-semibold text-onSurface">
                Continue with Google
              </Text>
            </Pressable>

            <View className="mt-4 flex-row items-center justify-center">
              <Text className="text-[13px] text-onSurfaceVariant">
                Don&apos;t have an account?{' '}
              </Text>
              <Pressable onPress={() => router.push('/signup')} hitSlop={8}>
                <Text className="text-[13px] font-semibold text-primaryContainer">
                  Create account
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

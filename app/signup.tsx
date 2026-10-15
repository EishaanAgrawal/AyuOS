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
import { Modal } from '../components/Modal';

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

function EyeToggle({
  visible,
  onToggle,
  label,
}: {
  visible: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <Pressable
      onPress={onToggle}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Ionicons
        name={visible ? 'eye-outline' : 'eye-off-outline'}
        size={20}
        color="#8598a7"
      />
    </Pressable>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LEGAL_TEXT: Record<'terms' | 'privacy', { title: string; body: string }> = {
  terms: {
    title: 'Terms of Service',
    body: 'By creating an account on AyuOS, you agree to our terms of service regarding secure health record organization, automated medicine reminders, and caregiver access delegation under applicable medical privacy standards.',
  },
  privacy: {
    title: 'Privacy Policy',
    body: 'AyuOS upholds strict privacy standards. Your personal vitals, uploaded prescriptions, and connected clinical data are end-to-end encrypted and exclusively accessible by you and individuals you explicitly authorize. We never sell your personal or family healthcare information to third parties or advertisers.',
  },
};

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [legal, setLegal] = useState<'terms' | 'privacy' | null>(null);

  const [nameErr, setNameErr] = useState<string | undefined>();
  const [emailErr, setEmailErr] = useState<string | undefined>();
  const [pwErr, setPwErr] = useState<string | undefined>();
  const [confirmErr, setConfirmErr] = useState<string | undefined>();
  const [termsErr, setTermsErr] = useState<string | undefined>();

  const handleCreate = () => {
    let ok = true;

    if (!name.trim()) {
      setNameErr('Please enter your full name.');
      ok = false;
    } else setNameErr(undefined);

    if (!email.trim() || !EMAIL_RE.test(email.trim())) {
      setEmailErr('Please enter a valid email address.');
      ok = false;
    } else setEmailErr(undefined);

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    if (password.length < 8 || !hasLetter || !hasNumber || !hasSymbol) {
      setPwErr('Must be at least 8 characters with letters, numbers, and a symbol.');
      ok = false;
    } else setPwErr(undefined);

    if (!confirm || confirm !== password) {
      setConfirmErr('Passwords do not match.');
      ok = false;
    } else setConfirmErr(undefined);

    if (!agreed) {
      setTermsErr('You must agree to the Terms of Service and Privacy Policy.');
      ok = false;
    } else setTermsErr(undefined);

    if (!ok) return;
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
          <View className="mb-2 flex-row items-center justify-between">
            <Pressable
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Back to login"
              hitSlop={10}
              className="h-10 w-10 items-center justify-center rounded-full"
            >
              <Ionicons name="chevron-back" size={26} color="#181c1c" />
            </Pressable>
            <View className="rounded-full border border-outlineVariant bg-surfaceContainerLowest px-2.5 py-1">
              <Text className="text-[11px] font-semibold uppercase tracking-wider text-onSurfaceVariant">
                Security Guaranteed
              </Text>
            </View>
          </View>

          <View className="mb-5 mt-1 items-center">
            <LeafEmblem size={56} />
            <Text className="mt-2 text-3xl font-bold tracking-tight text-primary">
              AyuOS
            </Text>
            <Text className="mt-1 text-[17px] font-semibold text-onSurface">
              Your lifelong health, organized together.
            </Text>
            <Text className="mt-1 max-w-[300px] text-center text-xs leading-5 text-onSurfaceVariant">
              Create your account to manage medicines, records, health reminders
              and more.
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
              Create your account
            </Text>
            <Text className="mt-0.5 text-xs text-onSurfaceVariant">
              Get started with AyuOS in a few simple steps.
            </Text>

            <View className="mt-5">
              <AuthField
                label="Full name"
                icon="person-outline"
                placeholder="Enter your full name"
                value={name}
                onChangeText={(t) => {
                  setName(t);
                  if (nameErr) setNameErr(undefined);
                }}
                autoComplete="name"
                error={nameErr}
              />
              <AuthField
                label="Email address"
                icon="mail-outline"
                placeholder="Enter your email address"
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  if (emailErr) setEmailErr(undefined);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={emailErr}
              />
              <AuthField
                label="Create password"
                icon="lock-closed-outline"
                placeholder="Enter a password"
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  if (pwErr) setPwErr(undefined);
                }}
                secureTextEntry={!showPw}
                autoComplete="new-password"
                error={pwErr}
                right={
                  <EyeToggle
                    visible={showPw}
                    onToggle={() => setShowPw((v) => !v)}
                    label={showPw ? 'Hide password' : 'Show password'}
                  />
                }
              />
              {!pwErr ? (
                <Text className="-mt-2.5 mb-4 text-[11px] leading-4 text-onSurfaceVariant">
                  Use at least 8 characters with a mix of letters, numbers and a
                  symbol.
                </Text>
              ) : null}
              <AuthField
                label="Confirm password"
                icon="lock-closed-outline"
                placeholder="Re-enter your password"
                value={confirm}
                onChangeText={(t) => {
                  setConfirm(t);
                  if (confirmErr) setConfirmErr(undefined);
                }}
                secureTextEntry={!showConfirm}
                autoComplete="new-password"
                error={confirmErr}
                right={
                  <EyeToggle
                    visible={showConfirm}
                    onToggle={() => setShowConfirm((v) => !v)}
                    label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                  />
                }
              />
            </View>

            <Pressable
              onPress={() => {
                setAgreed((v) => !v);
                if (termsErr) setTermsErr(undefined);
              }}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: agreed }}
              className="flex-row items-start"
            >
              <View
                className={`mt-0.5 h-5 w-5 items-center justify-center rounded-md border ${
                  agreed ? 'border-primary bg-primary' : 'border-outlineVariant bg-surfaceContainerLowest'
                }`}
              >
                {agreed ? (
                  <Ionicons name="checkmark" size={14} color="#ffffff" />
                ) : null}
              </View>
              <Text className="ml-2.5 flex-1 text-xs leading-5 text-onSurfaceVariant">
                I agree to the{' '}
                <Text
                  className="font-medium text-primaryContainer"
                  onPress={() => setLegal('terms')}
                >
                  Terms of Service
                </Text>{' '}
                and{' '}
                <Text
                  className="font-medium text-primaryContainer"
                  onPress={() => setLegal('privacy')}
                >
                  Privacy Policy
                </Text>
                .
              </Text>
            </Pressable>
            {termsErr ? (
              <Text className="mt-1.5 pl-[30px] text-xs text-error">{termsErr}</Text>
            ) : null}

            <Button
              title="Create Account →"
              onPress={handleCreate}
              className="mt-5 h-[52px] rounded-2xl"
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
              <Ionicons name="logo-google" size={18} color="#181c1c" />
              <Text className="ml-2.5 text-[15px] font-semibold text-onSurface">
                Continue with Google
              </Text>
            </Pressable>

            <View className="mt-5 flex-row items-center justify-center">
              <Text className="text-xs text-onSurfaceVariant">
                Already have an account?{' '}
              </Text>
              <Pressable onPress={() => router.replace('/login')} hitSlop={8}>
                <Text className="text-xs font-semibold text-primaryContainer">
                  Sign in
                </Text>
              </Pressable>
            </View>
          </View>

          <Text className="mt-6 text-center text-[11px] text-onSurfaceVariant">
            End-to-End Encrypted Health Vault • HIPAA &amp; ABDM Compliant
          </Text>
        </ScrollView>
      </View>

      <Modal
        visible={legal !== null}
        onClose={() => setLegal(null)}
        title={legal ? LEGAL_TEXT[legal].title : ''}
      >
        <Text className="text-sm leading-6 text-onSurfaceVariant">
          {legal ? LEGAL_TEXT[legal].body : ''}
        </Text>
        <Button title="I Understand" onPress={() => setLegal(null)} className="mt-4" />
      </Modal>
    </SafeAreaView>
  );
}

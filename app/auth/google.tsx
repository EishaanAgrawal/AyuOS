import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';

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
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 0,
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

const BENEFITS: { icon: IoniconName; title: string; body: string }[] = [
  {
    icon: 'shield-checkmark-outline',
    title: 'Secure sign in',
    body: "We use Google's secure authentication system.",
  },
  {
    icon: 'flash-outline',
    title: 'Quick and easy',
    body: 'Create your AyuOS account in just a few steps.',
  },
  {
    icon: 'people-outline',
    title: 'Your data, your control',
    body: 'You can manage your account and permissions anytime.',
  },
];

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

/** Pre-OAuth consent explainer — UI only until Supabase Auth is wired up. */
export default function GoogleAuthScreen() {
  const router = useRouter();
  const [legal, setLegal] = useState<'terms' | 'privacy' | null>(null);

  const handleGoogle = () => {
    Alert.alert('Backend pending', 'Supabase not connected yet.');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <View className="relative flex-1">
        <LeafBackdrop />
        <ScrollView
          contentContainerClassName="flex-grow px-4 pb-6 pt-4"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={10}
            className="mb-1 h-10 w-10 items-center justify-center rounded-full"
          >
            <Ionicons name="chevron-back" size={26} color="#0f5c5e" />
          </Pressable>

          <View className="mb-4 mt-1 items-center">
            <LeafEmblem size={56} />
            <Text className="mt-2 text-[34px] font-extrabold tracking-tight text-primaryContainer">
              AyuOS
            </Text>
            <Text className="mt-2 max-w-[240px] text-center text-[16px] font-semibold leading-6 text-onSurface">
              Your lifelong health,{'\n'}organized together.
            </Text>
          </View>

          <View
            className="rounded-[34px] bg-surfaceContainerLowest px-6 pb-6 pt-7"
            style={{
              shadowColor: '#0f5c5e',
              shadowOpacity: 0.12,
              shadowRadius: 32,
              shadowOffset: { width: 0, height: 16 },
              elevation: 8,
            }}
          >
            <View className="items-center">
              <View className="mb-4 h-[66px] w-[66px] items-center justify-center rounded-full border border-outlineVariant bg-surfaceContainerLow">
                <Ionicons name="logo-google" size={32} color="#181c1c" />
              </View>
              <Text className="text-[25px] font-bold tracking-tight text-onSurface">
                Continue with Google
              </Text>
              <Text className="mt-2 px-1 text-center text-sm leading-6 text-onSurfaceVariant">
                Sign in with your Google account to create your AyuOS account
                quickly and securely.
              </Text>
            </View>

            <View className="mt-5 gap-4 rounded-[22px] border border-outlineVariant bg-surfaceContainerLow p-4">
              {BENEFITS.map((b) => (
                <View key={b.title} className="flex-row items-start">
                  <View className="h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-outlineVariant bg-surfaceContainerLowest">
                    <Ionicons name={b.icon} size={20} color="#0f5c5e" />
                  </View>
                  <View className="ml-3.5 flex-1">
                    <Text className="text-[14px] font-semibold text-onSurface">
                      {b.title}
                    </Text>
                    <Text className="mt-0.5 text-[13px] leading-5 text-onSurfaceVariant">
                      {b.body}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <View className="mt-3.5 flex-row items-start rounded-[18px] border border-outlineVariant bg-surfaceContainerLow p-3.5">
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#0f5c5e"
                style={{ marginTop: 2 }}
              />
              <Text className="ml-2.5 flex-1 text-[12.5px] leading-5 text-onSurfaceVariant">
                By continuing, you agree to share your name, email address and
                profile picture (if available) with AyuOS. We will use this
                information to create and manage your account.
              </Text>
            </View>

            <View className="mt-4 gap-2.5">
              <Pressable
                onPress={handleGoogle}
                accessibilityRole="button"
                className="h-[52px] flex-row items-center justify-center rounded-2xl bg-primary px-4"
              >
                <View className="h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white">
                  <Ionicons name="logo-google" size={14} color="#181c1c" />
                </View>
                <Text className="ml-2.5 text-[15.5px] font-semibold text-onPrimary">
                  Continue with Google
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color="#ffffff"
                  style={{ marginLeft: 6 }}
                />
              </Pressable>

              <Pressable
                onPress={() => router.replace('/login')}
                accessibilityRole="button"
                className="h-[50px] flex-row items-center justify-center rounded-2xl border border-outlineVariant bg-surfaceContainerLowest"
              >
                <Text className="text-[15px] font-semibold text-primaryContainer">
                  Use email instead
                </Text>
              </Pressable>
            </View>

            <Text className="mt-4 text-center text-[12px] leading-5 text-onSurfaceVariant">
              By continuing, you agree to the{' '}
              <Text
                className="font-semibold text-primaryContainer"
                onPress={() => setLegal('terms')}
              >
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text
                className="font-semibold text-primaryContainer"
                onPress={() => setLegal('privacy')}
              >
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
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

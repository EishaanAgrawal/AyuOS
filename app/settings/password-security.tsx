import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { SectionTitle } from '../../components/SectionTitle';
import { Toggle } from '../../components/Toggle';

/** Fictional demo security state — local only. */
const DEVICES = [
  { name: 'Nothing Phone (2a) Plus', detail: 'This device · Android', current: true },
  { name: 'Chrome on Windows', detail: 'Last active 3 days ago', current: false },
];

export default function PasswordSecurityScreen() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [biometric, setBiometric] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader title="Password & Security" />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <Card className="mb-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-base font-medium text-onSurface">Password</Text>
              <Text className="mt-0.5 text-sm text-onSurfaceVariant">Last changed 60 days ago</Text>
            </View>
            <Button
              title="Change"
              variant="secondary"
              onPress={() =>
                Alert.alert('Pending', 'Password change setup needs the auth backend. Coming later.')
              }
            />
          </View>
        </Card>

        <SectionTitle title="Two-factor authentication" />
        <Card>
          <Toggle
            value={twoFactor}
            onChange={setTwoFactor}
            label="Two-factor authentication"
            description={
              twoFactor
                ? 'On (demo preview) — real 2FA setup pending backend.'
                : 'Add an extra step at sign-in. Setup pending backend.'
            }
          />
          <View className="border-t border-outlineVariant/60">
            <Toggle
              value={biometric}
              onChange={setBiometric}
              label="Biometric unlock"
              description="Use fingerprint or face to unlock the app."
            />
          </View>
          <View className="border-t border-outlineVariant/60">
            <Toggle
              value={loginAlerts}
              onChange={setLoginAlerts}
              label="New sign-in alerts"
              description="Notify me about sign-ins from new devices."
            />
          </View>
        </Card>

        <SectionTitle title="Devices" />
        <Card>
          {DEVICES.map((device, index) => (
            <View
              key={device.name}
              className={`flex-row items-center py-3.5 ${
                index < DEVICES.length - 1 ? 'border-b border-outlineVariant/60' : ''
              }`}
            >
              <View className="mr-4 h-11 w-11 items-center justify-center rounded-full bg-surfaceContainer">
                <Ionicons
                  name={device.current ? 'phone-portrait-outline' : 'laptop-outline'}
                  size={22}
                  color="#004345"
                />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-onSurface">{device.name}</Text>
                <Text className="mt-0.5 text-sm text-onSurfaceVariant">{device.detail}</Text>
              </View>
              {device.current ? (
                <Text className="text-sm font-semibold text-primary">Current</Text>
              ) : (
                <Text className="text-sm font-semibold text-error">Sign out</Text>
              )}
            </View>
          ))}
        </Card>

        <SectionTitle title="Recent activity" />
        <Card>
          {[
            { text: 'Signed in from this device', time: 'Today, 9:12 AM' },
            { text: 'Password viewed (demo)', time: 'Yesterday, 6:40 PM' },
            { text: 'Signed in from Chrome on Windows', time: '12 Oct 2026' },
          ].map((item, index, arr) => (
            <View
              key={item.text}
              className={`py-3.5 ${index < arr.length - 1 ? 'border-b border-outlineVariant/60' : ''}`}
            >
              <Text className="text-base text-onSurface">{item.text}</Text>
              <Text className="mt-0.5 text-sm text-onSurfaceVariant">{item.time}</Text>
            </View>
          ))}
        </Card>

        <Text className="mt-4 text-center text-xs text-onSurfaceVariant">
          Security details shown are fictional demo data.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

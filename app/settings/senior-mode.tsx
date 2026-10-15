import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { Toggle } from '../../components/Toggle';

export default function SeniorModeScreen() {
  const [seniorMode, setSeniorMode] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader title="Senior Mode" subtitle="Larger text, bigger touch targets, simpler layout." />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <Card className="mb-5">
          <Toggle
            value={seniorMode}
            onChange={setSeniorMode}
            label="Senior Mode"
            description="Applies larger text and a simplified layout across the app (demo preview)."
          />
        </Card>

        <Text className="mb-3 px-1 text-lg font-semibold text-onSurface">Preview</Text>
        <Card>
          <View className="flex-row items-center">
            <View className="mr-4 h-14 w-14 items-center justify-center rounded-full bg-primaryFixed/40">
              <Ionicons name="heart-outline" size={28} color="#004345" />
            </View>
            <View className="flex-1">
              <Text className={seniorMode ? 'text-2xl font-bold text-onSurface' : 'text-lg font-semibold text-onSurface'}>
                Today&apos;s medicines
              </Text>
              <Text className={seniorMode ? 'mt-1 text-xl text-onSurfaceVariant' : 'mt-0.5 text-sm text-onSurfaceVariant'}>
                2 of 3 doses taken
              </Text>
            </View>
          </View>
          <View className={`mt-4 rounded-xl bg-surfaceContainer p-4 ${seniorMode ? '' : ''}`}>
            <Text className={seniorMode ? 'text-xl font-semibold text-onSurface' : 'text-base font-medium text-onSurface'}>
              Metformin 500mg — after dinner
            </Text>
            <Text className={seniorMode ? 'mt-1 text-lg text-onSurfaceVariant' : 'mt-0.5 text-sm text-onSurfaceVariant'}>
              Next dose: 9:30 PM today
            </Text>
          </View>
          <View className={`mt-4 items-center justify-center rounded-xl bg-primary ${seniorMode ? 'py-5' : 'py-3.5'}`}>
            <Text className={seniorMode ? 'text-xl font-bold text-onPrimary' : 'text-base font-semibold text-onPrimary'}>
              Mark as Taken
            </Text>
          </View>
        </Card>

        <View className="mt-5 rounded-2xl border border-[#bcd9db] bg-primaryFixed/20 p-4">
          <View className="flex-row items-start">
            <Ionicons name="information-circle-outline" size={22} color="#004345" />
            <Text className="ml-3 flex-1 text-sm text-onSurfaceVariant">
              This toggle previews Senior Mode styling on this screen only. Applying it
              app-wide needs the preferences backend.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { Toggle } from '../../components/Toggle';
import { demoMedicines } from '../../lib/demo-data';

export default function MedicinesScreen() {
  const router = useRouter();
  const [taken, setTaken] = useState<Record<string, boolean>>(
    Object.fromEntries(demoMedicines.map((m) => [m.id, m.takenToday])),
  );

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader title="Medicines" showBack={false} />
      <ScrollView contentContainerClassName="gap-3 px-5 pb-8">
        {demoMedicines.map((med) => (
          <Card key={med.id} className="p-4" onPress={() => router.push(`/medicines/${med.id}`)}>
            <View className="mb-1 flex-row items-center justify-between">
              <Text className="text-base font-semibold text-onSurface">
                {med.name} · {med.strength}
              </Text>
              <Badge label={taken[med.id] ? 'Taken' : 'Due'} tone={taken[med.id] ? 'success' : 'warning'} />
            </View>
            <Text className="text-sm text-onSurfaceVariant">{med.schedule}</Text>
            <Text className="mt-0.5 text-sm text-onSurfaceVariant">Next dose: {med.nextDose}</Text>
            <View className="mt-2 border-t border-outlineVariant pt-1">
              <Toggle
                label="Taken today"
                value={taken[med.id] ?? false}
                onChange={(v) => setTaken((prev) => ({ ...prev, [med.id]: v }))}
              />
            </View>
          </Card>
        ))}
        <Button
          title="Add medicine"
          variant="secondary"
          className="mt-2"
          onPress={() =>
            Alert.alert(
              'Demo preview',
              'Adding medicines needs the backend, which is not connected yet.',
            )
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

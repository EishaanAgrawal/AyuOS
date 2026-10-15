/**
 * Medicine detail — stock, refill threshold, burn-rate note, source, actions.
 *
 * DEMO ONLY: stock figures, thresholds and burn-rate estimates are fictional
 * placeholder data (defined in app/(tabs)/medicines.tsx). "Order Refill"
 * only records that YOU reported ordering externally — AyuOS never places
 * pharmacy orders. "Mark Taken" is local-only and never saved.
 */

import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/PageHeader';
import { Toggle } from '../../components/Toggle';
import { HONESTY_NOTE, extendedMedicines } from '../(tabs)/medicines';

function StockBar({ ratio, low }: { ratio: number; low: boolean }) {
  const pct = Math.max(0, Math.min(1, ratio));
  return (
    <View className="h-2 overflow-hidden rounded-full bg-surfaceContainerHigh">
      <View
        className={`h-2 rounded-full ${low ? 'bg-error' : 'bg-primary'}`}
        style={{ width: `${Math.round(pct * 100)}%` }}
      />
    </View>
  );
}

export default function MedicineDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const med = extendedMedicines.find((m) => m.id === id);

  const [taken, setTaken] = useState(false);
  const [ordered, setOrdered] = useState(false);

  if (!med) {
    return (
      <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
        <PageHeader title="Medicine" />
        <EmptyState
          icon="medkit-outline"
          title="Medicine not found"
          message="This demo entry does not exist."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader title={med.name} subtitle={med.strength} />
      <ScrollView contentContainerClassName="gap-3 px-5 pb-8">
        {/* Identity */}
        <Card className="p-4">
          <View className="flex-row items-center gap-3">
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-surfaceContainer">
              <Ionicons name="medkit-outline" size={26} color="#004345" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-onSurface">
                {med.name} {med.strength}
              </Text>
              <View className="mt-1.5 flex-row flex-wrap gap-2">
                {med.isLowStock ? (
                  <Badge label="Low stock" tone="danger" />
                ) : (
                  <Badge label="On track" tone="success" />
                )}
                {ordered ? <Badge label="✓ Ordered" tone="primary" /> : null}
              </View>
            </View>
          </View>
          <Text className="mt-3 text-sm text-onSurfaceVariant">{med.schedule}</Text>
          <Text className="text-sm text-onSurfaceVariant">Next dose: {med.nextDose}</Text>
          <Text className="mt-1 text-xs text-onSurfaceVariant">
            Schedule from demo data — no real dosage plan is set up.
          </Text>
        </Card>

        {/* Stock (fictional) */}
        <Card className="p-4">
          <Text className="text-base font-semibold text-onSurface">Stock</Text>
          <Text className="mt-0.5 text-xs text-onSurfaceVariant">
            Fictional demo figures — not real inventory.
          </Text>
          <View className="mt-3 flex-row items-baseline justify-between">
            <Text className="text-2xl font-bold text-onSurface">
              {med.stockOnHand}{' '}
              <Text className="text-sm font-normal text-onSurfaceVariant">{med.unit}</Text>
            </Text>
            <Text className="text-sm text-onSurfaceVariant">
              Refill threshold: {med.refillThreshold} {med.unit}
            </Text>
          </View>
          <View className="mt-2">
            <StockBar
              ratio={med.packSize > 0 ? med.stockOnHand / med.packSize : 0}
              low={med.isLowStock}
            />
          </View>
          <Text className="mt-1.5 text-sm text-onSurfaceVariant">
            {med.stockOnHand} of {med.packSize} {med.unit} remaining (fictional)
          </Text>
        </Card>

        {/* Burn rate — only when the fixture supports it */}
        <Card className="p-4">
          <Text className="text-base font-semibold text-onSurface">Burn rate</Text>
          {med.daysRemaining != null ? (
            <Text className="mt-1.5 text-sm text-onSurfaceVariant">
              Estimated ~{med.daysRemaining} days remaining at the current fictional burn
              rate.
            </Text>
          ) : (
            <Text className="mt-1.5 text-sm text-onSurfaceVariant">
              Insufficient data to estimate days remaining.
            </Text>
          )}
        </Card>

        {/* Source — only when the fixture says so */}
        <Card className="p-4">
          <Text className="text-base font-semibold text-onSurface">Source</Text>
          {med.prescriptionSource ? (
            <Text className="mt-1.5 text-sm text-onSurfaceVariant">
              From confirmed prescription — {med.prescriptionSource} (fictional record).
            </Text>
          ) : (
            <Text className="mt-1.5 text-sm text-onSurfaceVariant">
              Source not recorded in demo data.
            </Text>
          )}
        </Card>

        {/* Actions */}
        <Card className="p-4">
          <Text className="text-base font-semibold text-onSurface">Actions</Text>
          {ordered ? (
            <View className="mt-3 flex-row items-start gap-2">
              <Ionicons name="checkmark-circle" size={20} color="#004345" />
              <View className="flex-1">
                <Text className="text-sm font-semibold text-onSurface">✓ Ordered</Text>
                <Text className="mt-0.5 text-xs text-onSurfaceVariant">{HONESTY_NOTE}</Text>
              </View>
            </View>
          ) : (
            <View className="mt-3">
              <Button title="Order Refill" onPress={() => setOrdered(true)} />
              <Text className="mt-1.5 text-xs text-onSurfaceVariant">
                Records that you ordered externally — AyuOS places no pharmacy order.
              </Text>
            </View>
          )}

          <View className="mt-2 border-t border-outlineVariant">
            <Toggle
              label="Mark Taken"
              description="Demo only — kept on this screen, never saved."
              value={taken}
              onChange={setTaken}
            />
          </View>

          <Button
            title="Remind Me Later"
            variant="secondary"
            className="mt-2"
            onPress={() =>
              Alert.alert('Reminder scheduling', 'Reminder scheduling pending backend.')
            }
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

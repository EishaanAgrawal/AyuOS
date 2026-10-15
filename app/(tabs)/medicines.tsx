/**
 * Medicines — tab screen (Overview | Current | History | Refills).
 *
 * DEMO ONLY: every stock figure, burn-rate estimate, refill entry and
 * acknowledgement on this screen is fictional placeholder data defined in
 * this file (extending the demo fixture in lib/demo-data.ts). Nothing here
 * is real inventory, and AyuOS never places pharmacy orders — "Order Refill"
 * only records that YOU reported ordering externally.
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/PageHeader';
import { Tabs } from '../../components/Tabs';
import { Toggle } from '../../components/Toggle';
import { demoMedicines, type DemoMedicine } from '../../lib/demo-data';

/* ------------------------------------------------------------------ */
/* Fictional extensions of the demo fixture — kept inside this file,   */
/* never written back to lib/demo-data.ts.                             */
/* ------------------------------------------------------------------ */

export interface StockExtension {
  /** Fictional units currently on hand — demo figure, not real inventory. */
  stockOnHand: number;
  packSize: number;
  unit: string;
  /** Fictional refill threshold in the same unit. */
  refillThreshold: number;
  isLowStock: boolean;
  /** Fictional burn-rate estimate (days); null = insufficient data. */
  daysRemaining: number | null;
  /** Confirmed prescription source, or null when not recorded. */
  prescriptionSource: string | null;
}

export interface ExtendedMedicine extends DemoMedicine, StockExtension {}

const STOCK_EXTENSIONS: Record<string, StockExtension> = {
  'med-1': {
    stockOnHand: 24,
    packSize: 30,
    unit: 'tablets',
    refillThreshold: 14,
    isLowStock: false,
    daysRemaining: null,
    prescriptionSource: null,
  },
  'med-2': {
    stockOnHand: 20,
    packSize: 30,
    unit: 'tablets',
    refillThreshold: 14,
    isLowStock: true,
    daysRemaining: 10,
    prescriptionSource: 'Cardiology Prescription · 28 Sep 2026',
  },
};

const DEFAULT_EXTENSION: StockExtension = {
  stockOnHand: 0,
  packSize: 0,
  unit: 'units',
  refillThreshold: 0,
  isLowStock: false,
  daysRemaining: null,
  prescriptionSource: null,
};

export const extendedMedicines: ExtendedMedicine[] = demoMedicines.map((m) => ({
  ...m,
  ...(STOCK_EXTENSIONS[m.id] ?? DEFAULT_EXTENSION),
}));

export interface RefillEvent {
  id: string;
  medicineLabel: string;
  detail: string;
  date: string;
}

/** Fictional past refill entries — demo only. */
export const fictionalRefillHistory: RefillEvent[] = [
  {
    id: 'hist-1',
    medicineLabel: 'Metformin 500 mg — refilled',
    detail: '30 tablets · ordered externally (fictional)',
    date: '28 Sep 2026',
  },
  {
    id: 'hist-2',
    medicineLabel: 'Atorvastatin 20 mg — refilled',
    detail: '30 tablets · ordered externally (fictional)',
    date: '30 Jul 2026',
  },
  {
    id: 'hist-3',
    medicineLabel: 'Metformin 500 mg — refilled',
    detail: '30 tablets · ordered externally (fictional)',
    date: '28 Jun 2026',
  },
];

export interface RefillAcknowledgement {
  id: string;
  medicineLabel: string;
  reportedAt: string;
  note: string;
}

export const HONESTY_NOTE =
  'You reported ordering externally — AyuOS did not place a pharmacy order.';

/** Seeded fictional acknowledgement — demo only. */
export const seedAcknowledgements: RefillAcknowledgement[] = [
  {
    id: 'ack-seed-1',
    medicineLabel: 'Atorvastatin 20 mg',
    reportedAt: '2 Oct 2026 (fictional)',
    note: HONESTY_NOTE,
  },
];

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

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

function StatCard({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) {
  return (
    <View className="flex-1 rounded-2xl border border-outlineVariant bg-surfaceContainerLowest p-4">
      <Text className={`text-2xl font-bold ${accent ? 'text-error' : 'text-onSurface'}`}>{value}</Text>
      <Text className="mt-1 text-xs text-onSurfaceVariant">{label}</Text>
    </View>
  );
}

interface MedicineCardProps {
  med: ExtendedMedicine;
  taken: boolean;
  onToggleTaken: (value: boolean) => void;
  ordered: boolean;
  onOrderRefill: () => void;
  onOpen: () => void;
}

function MedicineCard({ med, taken, onToggleTaken, ordered, onOrderRefill, onOpen }: MedicineCardProps) {
  return (
    <Card className="p-4" onPress={onOpen}>
      <View className="flex-row gap-3">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-surfaceContainer">
          <Ionicons name="medkit-outline" size={22} color="#004345" />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-onSurface">
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
          <Text className="mt-1.5 text-sm text-onSurfaceVariant">{med.schedule}</Text>
          <Text className="text-sm text-onSurfaceVariant">Next dose: {med.nextDose}</Text>
        </View>
      </View>

      <View className="mt-3 border-t border-outlineVariant pt-3">
        <View className="mb-1.5 flex-row items-baseline justify-between">
          <Text className="text-sm font-medium text-onSurface">Stock</Text>
          <Text className="text-sm text-onSurfaceVariant">
            {med.stockOnHand} / {med.packSize} {med.unit} · fictional
          </Text>
        </View>
        <StockBar
          ratio={med.packSize > 0 ? med.stockOnHand / med.packSize : 0}
          low={med.isLowStock}
        />
        {med.isLowStock && med.daysRemaining != null ? (
          <Text className="mt-1.5 text-sm font-medium text-error">
            May run out in ~{med.daysRemaining} days (fictional estimate)
          </Text>
        ) : null}
      </View>

      <View className="mt-3 border-t border-outlineVariant pt-1">
        {med.isLowStock && !ordered ? (
          <View className="items-start py-2">
            <Button title="Order Refill" onPress={onOrderRefill} />
            <Text className="mt-1.5 text-xs text-onSurfaceVariant">
              Records that you ordered externally — AyuOS places no pharmacy order.
            </Text>
          </View>
        ) : null}
        {ordered ? (
          <View className="flex-row items-start gap-2 py-2">
            <Ionicons name="checkmark-circle" size={20} color="#004345" />
            <View className="flex-1">
              <Text className="text-sm font-semibold text-onSurface">✓ Ordered</Text>
              <Text className="mt-0.5 text-xs text-onSurfaceVariant">{HONESTY_NOTE}</Text>
            </View>
          </View>
        ) : null}
        <Toggle
          label="Mark Taken"
          description="Demo only — kept on this screen, never saved."
          value={taken}
          onChange={onToggleTaken}
        />
      </View>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Screen                                                              */
/* ------------------------------------------------------------------ */

const TAB_OPTIONS = [
  { key: 'overview', label: 'Overview' },
  { key: 'current', label: 'Current' },
  { key: 'history', label: 'History' },
  { key: 'refills', label: 'Refills' },
];

export default function MedicinesScreen() {
  const router = useRouter();
  const [tab, setTab] = useState('overview');
  const [taken, setTaken] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(extendedMedicines.map((m) => [m.id, m.takenToday])),
  );
  const [ordered, setOrdered] = useState<Record<string, boolean>>({});
  const [acks, setAcks] = useState<RefillAcknowledgement[]>(seedAcknowledgements);

  const lowStockMeds = extendedMedicines.filter((m) => m.isLowStock);

  const handleOrderRefill = (med: ExtendedMedicine) => {
    setOrdered((prev) => ({ ...prev, [med.id]: true }));
    setAcks((prev) => [
      {
        id: `ack-${med.id}-${Date.now()}`,
        medicineLabel: `${med.name} ${med.strength}`,
        reportedAt: 'just now (demo)',
        note: HONESTY_NOTE,
      },
      ...prev,
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <PageHeader
        title="Medicines"
        subtitle="Demo preview — all stock figures are fictional"
        showBack={false}
      />
      <View className="px-5 pb-1">
        <Tabs options={TAB_OPTIONS} value={tab} onChange={setTab} />
      </View>

      {tab === 'overview' && (
        <ScrollView contentContainerClassName="gap-3 px-5 pb-8 pt-3">
          <View className="flex-row gap-3">
            <StatCard value={String(extendedMedicines.length)} label="Active medicines" />
            <StatCard value={String(lowStockMeds.length)} label="Needs attention" accent={lowStockMeds.length > 0} />
            <StatCard value={String(acks.length)} label="Refills reported" />
          </View>

          {lowStockMeds.length > 0 ? (
            <Card className="p-4">
              <View className="flex-row items-center gap-3">
                <View className="h-11 w-11 items-center justify-center rounded-full bg-errorContainer">
                  <Ionicons name="warning-outline" size={22} color="#93000a" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-onSurface">Action needed</Text>
                  <Text className="text-sm text-onSurfaceVariant">
                    {lowStockMeds.length === 1
                      ? '1 medicine is low on stock (fictional)'
                      : `${lowStockMeds.length} medicines are low on stock (fictional)`}
                  </Text>
                </View>
                <Pressable onPress={() => setTab('current')} accessibilityRole="button">
                  <Text className="text-sm font-semibold text-primary">View details ›</Text>
                </Pressable>
              </View>
            </Card>
          ) : null}

          <View className="mt-2 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-onSurface">Low on stock</Text>
            <Pressable onPress={() => setTab('current')} accessibilityRole="button">
              <Text className="text-sm font-semibold text-primary">View all ›</Text>
            </Pressable>
          </View>
          {lowStockMeds.length === 0 ? (
            <Text className="text-sm text-onSurfaceVariant">
              No low-stock medicines right now (fictional data).
            </Text>
          ) : (
            lowStockMeds.map((med) => (
              <Card
                key={med.id}
                className="p-4"
                onPress={() => router.push(`/medicines/${med.id}`)}
              >
                <View className="flex-row items-center gap-3">
                  <View className="h-11 w-11 items-center justify-center rounded-2xl bg-surfaceContainer">
                    <Ionicons name="medkit-outline" size={20} color="#004345" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-onSurface">
                      {med.name} {med.strength}
                    </Text>
                    <Text className="text-sm text-onSurfaceVariant">
                      {med.stockOnHand} / {med.packSize} {med.unit} remaining · fictional
                    </Text>
                  </View>
                  <Badge label="Low stock" tone="danger" />
                </View>
              </Card>
            ))
          )}
        </ScrollView>
      )}

      {tab === 'current' && (
        <ScrollView contentContainerClassName="gap-3 px-5 pb-8 pt-3">
          {extendedMedicines.map((med) => (
            <MedicineCard
              key={med.id}
              med={med}
              taken={taken[med.id] ?? false}
              onToggleTaken={(v) => setTaken((prev) => ({ ...prev, [med.id]: v }))}
              ordered={ordered[med.id] ?? false}
              onOrderRefill={() => handleOrderRefill(med)}
              onOpen={() => router.push(`/medicines/${med.id}`)}
            />
          ))}
        </ScrollView>
      )}

      {tab === 'history' && (
        <ScrollView contentContainerClassName="gap-3 px-5 pb-8 pt-3">
          <Text className="text-xs text-onSurfaceVariant">
            Fictional past entries — demo only.
          </Text>
          {fictionalRefillHistory.map((entry) => (
            <Card key={entry.id} className="p-4">
              <View className="flex-row items-center gap-3">
                <View className="h-11 w-11 items-center justify-center rounded-2xl bg-surfaceContainer">
                  <Ionicons name="receipt-outline" size={20} color="#004345" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-onSurface">{entry.medicineLabel}</Text>
                  <Text className="text-sm text-onSurfaceVariant">{entry.detail}</Text>
                </View>
                <Text className="text-xs text-onSurfaceVariant">{entry.date}</Text>
              </View>
            </Card>
          ))}
        </ScrollView>
      )}

      {tab === 'refills' && (
        <ScrollView contentContainerClassName="gap-3 px-5 pb-8 pt-3">
          <Text className="text-xs text-onSurfaceVariant">
            Refills you reported ordering externally. AyuOS never places pharmacy orders.
          </Text>
          {acks.length === 0 ? (
            <EmptyState
              icon="cart-outline"
              title="No refills reported"
              message="Tap “Order Refill” on a low-stock medicine to record that you ordered it yourself."
            />
          ) : (
            acks.map((ack) => (
              <Card key={ack.id} className="p-4">
                <View className="flex-row items-center gap-3">
                  <View className="h-11 w-11 items-center justify-center rounded-full bg-primaryFixed">
                    <Ionicons name="checkmark" size={20} color="#004345" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-onSurface">{ack.medicineLabel}</Text>
                    <Text className="text-sm text-onSurfaceVariant">Reported {ack.reportedAt}</Text>
                  </View>
                  <Badge label="✓ Ordered" tone="primary" />
                </View>
                <Text className="mt-2 text-xs text-onSurfaceVariant">{ack.note}</Text>
              </Card>
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

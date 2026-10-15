import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';

type IconName = keyof typeof Ionicons.glyphMap;

/** Fictional demo finance data — not real spending. */
const CATEGORIES = [
  { name: 'Medicines', amount: 7160, color: '#004345', icon: 'medkit-outline' as IconName },
  { name: 'Consultations', amount: 5370, color: '#226584', icon: 'pulse-outline' as IconName },
  { name: 'Lab Tests', amount: 3580, color: '#b7791f', icon: 'flask-outline' as IconName },
  { name: 'Insurance', amount: 1790, color: '#6d5a7e', icon: 'shield-checkmark-outline' as IconName },
];

const TOTAL = 17900;

const RECENT_EXPENSES = [
  { title: 'Apollo Pharmacy — Medicines', date: '14 Oct 2026', category: 'Medicines', amount: 1840 },
  { title: 'Dr. Rao — Cardiology consult', date: '11 Oct 2026', category: 'Consultations', amount: 1200 },
  { title: 'City Diagnostics — Lipid panel', date: '9 Oct 2026', category: 'Lab Tests', amount: 950 },
  { title: 'Sunrise Hospital — Day care', date: '28 Sep 2026', category: 'Consultations', amount: 4500 },
];

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

/** SVG-less donut: concentric Views. Quarter-arc segments via rotated borderTopColor rings. */
function Donut() {
  const size = 200;
  const ring = 26;
  const rotation = [0, 90, 180, 270];

  return (
    <View className="items-center justify-center py-2">
      <View style={{ width: size, height: size }} className="relative">
        <View
          style={{ width: size, height: size, borderRadius: size / 2, borderWidth: ring }}
          className="absolute border-surfaceContainer"
        />
        {CATEGORIES.map((cat, i) => (
          <View
            key={cat.name}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: ring,
              borderColor: 'transparent',
              borderTopColor: cat.color,
              transform: [{ rotate: `${rotation[i]}deg` }],
            }}
            className="absolute"
          />
        ))}
        <View
          style={{
            width: size - ring * 2,
            height: size - ring * 2,
            borderRadius: (size - ring * 2) / 2,
            left: ring,
            top: ring,
          }}
          className="absolute items-center justify-center bg-surfaceContainerLowest"
        >
          <Text className="text-3xl font-bold text-onSurface">{inr(TOTAL)}</Text>
          <Text className="mt-1 text-xs text-onSurfaceVariant">Total this month</Text>
        </View>
      </View>
      <Text className="mt-3 text-xs text-onSurfaceVariant">
        Fictional demo data — visual shares approximate.
      </Text>
    </View>
  );
}

export default function FinanceScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader
        title="Healthcare Finance"
        subtitle="Medical expenses, bills, treatment costs and insurance."
      />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <Card className="mb-5">
          <Donut />
          <View className="mt-2">
            {CATEGORIES.map((cat, index) => (
              <View
                key={cat.name}
                className={`flex-row items-center py-3 ${
                  index < CATEGORIES.length - 1 ? 'border-b border-outlineVariant/60' : ''
                }`}
              >
                <View
                  style={{ backgroundColor: cat.color }}
                  className="h-3.5 w-3.5 rounded-full"
                />
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-surfaceContainer">
                  <Ionicons name={cat.icon} size={20} color="#004345" />
                </View>
                <Text className="flex-1 text-base text-onSurface">{cat.name}</Text>
                <Text className="text-base font-semibold text-onSurface">{inr(cat.amount)}</Text>
              </View>
            ))}
          </View>
        </Card>

        <View className="mb-3 flex-row items-center justify-between px-1">
          <Text className="text-lg font-semibold text-onSurface">Recent Expenses</Text>
          <Text className="text-sm font-semibold text-primary">View all</Text>
        </View>

        <Card>
          {RECENT_EXPENSES.map((expense, index) => (
            <View
              key={expense.title}
              className={`flex-row items-center py-3.5 ${
                index < RECENT_EXPENSES.length - 1 ? 'border-b border-outlineVariant/60' : ''
              }`}
            >
              <View className="mr-4 h-11 w-11 items-center justify-center rounded-full bg-surfaceContainer">
                <Ionicons name="receipt-outline" size={22} color="#004345" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-onSurface">{expense.title}</Text>
                <Text className="mt-0.5 text-sm text-onSurfaceVariant">
                  {expense.date} · {expense.category}
                </Text>
              </View>
              <Text className="text-base font-semibold text-onSurface">{inr(expense.amount)}</Text>
            </View>
          ))}
        </Card>

        <Text className="mt-4 text-center text-xs text-onSurfaceVariant">
          All amounts shown are fictional demo data.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

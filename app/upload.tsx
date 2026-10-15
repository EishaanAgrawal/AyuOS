import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../components/Badge';
import { PageHeader } from '../components/PageHeader';
import { SectionTitle } from '../components/SectionTitle';

const DOC_TYPES: { label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { label: 'Lab report', icon: 'flask-outline' },
  { label: 'Prescription', icon: 'medkit-outline' },
  { label: 'Doctor note', icon: 'pencil-outline' },
  { label: 'Hospital document', icon: 'business-outline' },
  { label: 'Imaging', icon: 'scan-outline' },
  { label: 'Bill', icon: 'receipt-outline' },
];

/**
 * 7-step pipeline. Step 1 is available locally; every later step needs the
 * private storage backend, so none of them are faked as working.
 */
const PIPELINE_STEPS: { title: string; detail: string }[] = [
  { title: 'Select', detail: 'Choose what kind of document this is.' },
  { title: 'Upload', detail: 'Your file is transferred securely.' },
  { title: 'Store', detail: 'Saved to your private health vault.' },
  { title: 'Extract', detail: 'Key values are read from the document.' },
  { title: 'Review', detail: 'You verify what was extracted.' },
  { title: 'Confirm', detail: 'You approve the final entry.' },
  { title: 'Records update', detail: 'Your health records reflect the new data.' },
];

const UPLOAD_PENDING_TITLE = 'Upload pending';
const UPLOAD_PENDING_BODY =
  'Private storage backend is not connected, so nothing can be stored yet. Your documents stay on this device until then.';

function showUploadPending() {
  Alert.alert(UPLOAD_PENDING_TITLE, UPLOAD_PENDING_BODY, [{ text: 'OK', style: 'default' }]);
}

export default function UploadScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerClassName="pb-10">
        <PageHeader
          title="Upload Anything"
          subtitle="Reports, prescriptions, bills, scans and more."
        />

        <SectionTitle title="What are you uploading?" />
        <View className="flex-row flex-wrap gap-3 px-5">
          {DOC_TYPES.map((doc) => (
            <Pressable
              key={doc.label}
              onPress={showUploadPending}
              accessibilityRole="button"
              accessibilityLabel={`Upload a ${doc.label}`}
              className="w-[31%] items-center rounded-2xl border border-outlineVariant bg-surfaceContainerLowest py-5"
            >
              <Ionicons name={doc.icon} size={28} color="#004345" />
              <Text className="mt-2 px-1 text-center text-xs font-semibold text-onSurface">
                {doc.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <SectionTitle
          title="How it works"
          action={<Badge label="demo — backend not connected" tone="warning" />}
        />
        <View className="px-5">
          {PIPELINE_STEPS.map((step, index) => {
            const stepNumber = index + 1;
            const isAvailable = stepNumber === 1;
            const isLast = index === PIPELINE_STEPS.length - 1;
            return (
              <View key={step.title} className="flex-row">
                <View className="items-center">
                  <View
                    className={`h-9 w-9 items-center justify-center rounded-full ${
                      isAvailable ? 'bg-primary' : 'bg-surfaceContainer'
                    }`}
                  >
                    <Text
                      className={`text-sm font-bold ${
                        isAvailable ? 'text-onPrimary' : 'text-onSurfaceVariant'
                      }`}
                    >
                      {stepNumber}
                    </Text>
                  </View>
                  {isLast ? null : (
                    <View
                      className={`w-px flex-1 ${
                        isAvailable ? 'bg-primary' : 'bg-outlineVariant'
                      }`}
                    />
                  )}
                </View>
                <View className="ml-4 flex-1 pb-6 pt-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-base font-semibold text-onSurface">
                      {step.title}
                    </Text>
                    {isAvailable ? (
                      <Badge label="ready" tone="success" />
                    ) : (
                      <Badge label="pending backend" tone="warning" />
                    )}
                  </View>
                  <Text className="mt-0.5 text-sm text-onSurfaceVariant">{step.detail}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View className="px-5">
          <View className="rounded-2xl bg-secondaryFixed p-4">
            <View className="flex-row items-center gap-2">
              <Ionicons name="lock-closed-outline" size={18} color="#001e2c" />
              <Text className="text-sm font-bold text-onSecondaryFixed">
                Your files stay private
              </Text>
            </View>
            <Text className="mt-1.5 text-sm text-onSecondaryFixed">
              No file leaves this device until the private storage backend is connected. Uploads
              are disabled in this demo preview.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

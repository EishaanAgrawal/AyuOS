import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { SectionTitle } from '../../components/SectionTitle';
import { Toggle } from '../../components/Toggle';

export default function NotificationSettingsScreen() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(true);
  const [medReminders, setMedReminders] = useState(true);
  const [appointments, setAppointments] = useState(true);
  const [labResults, setLabResults] = useState(true);
  const [familyUpdates, setFamilyUpdates] = useState(true);
  const [promos, setPromos] = useState(false);
  const [quietHours, setQuietHours] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <PageHeader title="Notification Preferences" />

      <ScrollView contentContainerClassName="px-5 pb-10">
        <SectionTitle title="Channels" />
        <Card>
          <Toggle value={push} onChange={setPush} label="Push notifications" description="Alerts on this device." />
          <View className="border-t border-outlineVariant/60">
            <Toggle value={email} onChange={setEmail} label="Email" description="Summaries and important updates." />
          </View>
          <View className="border-t border-outlineVariant/60">
            <Toggle value={sms} onChange={setSms} label="SMS" description="Critical reminders by text message." />
          </View>
        </Card>

        <SectionTitle title="Categories" />
        <Card>
          <Toggle value={medReminders} onChange={setMedReminders} label="Medicine reminders" description="Dose reminders for you and family." />
          <View className="border-t border-outlineVariant/60">
            <Toggle value={appointments} onChange={setAppointments} label="Appointments" description="Upcoming visit reminders." />
          </View>
          <View className="border-t border-outlineVariant/60">
            <Toggle value={labResults} onChange={setLabResults} label="Lab results" description="When a new report arrives." />
          </View>
          <View className="border-t border-outlineVariant/60">
            <Toggle value={familyUpdates} onChange={setFamilyUpdates} label="Family updates" description="Changes in shared family records." />
          </View>
          <View className="border-t border-outlineVariant/60">
            <Toggle value={promos} onChange={setPromos} label="Offers & tips" description="Health tips and feature news." />
          </View>
        </Card>

        <SectionTitle title="Quiet hours" />
        <Card>
          <Toggle
            value={quietHours}
            onChange={setQuietHours}
            label="Quiet hours"
            description="Mute non-critical notifications from 10:00 PM to 7:00 AM."
          />
          {quietHours && (
            <View className="border-t border-outlineVariant/60 py-4">
              <View className="flex-row items-center">
                <Ionicons name="moon-outline" size={20} color="#004345" />
                <Text className="ml-3 text-base text-onSurface">10:00 PM – 7:00 AM</Text>
              </View>
              <Text className="mt-1.5 text-sm text-onSurfaceVariant">
                Emergency and critical medicine alerts still come through.
              </Text>
            </View>
          )}
        </Card>

        <Text className="mt-4 text-center text-xs text-onSurfaceVariant">
          Preferences are stored locally in this demo.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

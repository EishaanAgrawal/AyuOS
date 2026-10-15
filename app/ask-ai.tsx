import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../components/Badge';
import { PageHeader } from '../components/PageHeader';
import { TextInput } from '../components/TextInput';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  /** Fictional seeded exchange, clearly labeled in the UI. */
  isSeededDemo: boolean;
}

const HONEST_FALLBACK =
  'AI unavailable in demo — connect Gemini via backend to enable.';

function initialMessages(): Message[] {
  return [
    {
      id: 'seed-u-1',
      role: 'user',
      text: 'What should I ask before my cardiology visit?',
      isSeededDemo: true,
    },
    {
      id: 'seed-a-1',
      role: 'assistant',
      text: HONEST_FALLBACK,
      isSeededDemo: true,
    },
    {
      id: 'seed-u-2',
      role: 'user',
      text: 'Summarise my latest lab report for me.',
      isSeededDemo: true,
    },
    {
      id: 'seed-a-2',
      role: 'assistant',
      text: HONEST_FALLBACK,
      isSeededDemo: true,
    },
  ];
}

let messageCounter = 0;
function nextId(prefix: string): string {
  messageCounter += 1;
  return `${prefix}-${Date.now()}-${messageCounter}`;
}

export default function AskAyuAIScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: nextId('u'), role: 'user', text, isSeededDemo: false },
      { id: nextId('a'), role: 'assistant', text: HONEST_FALLBACK, isSeededDemo: false },
    ]);
    setDraft('');
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        <PageHeader
          title="Ask AyuOS"
          subtitle="Demo preview — AI is not connected yet"
        />

        <ScrollView
          ref={scrollRef}
          className="flex-1"
          contentContainerClassName="gap-3 px-5 pb-4 pt-2"
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          {messages.map((m) =>
            m.role === 'user' ? (
              <View key={m.id} className="items-end">
                <View className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-3">
                  <Text className="text-base text-onPrimary">{m.text}</Text>
                </View>
                {m.isSeededDemo ? (
                  <View className="mt-1">
                    <Badge label="demo exchange" tone="neutral" />
                  </View>
                ) : null}
              </View>
            ) : (
              <View key={m.id} className="items-start">
                <View className="max-w-[85%] rounded-2xl rounded-bl-md border border-outlineVariant bg-surfaceContainerLowest px-4 py-3">
                  {m.isSeededDemo ? (
                    <View className="mb-1.5">
                      <Badge label="demo exchange" tone="neutral" />
                    </View>
                  ) : null}
                  <Text className="text-base text-onSurface">{m.text}</Text>
                </View>
              </View>
            ),
          )}
        </ScrollView>

        <View className="flex-row items-center gap-2 border-t border-outlineVariant bg-surfaceContainerLowest px-4 pb-4 pt-3">
          <View className="flex-1">
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Ask AyuOS anything…"
              returnKeyType="send"
              onSubmitEditing={send}
              className="!mb-0"
            />
          </View>
          <Pressable
            onPress={send}
            accessibilityRole="button"
            accessibilityLabel="Send message"
            className="h-12 w-12 items-center justify-center rounded-full bg-primary"
          >
            <Ionicons name="send" size={20} color="#ffffff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

import React, { createContext, useCallback, useContext } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from './theme';

interface DemoContextValue {
  /** Always true for this scaffold: the app runs in demo-preview mode. */
  isDemo: boolean;
  /**
   * Attempt to leave demo mode. No backend is connected yet, so this shows
   * an honest "backend not connected" message instead of faking a sign-in.
   */
  exitDemo: () => void;
}

const DemoContext = createContext<DemoContextValue>({
  isDemo: true,
  exitDemo: () => {},
});

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const exitDemo = useCallback(() => {
    Alert.alert(
      'Backend not connected',
      'Live sign-in needs Supabase, which is not connected yet. You are staying in demo preview mode with fictional data.',
      [{ text: 'Stay in demo', style: 'default' }],
    );
  }, []);

  return (
    <DemoContext.Provider value={{ isDemo: true, exitDemo }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo(): DemoContextValue {
  return useContext(DemoContext);
}

/**
 * Persistent top banner shown on every screen while in demo mode.
 * Renders inside the root layout so builders never have to add it per-screen.
 */
export function DemoBanner() {
  const { isDemo } = useDemo();
  const insets = useSafeAreaInsets();

  if (!isDemo) return null;

  return (
    <View
      accessibilityRole="header"
      style={{
        backgroundColor: colors.primaryContainer,
        paddingTop: insets.top,
        paddingBottom: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: colors.onPrimary,
          fontSize: 12,
          fontWeight: '700',
          letterSpacing: 1.5,
        }}
      >
        DEMO PREVIEW — FICTIONAL DATA
      </Text>
    </View>
  );
}

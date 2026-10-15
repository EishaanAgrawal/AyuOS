import React from 'react';
import { Pressable, Text, View } from 'react-native';

export interface TabOption {
  key: string;
  label: string;
}

interface TabsProps {
  options: TabOption[];
  value: string;
  onChange: (key: string) => void;
}

/** Segmented control — e.g. "Full Medical Access / Emergency Only / Billing Only". */
export function Tabs({ options, value, onChange }: TabsProps) {
  return (
    <View
      accessibilityRole="tablist"
      className="flex-row rounded-full bg-surfaceContainer p-1"
    >
      {options.map((opt) => {
        const active = opt.key === value;
        return (
          <Pressable
            key={opt.key}
            onPress={() => onChange(opt.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            className={`flex-1 items-center rounded-full px-3 py-2.5 ${
              active ? 'bg-surfaceContainerLowest' : ''
            }`}
            style={
              active
                ? {
                    shadowColor: '#004345',
                    shadowOpacity: 0.08,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 2,
                  }
                : undefined
            }
          >
            <Text
              className={`text-sm ${active ? 'font-semibold text-primary' : 'text-onSurfaceVariant'}`}
              numberOfLines={1}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default Tabs;

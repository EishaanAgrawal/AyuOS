import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal as RNModal, Pressable, Text, View } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

/** Level-3 overlay: white sheet with ambient depth, blurred 40% backdrop. */
export function Modal({ visible, onClose, title, children }: ModalProps) {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        onPress={onClose}
        className="flex-1 items-center justify-center bg-[#173042]/40 px-6"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-3xl bg-surfaceContainerLowest p-6"
          style={{
            shadowColor: '#173042',
            shadowOpacity: 0.12,
            shadowRadius: 32,
            shadowOffset: { width: 0, height: 20 },
            elevation: 12,
          }}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xl font-semibold text-onSurface">{title}</Text>
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close"
              hitSlop={12}
              className="h-9 w-9 items-center justify-center rounded-full bg-surfaceContainerLow"
            >
              <Ionicons name="close" size={20} color="#181c1c" />
            </Pressable>
          </View>
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

export default Modal;

import { Redirect } from 'expo-router';
import React from 'react';

import { useDemo } from '../lib/demo';

/**
 * Entry route. Demo mode is always on for this scaffold, so users land on
 * the home tab; once a backend exists this can route signed-out users to /login.
 */
export default function Index() {
  const { isDemo } = useDemo();
  return <Redirect href={isDemo ? '/(tabs)/home' : '/login'} />;
}

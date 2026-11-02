import React, { PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryProvider } from '../api';
import { NavigationContainer } from '@react-navigation/native';

const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </QueryProvider>
    </SafeAreaProvider>
  );
};

export default AppProviders;

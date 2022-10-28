import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { LoginProvider } from './providers/LoginContext';

import { LogBox } from 'react-native';
import AppNavigator from './screens/AppNavigator';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function App() {
  return (
    <NativeBaseProvider>
      <LoginProvider>
        <AppNavigator />
      </LoginProvider>
    </NativeBaseProvider>
  );
}

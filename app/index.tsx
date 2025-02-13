import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import {
  ClerkProvider,
  ClerkLoaded,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import Home from './screens/Home';
import store from './store/store';
import Login from './screens/Login';
import tokenCache from './configs/cache';

const App = () => {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file');
  }

  return (
    <Provider store={store}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <StatusBar style="auto" />
          <SignedIn>
            <Text>Hello</Text>
          </SignedIn>
          <SignedOut>
            <Login />
          </SignedOut>
        </ClerkLoaded>
      </ClerkProvider>
    </Provider>
  );
};

export default App;

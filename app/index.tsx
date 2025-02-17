import React from 'react';
import { Provider } from 'react-redux';
import {
  ClerkProvider,
  ClerkLoaded,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-expo';
import store from './store/store';
import Login from './screens/Login';
import TabNavigation from './components/Navigations/TabNavigation';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env');
}

const App = () => (
  <Provider store={store}>
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
        <SignedIn>
          <TabNavigation />
        </SignedIn>
        <SignedOut>
          <Login strategy="oauth_google" />
        </SignedOut>
      </ClerkLoaded>
    </ClerkProvider>
  </Provider>
);

export default App;

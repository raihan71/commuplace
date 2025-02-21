import React, { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    void WebBrowser.warmUpAsync();
    return () => {
      if (Platform.OS !== 'android') return;
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

export default useWarmUpBrowser;

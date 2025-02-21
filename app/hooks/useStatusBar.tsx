import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const useStatusBar = (style: any, color: any) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style, true);
      StatusBar.setBackgroundColor(color);
    }, [style, color]),
  );
};

export default useStatusBar;

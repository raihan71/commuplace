import React from 'react';
import { ScrollView, Animated } from 'react-native';

const ScrollEvent = ({ children }: any) => {
  const animatedValue = new Animated.Value(0);
  return (
    <ScrollView
      className="bg-white"
      showsVerticalScrollIndicator={true}
      scrollEventThrottle={1}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
        { useNativeDriver: false },
      )}>
      {children}
    </ScrollView>
  );
};

export default ScrollEvent;

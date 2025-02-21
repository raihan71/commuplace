import React, { useState, useRef, useEffect } from 'react';
import { FlatList } from 'react-native';

interface SliderItem {
  image: string;
}

const useAutoScroll = (data: SliderItem[], interval: number = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (currentIndex < data.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
        setCurrentIndex(currentIndex + 1);
      } else {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
        setCurrentIndex(0);
      }
    }, interval);

    return () => clearInterval(scrollInterval);
  }, [currentIndex, data.length, interval]);

  return {
    currentIndex,
    setCurrentIndex,
    flatListRef,
  };
};

export default useAutoScroll;

import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingSpinner({ color, isOverlay = false }) {
  return (
    <View style={isOverlay ? styles.loadingSpinnerWrapOverlay : styles.loadingSpinnerWrap}>
      <ActivityIndicator color={color} size={'large'} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingSpinnerWrapOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(100,100,100,0.6)',
  },
  loadingSpinnerWrap: {
    flex: 1,
    justifyContent: 'center',
  },
});

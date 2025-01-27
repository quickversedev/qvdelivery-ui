import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PendingOrders() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Deliveries</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

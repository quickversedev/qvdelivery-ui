import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ProfileScreenNavigationProp } from '../types';

export default function Orders() {
  const pendingOrders = [
    {
      id: 1,
      restaurantName: 'Restro Name 1',
      pendingOrders: 3,
    },
    {
      id: 2,
      restaurantName: 'Restro Name 2',
      pendingOrders: 1,
    },
    {
      id: 3,
      restaurantName: 'Restro Name 3',
      pendingOrders: 4,
    },
  ];

  const completedorders = [
    {
      id: 1,
      restaurantName: 'Restro Name 1',
      completedOrders: 4,
    },
    {
      id: 2,
      restaurantName: 'Restro Name 2',
      completedOrders: 1,
    },
  ];

  const pendingDeliveries = [
    {
      id: 1,
      restaurantName: 'Restro Name 1',
      pendingDeliveries: 4,
    },
    {
      id: 2,
      restaurantName: 'Restro Name 2',
      pendingDeliveries: 3,
    },
  ];

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [showPendingOrders, setShowPendingOrders] = useState(false);
  const [showCompletedOrders, setShowCompletedOrders] = useState(false);
  const [showPendingDeliveries, setShowPendingDeliveries] = useState(false);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const toggleSwitch = () => setIsSwitchOn(previousState => !previousState);

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const togglePendingOrders = () => {
    setShowPendingOrders(!showPendingOrders);
    setShowCompletedOrders(false);
    setShowPendingDeliveries(false);
  };

  const toggleCompletedOrders = () => {
    setShowCompletedOrders(!showCompletedOrders);
    setShowPendingOrders(false);
    setShowPendingDeliveries(false);
  };

  const togglePendingDeliveries = () => {
    setShowPendingDeliveries(!showPendingDeliveries);
    setShowPendingOrders(false);
    setShowCompletedOrders(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>

            {/* Container 1 */}
            <View style={styles.container1}>
              {/* User Profile */}
              <TouchableOpacity onPress={navigateToProfile}>
                <Ionicons name="person-circle" size={44} color="black" />
              </TouchableOpacity>
              {/* User Name */}
              <Text style={styles.profileText}>Roronoa Zoro</Text>
              {/* Switch button */}
              <Switch
                trackColor={{ false: 'red', true: '#90EE90' }}
                thumbColor={isSwitchOn ? '#fff' : '#fff'}
                ios_backgroundColor="#90EE90"
                onValueChange={toggleSwitch}
                value={isSwitchOn}
                style={styles.switch}
              />
            </View>

            {/* Completed Orders */}
            <View style={styles.container2}>
              <TouchableOpacity style={styles.card3} onPress={toggleCompletedOrders}>
                <Text style={styles.completedText}>Completed Orders</Text>
              </TouchableOpacity>
            </View>

            {isSwitchOn && (
              <>
                {/* Container 2 */}
                <View style={styles.container2}>
                  <View style={styles.orderCategory}>
                    <TouchableOpacity style={styles.card1} onPress={togglePendingOrders}>
                      <Text style={styles.orderText}>Pending Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card2} onPress={togglePendingDeliveries}>
                      <Text style={styles.deliveriesText}>Pending Deliveries</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {showPendingOrders && (
                  <View style={styles.container3}>
                    {pendingOrders.map(order => (
                      <View key={order.id} style={styles.row}>
                        <Text style={styles.rowText}>{order.restaurantName}</Text>
                        <Text style={styles.rowText2}>
                          {order.pendingOrders > 0
                            ? `${order.pendingOrders} Pending Orders`
                            : 'No Orders'}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                {showCompletedOrders && (
                  <View style={styles.container3}>
                    {completedorders.map(order => (
                      <View key={order.id} style={styles.row}>
                        <Text style={styles.rowText}>{order.restaurantName}</Text>
                        <Text style={styles.rowText2}>
                          {order.completedOrders > 0
                            ? `${order.completedOrders} Completed Orders`
                            : 'No Orders'}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                {showPendingDeliveries && (
                  <View style={styles.container3}>
                    {pendingDeliveries.map(order => (
                      <View key={order.id} style={styles.row}>
                        <Text style={styles.rowText}>{order.restaurantName}</Text>
                        <Text style={styles.rowText2}>
                          {order.pendingDeliveries > 0
                            ? `${order.pendingDeliveries} Pending Deliveries`
                            : 'No Deliveries'}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container1: {
    backgroundColor: '#FFDC52',
    height: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    paddingTop: 30,
  },
  container2: {
    marginTop: -18,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  container3: {
    flex: 1,
    marginTop: -5,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  profileText: {
    fontSize: 32,
    fontWeight: '400',
    color: '#020202',
    marginTop: -10,
    fontFamily: 'Battambang-Bold',
  },
  switch: {
    transform: [{ scaleX: 2 }, { scaleY: 2.4 }],
    marginTop: -4,
  },
  orderCategory: {
    height: 130,
    marginTop: -18,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingTop: 30,
  },
  card1: {
    height: 80,
    width: 120,
    backgroundColor: '#8F1413',
    borderRadius: 30,
    padding: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card2: {
    height: 80,
    width: 120,
    backgroundColor: '#F6DAD0',
    borderRadius: 30,
    padding: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card3: {
    height: 80,
    width: 120,
    backgroundColor: '#F6DAD0',
    borderRadius: 30,
    padding: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  orderText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '700',
  },
  completedText: {
    fontSize: 15,
    color: '#8F1413',
    fontWeight: '700',
  },
  deliveriesText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '700',
  },
  row: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 15,
    marginHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Battambang-Regular',
  },
  rowText2: {
    color: '#8F1413',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Battambang-Regular',
  },
});

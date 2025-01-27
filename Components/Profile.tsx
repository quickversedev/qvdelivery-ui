import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import Icons from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types';

export default function Profile() {
  const [isNotificationSwitchOn, setIsNotificationSwitchOn] = useState(false);
  const toggleNotificationSwitch = () =>
    setIsNotificationSwitchOn(previousState => !previousState);
    const navigation = useNavigation();
    const handleBackpress = () => {
      navigation.goBack();
    }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* Container 1 */}
            <View style={styles.container1}>
              {/* Back Arrow */}
              <TouchableOpacity onPress={handleBackpress}>
                <Icons name="chevron-left" size={44} color="black" />
              </TouchableOpacity>
              {/* Profile Title */}
              <Text style={styles.profileText}>Profile</Text>
            </View>
            {/* Container 2 */}
            <View style={styles.container2}>
              <Ionicons
                name="person-circle"
                size={44}
                color="black"
                style={styles.userIcon}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Roronoa Zoro</Text>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Completed Orders Section */}
            <View style={styles.OrdersContainer}>
              <View style={styles.OrdersTextContainer}>
                <Text style={styles.OrdersText}>Total Orders</Text>
                <Text style={styles.OrdersText}>Completed</Text>
              </View>
              <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>10</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.OrdersContainer}>
              <View style={styles.OrdersTextContainer}>
                <Text style={styles.OrdersText}>Total Time</Text>
                <Text style={styles.OrdersText}>Completed</Text>
              </View>
              <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>5</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.OrdersContainer}>
              <View style={styles.OrdersTextContainer}>
                <Text style={styles.OrdersText}>Average Daily</Text>
                <Text style={styles.OrdersText}>Delivery Rate</Text>
              </View>
              <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>2</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.notificationContainer}>
              <Text style={styles.notificationText}>Notification</Text>
              <Switch
                trackColor={{false: 'skyblue', true: '#90EE90'}}
                thumbColor={isNotificationSwitchOn ? '#fff' : '#fff'}
                ios_backgroundColor="#90EE90"
                onValueChange={toggleNotificationSwitch}
                value={isNotificationSwitchOn}
                style={styles.notificationSwitch}
              />
            </View>
            <View style={styles.contactUs}>
              <Text style={styles.contactUsText}>Contact Us</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#8080800F',
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
  profileText: {
    fontSize: 32,
    fontWeight: '400',
    color: 'black',
    marginTop: -6,
    marginRight: 100,
    fontFamily: 'Battambang-Bold',
  },
  container2: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -18,
  },
  userIcon: {
    marginRight: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  userName: {
    fontSize: 30,
    fontWeight: '400',
    color: 'black',
    marginRight: 10,
    fontFamily: 'Battambang-Bold',
  },
  editButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#FF0000',
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    fontFamily: 'Battambang-Bold',
  },
  OrdersContainer: {
    backgroundColor: '#FFFFFF',
    height: 60,
    width: '80%',
    marginTop: 20,
    marginLeft: 40,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  OrdersTextContainer: {
    flexDirection: 'column',
  },
  OrdersText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Battambang-Bold',
    lineHeight: 32,
  },
  orderButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#30B700',
    borderRadius: 5,
  },
  orderButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    fontFamily: 'Battambang-Bold',
  },
  notificationContainer: {
    backgroundColor: '#FFFFFF',
    height: 60,
    width: '80%',
    marginTop: 20,
    marginLeft: 40,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  notificationText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Battambang-Bold',
    lineHeight: 32,
  },
  notificationSwitch: {
    transform: [{scaleX: 2}, {scaleY: 2}],
  },
  contactUs: {
    backgroundColor: '#FFFFFF',
    height: 60,
    width: '80%',
    marginTop: 20,
    marginLeft: 40,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  contactUsText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Battambang-Bold',
    lineHeight: 32
  },
});

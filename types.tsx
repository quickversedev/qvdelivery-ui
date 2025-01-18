import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Homescreen: undefined;
  Login: undefined;
  Signup: undefined;
  Orders: undefined;
  CompletedOrders: undefined;
  Profile: undefined;
  PendingDeliveries: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Homescreen'
>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
export type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Signup'
>;
export type OrdersScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Orders'
>;
export type CompletedOrdersScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CompletedOrders'
>;
export type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

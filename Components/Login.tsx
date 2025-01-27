import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export default function Login() {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  // State Management
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* Container 1 for logo and back button */}
          <View style={styles.container1}>
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Icons name="arrow-left" size={40} color="white" />
            </TouchableOpacity>
            {/* Login Logo */}
            <Text style={styles.loginText}>Login</Text>
          </View>
          {/* Container 2 for mobile number and password inputs */}
          <View style={styles.container2}>
            {/* Mobile Number */}
            <Text style={styles.text}>Mobile Number</Text>
            <View style={styles.inputContainer}>
              <Icons
                name="phone"
                size={30}
                color="black"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                onChangeText={setMobileNumber}
                value={mobileNumber}
                placeholder="Enter mobile number"
                placeholderTextColor="black"
                keyboardType="phone-pad"
              />
            </View>
            {/* Password */}
            <Text style={styles.text}>Password</Text>
            <View style={styles.passwordContainer}>
              <Icons
                name="lock"
                size={30}
                color="black"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.passwordInput}
                onChangeText={setPassword}
                value={password}
                placeholder="Enter password"
                placeholderTextColor="black"
                secureTextEntry={!isPasswordVisible}
              />
              {/* Icon for show password */}
              <TouchableOpacity
                style={styles.showPasswordButton}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Icons name="eye" size={30} color="red" />
              </TouchableOpacity>
            </View>
            {/* Forget Password */}
            <TouchableOpacity>
              <Text style={styles.fptext}>Forget password</Text>
            </TouchableOpacity>
          </View>
          {/* Container 3 for login and signup button */}
          <View style={styles.container3}>
            {/* Login button */}
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.button}
              onPress={() => navigation.navigate('Orders')}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {/* Signup button */}
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signup}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container1: {
    height: '30%',
    backgroundColor: '#FFDC52',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center', // Center items horizontally
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  loginText: {
    fontSize: 50,
    color: 'white',
    fontFamily: 'Battambang-Bold',
  },
  container2: {
    height: '50%',
    width: '100%',
    marginTop: -40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  container3: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: '#000',
    marginLeft: 30,
    marginTop: 20,
    fontFamily: 'Battambang-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 20,
    marginTop: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 211, 44, 0.5)',
    paddingLeft: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    height: 60,
    flex: 1,
    fontFamily: 'Battambang-Regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 20,
    marginTop: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 211, 44, 0.5)',
    paddingLeft: 10,
  },
  passwordInput: {
    flex: 1,
    height: 60,
    fontFamily: 'Battambang-Regular',
  },
  showPasswordButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fptext: {
    paddingLeft: 280,
    color: '#8F1413',
    fontWeight: '500',
    fontFamily: 'Battambang-Regular',
  },
  signup: {
    color: 'red',
    fontWeight: '500',
    marginTop: 5,
    fontFamily: 'Battambang-Regular',
  },
  button: {
    backgroundColor: '#8F1413',
    padding: 8,
    height: 50,
    width: 180,
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Battambang-Bold',
  },
});

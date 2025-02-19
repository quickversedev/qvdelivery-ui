import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import React, { useState, useRef } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Button, Menu, Divider } from "react-native-paper";
import * as Haptics from "expo-haptics";
import TopTabNavigation from "../components/TopTabNavigation";

export default function Login({ navigation }: { navigation: any }) {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(true);

  // Refs for each OTP input field
  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // API call to request OTP
  const requestOtp = async () => {
    // if (loading) return;
    // setLoading(true);
    // const payload = {
    //   phone: `+91${phoneNumber}`,
    // };
    // try {
    //   const res = await getOTP(payload);
    //   console.log('OTP sent:', res);
    //   showToasterMessage('OTP sent!');
    //   setIsOtpSent(true);
    //   otpInputRefs[0].current.focus(); // Focus on the first OTP input
    // } catch (err) {
    //   console.error('error requesting OTP:', err);
    //   showToasterMessage(err?.response?.data?.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  // API call to verify OTP and login
  const loginWithOtp = async () => {
    // if (loading) return;
    // setLoading(true);
    // const fullOtp = otp.join(''); // Combine OTP digits into a single string
    // const payload = {
    //   phone: `+91${phoneNumber}`,
    //   otp: fullOtp,
    //   resend: false,
    // };
    // try {
    //   const res = await loginWithOTP(payload);
    //   console.log('Login with OTP:', res);
    //   const userRole = await AsyncStorage.getItem('userRole');
    //   const userDesignation = await AsyncStorage.getItem('userDesignation');
    //   // Logic to handle navigation based on user role and designation
    //   if (userRole === 'builder') {
    //     if (userDesignation === 'sales') {
    //       navigation.navigate('SalesTabNavigator');
    //     } else if (userDesignation === 'Engineer') {
    //       navigation.navigate('SiteEngineerTabNavigator');
    //     } else if (userDesignation === 'Admin') {
    //       navigation.navigate('AdminTabNavigator');
    //     } else {
    //       showToasterMessage('You don not have access:', userDesignation);
    //     }
    //   } else if (userRole === 'lead') {
    //     navigation.navigate('ConsumerTabNavigator');
    //   } else if (userRole === 'service-provider') {
    //     if (response.user.serviceProvider.is_onboarded) {
    //       navigation.navigate('ServiceProviderTabNavigator');
    //     } else {
    //       navigation.navigate('ServiceProviderOnboarding');
    //     }
    //   } else if (userRole === 'vendor') {
    //     if (response.user.vendor.is_onboarded) {
    //       navigation.navigate('VendorTabNavigator');
    //     } else {
    //       navigation.navigate('VendorOnboarding');
    //     }
    //   }
    //   showToasterMessage('Login successful');
    // } catch (err) {
    //   console.error('error logging in with OTP:', err);
    //   showToasterMessage(err?.response?.data?.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  // Handle OTP input and auto-focus on the next or previous field
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    const isBackspace = value === "";

    if (isBackspace) {
      // Handle backspace
      newOtp[index] = ""; // Clear current input
      if (index > 0) {
        otpInputRefs[index - 1].current.focus(); // Move focus to the previous input
      }
    } else {
      newOtp[index] = value;
      if (value && index < 3) {
        otpInputRefs[index + 1].current.focus(); // Move focus to the next input
      }
    }

    setOtp(newOtp);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFDC52", alignItems: "center" }}
    >
      <TopTabNavigation
        title={"Sign Up"}
        onBackPress={() => navigation.goBack()}
      />

      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "70%",
          marginTop: "auto",
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
          alignItems: "center",
          paddingTop: 40,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          keyboardType="phone-pad"
          style={styles.formInput}
          placeholder={"Enter number"}
          placeholderTextColor={"grey"}
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
        />

        <Text style={styles.label}>OTP</Text>
        {isOtpSent && (
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={otpInputRefs[index]}
                style={[styles.otpInput, { marginHorizontal: 8 }]}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(value) => handleOtpChange(index, value)}
                value={digit}
              />
            ))}
          </View>
        )}

        <Button
          mode="elevated"
          textColor={"#FFDC52"}
          style={styles.buttonSecondary}
          contentStyle={{ height: 60 }}
          labelStyle={{ fontSize: 20, fontWeight: "bold" }}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            console.log("submit OTP pressed");
            navigation.navigate("Orders");
          }}
        >
          {!isOtpSent ? "Send OTP" : "Submit OTP"}
        </Button>

        {/* <Text style={{ marginBottom: 18, fontSize: 16 }}>
          Don't have an account?{" "}
          <Text
            style={{ color: "#E95322" }}
            // onPress={() => router.push("/register")}
          >
            Sign Up
          </Text>
        </Text> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // label
  label: {
    width: "100%",
    color: "black",
    fontSize: 25,
  },

  // form Input
  formInput: {
    width: "100%",
    height: 60,
    justifyContent: "center", //for datePicker
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 16,
    backgroundColor: "#FFDC52",
    color: "black",
    fontSize: wp("4"),
    marginTop: 5,
    marginBottom: 20,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
  },

  buttonSecondary: {
    width: "50%",
    backgroundColor: "#8F1413",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 23,
    marginTop: "auto",
    marginBottom: 86,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  otpInput: {
    borderColor: "#B3B3B3",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    padding: 10,
    width: 40,
    height: 50,
  },
});

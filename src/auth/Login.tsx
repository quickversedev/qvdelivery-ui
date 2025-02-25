import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import React, { useState, useRef } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Button, Menu, Divider } from "react-native-paper";
import * as Haptics from "expo-haptics";
import TopTabNavigation from "../components/TopTabNavigation";
import { globalStyles } from "../GlobalStyles";

import { useDispatch } from "react-redux";
import { setToken } from "../../store"; // Import Redux action

export default function Login({ navigation }: { navigation: any }) {
  const dispatch = useDispatch(); // Get dispatch function

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
    // };
    // try {
    //   const res = await loginWithOTP(payload);
    //   console.log("Login with OTP:", res);
    //   // Store token in Redux
    //   dispatch(setToken(res.token));
    //   navigation.navigate("Orders");
    //   console.log("Token:", res.token);
    //   showToasterMessage("Login successful");
    // } catch (err) {
    //   console.error("Error logging in with OTP:", err);
    //   showToasterMessage(err?.response?.data?.message)dispatch;
    // } finally {
    //   setLoading(false);
    // }

    // const fullOtp = Number(otp.join(""));
    // console.log("LLL", fullOtp);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log("submit OTP pressed");
    dispatch(setToken("sjkdcnkjsnkdjncksndkjcnsd"));
    // navigation.navigate("Orders");
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
      style={[globalStyles.safeAreaView, { backgroundColor: "#FFDC52" }]}
    >
      <TopTabNavigation
        title={"Sign Up"}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.whiteContainer}>
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
          onPress={loginWithOtp}
        >
          {!isOtpSent ? "Send OTP" : "Submit OTP"}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  whiteContainer: {
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
  },

  label: {
    width: "100%",
    color: "black",
    fontSize: 25,
  },

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

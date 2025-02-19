import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import React, { useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Button } from "react-native-paper";

import * as Haptics from "expo-haptics";
import TopTabNavigation from "../components/TopTabNavigation";
import DropdownCmp from "../components/DropdownCmp";

export default function register() {
  const allCampus = [{ name: "campus One" }, { name: "campus Two" }];
  const [selectedCampus, setSelectedCampus] = useState("");

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFDC52", alignItems: "center" }}
    >
      <TopTabNavigation title={"Sign Up"}  />

      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "78%",
          marginTop: "auto",
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
          alignItems: "center",
          paddingTop: 40,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.formInput}
          placeholder={"Enter name"}
          placeholderTextColor={"grey"}
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.formInput}
          placeholder={"Enter number"}
          placeholderTextColor={"grey"}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.formInput}
          placeholder={"Enter password"}
          placeholderTextColor={"grey"}
        />

        <Text style={styles.label}>Campus</Text>
          <DropdownCmp
          data={allCampus}
          onSelect={(selectedItem: { name: string }) =>
            setSelectedCampus(selectedItem.name)
          }
          placeholder="Select Campus"
          width="100%"
          disable={false}
        />

        <Button
          mode="elevated"
          textColor={"#FFDC52"}
          style={styles.buttonSecondary}
          contentStyle={{ height: 60 }}
          labelStyle={{ fontSize: 20, fontWeight: "bold" }}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            console.log("signUp pressed");
            // router.push("/register");
          }}
        >
          Sign Up
        </Button>

        <Text style={{ marginBottom: 18, fontSize: 16 }}>
          Already have an account?{" "}
          <Text
            style={{ color: "#E95322" }}
            // onPress={() => router.push("/login")}
          >
            Log in
          </Text>
        </Text>
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
    marginBlock: 26,
  },
});

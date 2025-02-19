import { Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "react-native-paper";
import * as Haptics from "expo-haptics";
import ImageList from "../ImageList";

export default function Entry({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <Image
        source={ImageList.loginBackGround}
        style={{
          position: "absolute",
          objectFit: "contain",
          top: -25,
        }}
      />

      <Image
        source={ImageList.Logo}
        style={{
          position: "absolute",
          objectFit: "contain",
          width: "80%",
          height: "80%",
        }}
      />

      <Button
        mode="elevated"
        textColor="#FFDC52"
        style={styles.buttonPrimary}
        contentStyle={{ height: 60 }}
        labelStyle={{ fontSize: 24, fontWeight: "bold" }}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          console.log("Login pressed");
          navigation.navigate("Login");
        }}
      >
        Log In
      </Button>

      {/* <Button
        mode="elevated"
        textColor={"#8F1413"}
        style={styles.buttonSecondary}
        contentStyle={{ height: 60 }}
        labelStyle={{ fontSize: 20, fontWeight: "bold" }}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          console.log("signUp pressed");
        navigation.navigate("register");
        }}
      >
        Sign Up
      </Button> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonPrimary: {
    width: "50%",
    backgroundColor: "#8F1413",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 23,
    marginTop: "auto",
    marginBottom: 50,
  },
  buttonSecondary: {
    width: "50%",
    backgroundColor: "#FFDC52",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 23,
    marginTop: 20,
    marginBottom: 50,
  },
});

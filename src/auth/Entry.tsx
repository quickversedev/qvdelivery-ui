import { Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "react-native-paper";
import * as Haptics from "expo-haptics";
import ImageList from "../ImageList";
import { globalStyles } from "../GlobalStyles";

export default function Entry({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <Image source={ImageList.loginBackGround} style={styles.bgYellow} />

      <Image source={ImageList.Logo} style={styles.logo} />

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgYellow: {
    position: "absolute",
    objectFit: "contain",
    top: -25,
  },
  logo: {
    position: "absolute",
    objectFit: "contain",
    width: "80%",
    height: "80%",
  },
  buttonPrimary: {
    width: "50%",
    backgroundColor: "#8F1413",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 23,
    marginTop: "auto",
    marginBottom: 50,
  },
});

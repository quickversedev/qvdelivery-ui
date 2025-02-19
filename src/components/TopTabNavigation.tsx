import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import ImageList from "../ImageList";


// Define the props type
interface TopTabNavigationProps {
  title: string;
  onBackPress?: () => void; // Add onBackPress prop
}

export default function TopTabNavigation({
  title,
  onBackPress,
}: TopTabNavigationProps): JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={{ flex: 1 }}>
        <Image source={ImageList.backBtn} style={styles.backButton} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "22%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    objectFit: "contain",
    height: 40,
    width: 40,
    marginLeft: 14,
  },
  title: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
  },
});

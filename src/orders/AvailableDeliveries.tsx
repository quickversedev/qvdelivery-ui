import { View, Text, BackHandler } from "react-native";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AvailOrdersCard from "./Components/AvailOrdersCard";
import { globalStyles } from "../GlobalStyles";
import DropdownCmp from "../components/DropdownCmp";

export default function AvailableDeliveries() {
  const allCampus = [{ name: "campus One" }, { name: "campus Two" }];
  const [selectedCampus, setSelectedCampus] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true; // Prevent going back
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  return (
    <View style={globalStyles.wrapper}>
      <DropdownCmp
        data={allCampus}
        onSelect={(selectedItem: { name: string }) =>
          setSelectedCampus(selectedItem.name)
        }
        placeholder="Select Campus"
        width="100%"
        disable={false}
      />

      <AvailOrdersCard />
      <AvailOrdersCard />
      <AvailOrdersCard />
      <AvailOrdersCard />
      <AvailOrdersCard />
      <AvailOrdersCard />
      <AvailOrdersCard />
    </View>
  );
}

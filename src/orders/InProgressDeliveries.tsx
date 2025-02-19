import { View, Text } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../GlobalStyles";
import InProgressOrdersCard from "./Components/InProgressOrdersCard";
import DropdownCmp from "../components/DropdownCmp";

export default function InProgressDeliveries() {
  const allCampus = [{ name: "campus One" }, { name: "campus Two" }];
  const [selectedCampus, setSelectedCampus] = useState("");

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

      <InProgressOrdersCard />
      <InProgressOrdersCard />
      <InProgressOrdersCard />
      <InProgressOrdersCard />
      <InProgressOrdersCard />
    </View>
  );
}

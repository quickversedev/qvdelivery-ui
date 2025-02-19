import { View, Text } from "react-native";
import React, { useState } from "react";
import CompletedOrdersCard from "./Components/CompletedOrdersCard";
import DropdownCmp from "../components/DropdownCmp";
import { globalStyles } from "../GlobalStyles";

export default function CompletedDeliveries() {
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

      <CompletedOrdersCard />
      <CompletedOrdersCard />
      <CompletedOrdersCard />
      <CompletedOrdersCard />
      <CompletedOrdersCard />
    </View>
  );
}

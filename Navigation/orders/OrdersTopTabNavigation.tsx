import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AvailableDeliveries from "../../src/orders/AvailableDeliveries";
import InProgressDeliveries from "../../src/orders/InProgressDeliveries";
import CompletedDeliveries from "../../src/orders/CompletedDeliveries";

const TopTab = createMaterialTopTabNavigator();

export default function OrdersTopTabNavigation() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Available" component={AvailableDeliveries} />
      <TopTab.Screen name="In Progress" component={InProgressDeliveries} />
      <TopTab.Screen name="Completed" component={CompletedDeliveries} />
    </TopTab.Navigator>
  );
}

import React, { useState } from "react";
import { Switch, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Entry from "../src/auth/Entry";
import Login from "../src/auth/Login";
import OrdersTopTabNavigation from "./orders/OrdersTopTabNavigation";

const StackNavigation = createNativeStackNavigator();

export default function Navigation() {
  const [isActive, setIsActive] = useState(true);

  return (
    <NavigationContainer>
      <StackNavigation.Navigator screenOptions={{ headerShown: false }}>
        <StackNavigation.Screen name="Entry" component={Entry} />
        <StackNavigation.Screen name="Login" component={Login} />
        <StackNavigation.Screen
          name="Orders"
          component={OrdersTopTabNavigation}
          options={{
            headerShown: true,
            title: "Orders",
            headerRight: () => (
              <>
                <Text>{isActive ? "Active" : "Inactive"}</Text>
                <Switch
                  value={isActive}
                  onValueChange={() => setIsActive((prev) => !prev)}
                />
              </>
            ),
          }}
        />
      </StackNavigation.Navigator>
    </NavigationContainer>
  );
}

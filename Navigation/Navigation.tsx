import React, { useState, useEffect } from "react";
import { Switch, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Entry from "../src/auth/Entry";
import Login from "../src/auth/Login";
import OrdersTopTabNavigation from "./orders/OrdersTopTabNavigation";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { useSelector, useDispatch } from "react-redux";
import { toggleIsActive, clearToken } from "../store";

const StackNavigation = createNativeStackNavigator();

export default function Navigation(): JSX.Element {
  const token = useSelector((state: any) => state.app.token); // Assuming token is stored in app reducer
  const isActive = useSelector((state: any) => state.app.isActive);
  const dispatch = useDispatch();

  // Show loading while initial state is being determined
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate the initial loading check
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <NavigationContainer>
      <StackNavigation.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <>
            <StackNavigation.Screen
              name="Orders"
              component={OrdersTopTabNavigation}
              options={({ navigation }) => ({
                headerShown: true,
                title: "Orders",
                headerRight: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text>{isActive ? "Active" : "Inactive"}</Text>
                    <Switch
                      value={isActive}
                      onValueChange={(value) => dispatch(toggleIsActive())}
                    />
                  </View>
                ),
                headerLeft: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      name="logout"
                      style={{ fontSize: 28, marginRight: 12 }}
                      onPress={() => {
                        dispatch(clearToken());
                      }}
                    />
                  </View>
                ),
              })}
            />
          </>
        ) : (
          <>
            <StackNavigation.Screen name="Entry" component={Entry} />
            <StackNavigation.Screen name="Login" component={Login} />
          </>
        )}
      </StackNavigation.Navigator>
    </NavigationContainer>
  );
}

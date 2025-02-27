import React, { useState, useEffect } from "react";
import { View, Text, Switch, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrdersTopTabNavigation from "../../Navigation/orders/OrdersTopTabNavigation";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useSelector, useDispatch } from "react-redux";
import { toggleIsActive, setIsActive } from "../../store";
import { useAuth } from "../contexts/Auth";

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  const [loading, setLoading] = useState(true);
  const isActive = useSelector((state: any) => state.app.isActive);
  const dispatch = useDispatch();

  const auth = useAuth();

  // Load isActive from AsyncStorage on app start
  useEffect(() => {
    const loadIsActive = async () => {
      try {
        const storedIsActive = await AsyncStorage.getItem("isActive");
        if (storedIsActive !== null) {
          dispatch(setIsActive(JSON.parse(storedIsActive)));
        }
      } catch (error) {
        console.error("Error loading isActive:", error);
      } finally {
        setLoading(false);
      }
    };

    loadIsActive();
  }, [dispatch]);

  // Update AsyncStorage when the switch is toggled
  const handleToggle = async () => {
    const newValue = !isActive;
    dispatch(toggleIsActive());

    try {
      await AsyncStorage.setItem("isActive", JSON.stringify(newValue));
    } catch (error) {
      console.error("Error saving isActive:", error);
    }
  };

  // Show loading spinner until `isActive` is fetched
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Orders"
        component={OrdersTopTabNavigation}
        options={({ navigation }) => ({
          headerShown: true,
          title: "Orders",
          headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="logout"
                style={{ fontSize: 28, marginRight: 12 }}
                onPress={auth.signOut}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>{isActive ? "Active" : "Inactive"}</Text>
              <Switch value={isActive} onValueChange={handleToggle} />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

//

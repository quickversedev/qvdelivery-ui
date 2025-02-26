import React from "react";
import { View, Text, Switch } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrdersTopTabNavigation from "../../Navigation/orders/OrdersTopTabNavigation";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { useSelector, useDispatch } from "react-redux";
import { toggleIsActive, clearToken } from "../../store";
import { useAuth } from "../contexts/Auth";

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  const isActive = useSelector((state: any) => state.app.isActive);
  const dispatch = useDispatch();

  const auth = useAuth();

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
              <Switch
                value={isActive}
                onValueChange={(value) => dispatch(toggleIsActive())}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

//

import React from "react";
import { View, Text, Switch } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrdersTopTabNavigation from "../../Navigation/orders/OrdersTopTabNavigation";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { useSelector, useDispatch } from "react-redux";
import { toggleIsActive, clearToken } from "../../store";

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  const token = useSelector((state: any) => state.app.token);
  const isActive = useSelector((state: any) => state.app.isActive);
  const dispatch = useDispatch();

  return (
    <Stack.Navigator>
      <Stack.Screen
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
    </Stack.Navigator>
  );
};

//

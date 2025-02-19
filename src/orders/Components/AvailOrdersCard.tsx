import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Button,
} from "react-native";

export default function AvailOrdersCard({
  orderNo,
  vendorname,
  time,
  pickupAddress,
  dropAddress,
  vendorPhoneNumber,
  items,
  onAccept, // Callback function when Accept is clicked
}: {
  orderNo: number;
  vendorname: string;
  time: string;
  pickupAddress: string;
  dropAddress: string;
  vendorPhoneNumber: number;
  items: string;
  onAccept?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  };

  const heightInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150], // Adjust height for content + button
  });

  return (
    <TouchableOpacity
      onPress={toggleExpand}
      style={{
        width: "100%",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        marginBottom: 12,
        padding: 12,
        backgroundColor: expanded ? "#f0f0f0" : "#fff",
      }}
      activeOpacity={0.8}
    >
      {/* Header Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>{`Order: #${orderNo || 0}`}</Text>
        <Text>{`Vendor: ${vendorname || "VendorName"}`}</Text>
      </View>

      {/* Expanded Content with Animation */}
      <Animated.View
        style={{
          height: heightInterpolation,
          overflow: "hidden",
          marginTop: 8,
        }}
      >
        {/*  */}
        <Text>{`Time: ${time || "Jan 1, 12:25pm"}`}</Text>
        <Text>{`Pickup: ${pickupAddress || "pickupAddresss/vendor"}`}</Text>
        <Text>{`Drop: ${dropAddress || "dropAddress/campus"}`}</Text>
        <Text>{`Vendor Phone: ${vendorPhoneNumber || 1234567890}`}</Text>
        <Text>{`Items: ${items || "items"}`}</Text>

        {/* Accept Button */}
        <TouchableOpacity
          onPress={onAccept}
          style={{
            marginTop: 10,
            backgroundColor: "#4CAF50",
            paddingVertical: 8,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Accept</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
}

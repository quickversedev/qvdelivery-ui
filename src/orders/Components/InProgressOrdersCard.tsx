import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function InProgressOrdersCard({
  orderNo,
  vendorname,
  time,
  pickupAddress,
  dropAddress,
  vendorPhoneNumber,
  items,
  onAccept,
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
  return (
    <View
      style={{
        width: "100%",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        marginBottom: 12,
        padding: 12,
      }}
    >
      <Text>{`Order: #${orderNo || 0}`}</Text>
      <Text>{`Vendor: ${vendorname || "VendorName"}`}</Text>

      <Text>{`Time: ${time || "Jan 1, 12:25pm"}`}</Text>
      <Text>{`Pickup: ${pickupAddress || "pickupAddresss/vendor"}`}</Text>
      <Text>{`Drop: ${dropAddress || "dropAddress/campus"}`}</Text>
      <Text>{`Vendor Phone: ${vendorPhoneNumber || 1234567890}`}</Text>
      <Text>{`Items: ${items || "items"}`}</Text>

      {/* pickup Button */}
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
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Confirm Pickup
        </Text>
      </TouchableOpacity>
    </View>
  );
}

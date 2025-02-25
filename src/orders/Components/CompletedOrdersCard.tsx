import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Checkbox } from "react-native-paper";

export default function CompletedOrdersCard({
  orderNo,
  vendorname,
  customerName,
  customerPh,
  time,
  pickupAddress,
  dropAddress,
  vendorPhoneNumber,
  items,
  disabled,
  onAccept,
}: {
  orderNo: number;
  vendorname: string;
  customerName: string;
  customerPh: Number;
  time: string;
  pickupAddress: string;
  dropAddress: string;
  vendorPhoneNumber: number;
  items: string;
  disabled: boolean;
  onAccept?: () => void;
}) {
  return (
    <View
      style={{
        width: "90%",
        borderWidth: 1.5,
        borderColor: "#EEEEEE",
        borderRadius: 8,
        marginBottom: 18,
        padding: 12,
        backgroundColor: "#fff",

        // Shadows for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        // Elevation for Android
        elevation: 9,
      }}
    >
      <Text>{`Order: #${orderNo || 0}`}</Text>
      <Text>{`Vendor: ${vendorname || "VendorName"}`}</Text>
      <Text>{`Customer: ${customerName || "customerName"}`}</Text>
      <Text>{`Customer Ph: ${customerPh || 1234567890}`}</Text>
      <Text>{`Time: ${time || "Jan 1, 12:25pm"}`}</Text>
      <Text>{`Pickup: ${pickupAddress || "pickupAddresss/vendor"}`}</Text>
      <Text>{`Drop: ${dropAddress || "dropAddress/campus"}`}</Text>
      <Text>{`Vendor Phone: ${vendorPhoneNumber || 1234567890}`}</Text>
      <Text>{`Items: ${items || "items"}`}</Text>
    </View>
  );
}

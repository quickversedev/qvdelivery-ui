import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function AvailOrdersCard({
  orderNo,
  vendorname,
  time,
  pickupAddress,
  dropAddress,
  vendorPhoneNumber,
  items,
  disabled,
  onAccept, // Callback function when Accept is clicked
  viewItem,
}: {
  orderNo: number;
  vendorname: string;
  time: string;
  pickupAddress: string;
  dropAddress: string;
  vendorPhoneNumber: number;
  items: string;
  disabled: boolean;
  onAccept?: () => void;
  viewItem?: () => void;
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
      {/* Header Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>{`#${
          orderNo || 0
        }`}</Text>
        <Text
          style={{
            backgroundColor: "pink",
            color: "red",
            paddingHorizontal: 14,
            paddingVertical: 4,
            borderRadius: 10,
          }}
        >{`Vendor: ${vendorname || "VendorName"}`}</Text>
      </View>

      {/* Content */}
      <View style={{ marginTop: 8 }}>
        <Text>{`Time: ${time || "Jan 1, 12:25pm"}`}</Text>
        <Text>{`Pickup: ${pickupAddress || "pickupAddress/vendor"}`}</Text>
        <Text>{`Drop: ${dropAddress || "dropAddress/campus"}`}</Text>
        <Text>{`Vendor Phone: ${vendorPhoneNumber || 1234567890}`}</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>{`Items: ${items || "items"}`}</Text>

          {/* viewItems Btn */}
          <TouchableOpacity
            onPress={viewItem}
            style={{
              marginTop: 10,
              backgroundColor: disabled ? "grey" : "#4CAF50",
              paddingVertical: 8,
              borderRadius: 8,
              alignItems: "center",
              padding: 5,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>View all</Text>
          </TouchableOpacity>
        </View>

        {/* Accept Button */}
        <TouchableOpacity
          onPress={onAccept}
          disabled={disabled}
          style={{
            marginTop: 10,
            backgroundColor: disabled ? "grey" : "#4CAF50",
            paddingVertical: 8,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

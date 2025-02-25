import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import CompletedOrdersCard from "./Components/CompletedOrdersCard";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import SelectDropdown from "react-native-select-dropdown";
import DropdownCmp from "../components/DropdownCmp";
import { globalStyles } from "../GlobalStyles";
import { mockOrders as originalMockOrders } from "../mockData";

export default function CompletedDeliveries() {
  const allCampus = [
    { title: "Campus One", id: 1 },
    { title: "Campus Two", id: 2 },
    { title: "Campus Three", id: 3 },
    { title: "Campus Four", id: 4 },
  ];

  const [selectedCampus, setSelectedCampus] = useState("");
  const [shuffledOrders, setShuffledOrders] = useState(originalMockOrders);

  useEffect(() => {
    if (selectedCampus) {
      const filteredOrders = originalMockOrders.filter(
        (order) => order.campus === selectedCampus.id
      );
      setShuffledOrders(shuffleArray(filteredOrders));
    }
  }, [selectedCampus]);

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.scrollView}
        contentContainerStyle={globalStyles.contentContainerStyle}
      >
        <SelectDropdown
          data={allCampus}
          onSelect={(selectedItem) => {
            setSelectedCampus(selectedItem); // Store the selected campus object
            console.log("Selected Campus:", selectedItem);
          }}
          renderButton={(selectedItem, isOpened) => (
            <View style={styles.dropdownButtonStyle}>
              {selectedItem && (
                <Icon
                  name={selectedItem.icon}
                  style={styles.dropdownButtonIconStyle}
                />
              )}
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || "Filter Campus"}
              </Text>
              <Icon
                name={isOpened ? "chevron-up" : "chevron-down"}
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          )}
          renderItem={(item, index, isSelected) => (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: "#D2D9DF" }),
              }}
            >
              <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />

        {shuffledOrders.map((item, index) => (
          <CompletedOrdersCard
            key={index}
            orderNo={item.orderId}
            vendorname={item.shopId}
            customerName={item?.customerName}
            customerPh={item?.customerMobileNumber}
            time={item.creationTime}
            pickupAddress={`${item.customerDeliveryAddress.addressLine1}, ${item.customerDeliveryAddress.addressLine2}, ${item.customerDeliveryAddress.city}, ${item.customerDeliveryAddress.state}, ${item.customerDeliveryAddress.pincode}`}
            dropAddress={`${item.customerDeliveryAddress.addressLine1}, ${item.customerDeliveryAddress.addressLine2}, ${item.customerDeliveryAddress.city}, ${item.customerDeliveryAddress.state}, ${item.customerDeliveryAddress.pincode}`}
            vendorPhoneNumber={item.customerMobileNumber}
            items={item.totalItemCount}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // select dropDown
  dropdownButtonStyle: {
    width: "90%",
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    marginVertical: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

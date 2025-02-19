// DropdownCmp.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DropdownCmp = ({ data, onSelect, placeholder, width, disable }) => {
  const renderButton = (selectedItem, isOpened) => (
    <View
      style={[
        styles.dropdownButton,
        {
          width: width || "100%",
          backgroundColor: disable ? "#F2F2F2" : "white",
          borderColor: disable ? "#CCCCCC" : "#E6E6E6",
        },
      ]}
    >
      <Text
        style={[
          styles.dropdownButtonText,
          { color: selectedItem ? "black" : "grey" },
        ]}
      >
        {selectedItem
          ? selectedItem?.name ||
            selectedItem?.unitName ||
            selectedItem?.user?.name ||
            selectedItem?.title ||
            selectedItem.jobTitle
          : placeholder}
      </Text>
      {!disable && (
        <Icon
          name={isOpened ? "chevron-up" : "chevron-down"}
          style={styles.dropdownArrow}
          color="grey"
        />
      )}
    </View>
  );

  const renderItem = (item, index, isSelected) => (
    <View
      style={[styles.dropdownItem, isSelected && styles.selectedDropdownItem]}
    >
      <Text style={styles.dropdownItemText}>
        {item?.name ||
          item?.unitName ||
          item?.user?.name ||
          item?.title ||
          item?.jobTitle}
      </Text>
    </View>
  );

  return (
    <SelectDropdown
      disabled={disable}
      data={data}
      onSelect={onSelect}
      renderButton={renderButton}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenu}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  dropdownButtonText: {
    flex: 1,
    fontSize: wp("4%"),
    fontFamily: "HelveticaNeueLight",
  },
  dropdownArrow: {
    fontSize: wp("7%"),
  },

  // dropDown menu
  dropdownMenu: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItem: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedDropdownItem: {
    backgroundColor: "#D2D9DF",
  },
  dropdownItemText: {
    flex: 1,
    fontSize: wp("4%"),
    fontWeight: "500",
    color: "black",
  },
});

export default DropdownCmp;

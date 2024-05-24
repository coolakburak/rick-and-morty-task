import React from "react";
import { View, Button } from "react-native";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Button
        color={"#99f773"}
        title="Previous"
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <Button
        color={"#99f773"}
        title="Next"
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </View>
  );
};

export default Pagination;

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const EpisodeCard = ({ episode, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{episode.name}</Text>
      <Text style={styles.date}>{episode.air_date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    borderColor: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "white",
  },
  date: {
    color: "#ccc",
    fontSize: 14,
  },
});

export default EpisodeCard;

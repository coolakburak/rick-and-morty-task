import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/slices/favoriteSlice";

const CharacterCard = ({ character, onPress }) => {
  const favorites = useSelector((state) => state.favorites.favoriteCharacters);

  const isFavorite = favorites.some(
    (char) => char.id?.toString() === character?.id?.toString()
  );
  const dispatch = useDispatch();

  const handleToggleFavorite = () => {
    if (isFavorite) {
      Alert.alert(
        "Remove Favorite",
        `${character?.name} isimli karakteri favorilerden kaldırmak istediğinize emin misiniz? ?`,
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes",
            onPress: () => {
              dispatch(removeFavorite(character));
            },
          },
        ]
      );
    } else {
      dispatch(addFavorite(character));
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
          alignItems: "center",
        }}
      >
        <View style={styles.info}>
          <Text style={styles.name}>{character.name}</Text>
          <Text style={styles.status}>
            {character.status} - {character.species}
          </Text>
        </View>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "red" : "white"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    borderColor: "white",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  status: {
    color: "white",
    fontSize: 16,
  },
});

export default CharacterCard;

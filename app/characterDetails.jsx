import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { fetchCharacterDetails } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/slices/favoriteSlice";
import { useLocalSearchParams } from "expo-router";

const CharacterDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const [character, setCharacter] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favoriteCharacters);
  const isFavorite = favorites.some(
    (char) => char.id?.toString() === character?.id?.toString()
  );

  useEffect(() => {
    const loadCharacterDetails = async () => {
      const data = await fetchCharacterDetails(id);
      setCharacter(data);
    };
    loadCharacterDetails();
  }, [id]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(character));
    } else {
      dispatch(addFavorite(character));
    }
  };

  return (
    <View style={styles.container}>
      {character ? (
        <>
          <Image source={{ uri: character.image }} style={styles.image} />
          <Text style={styles.name}>{character.name}</Text>
          <Text style={styles.status}>
            {character.status} - {character.species}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleToggleFavorite}
          >
            <Text style={styles.buttonText}>
              {isFavorite ?  "Remove from Favorites" : "Add to Favorites"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#00afcd",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 42,
    marginBottom: 10,
    color: "white",
  },
  status: {
    fontSize: 24,
    color: "white",
  },
  button: {
    backgroundColor: "#99f773",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 250,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
  },
});

export default CharacterDetailScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { fetchEpisodeDetails, fetchCharacterDetails } from "../api";
import CharacterCard from "../components/CharacterCard";
import { useLocalSearchParams, useNavigation } from "expo-router";

const EpisodeDetail = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEpisodeDetails = async () => {
      try {
        const episodeData = await fetchEpisodeDetails(id);
        setEpisode(episodeData);

        const characterPromises = episodeData.characters.map((url) =>
          fetchCharacterDetails(url.split("/").pop())
        );
        const characterData = await Promise.all(characterPromises);
        setCharacters(characterData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadEpisodeDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {episode && (
        <>
          <Text style={styles.title}>{episode.name}</Text>
          <Text style={styles.date}>{episode.air_date}</Text>
          <FlatList
            data={characters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CharacterCard
                character={item}
                onPress={() =>
                  navigation.navigate("characterDetails", { id: item.id })
                }
              />
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#00afcd",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  date: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
});

export default EpisodeDetail;

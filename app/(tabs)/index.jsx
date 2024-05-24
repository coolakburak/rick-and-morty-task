import React, { useEffect, useState } from "react";
import {
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator as Spinner,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { fetchEpisodes } from "../../api";
import EpisodeCard from "../../components/EpisodeCard";
import Pagination from "../../components/Pagination";
import { useRouter } from "expo-router";
import _ from "lodash";

const HomeScreen = () => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadEpisodes = async () => {
      setLoading(true);
      try {
        const data = await fetchEpisodes(page);
        setEpisodes(data?.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching episodes:", error);
        setLoading(false);
      }
    };

    loadEpisodes();
  }, [page]);

  const handleSearch = _.debounce((query) => {
    let filtered = [...episodes];
    if (query) {
      filtered = filtered.filter((ep) =>
        ep.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredEpisodes(filtered);
  }, 400);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  return (
    <TouchableOpacity
      accessible={false}
      activeOpacity={1}
      onPress={Keyboard.dismiss}
      style={styles.container}
    >
      <TextInput
        style={styles.search}
        placeholderTextColor={"#fff"}
        placeholder="Bölüm ara..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <Spinner style={styles.spinner} />
      ) : (
        <>
          {episodes?.length || filteredEpisodes?.length ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredEpisodes?.length ? filteredEpisodes : episodes}
              keyExtractor={(item) => item?.id.toString()}
              renderItem={({ item }) => (
                <EpisodeCard
                  episode={item}
                  onPress={() =>
                    router.push({
                      pathname: "episodeDetail",
                      params: { id: item?.id },
                    })
                  }
                />
              )}
            />
          ) : (
            <Text>No episodes found.</Text>
          )}
          <Pagination
            currentPage={page}
            totalPages={3}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#00afcd",
  },
  search: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    color: "#fff",
  },
  spinner: {
    position: "absolute",
    top: 50,
    left: 50,
    right: 50,
    bottom: 50,
  },
});

export default HomeScreen;

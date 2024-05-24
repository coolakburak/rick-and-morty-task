import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator as Spinner,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { fetchCharactersByPage } from "../../api";
import CharacterCard from "../../components/CharacterCard";
import Pagination from "../../components/Pagination";
import { useNavigation } from "expo-router";
import _ from "lodash";
import { Picker } from "@react-native-picker/picker";

const AllCharactersScreen = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      const data = await fetchCharactersByPage(page);
      setCharacters(data?.results);
      setTotalPages(data?.info?.pages);
      setLoading(false);
    };
    loadCharacters();
  }, [page]);

  const handleSearch = useCallback(
    _.debounce((query, status) => {
      let filtered = [...characters];
      if (query) {
        filtered = filtered.filter((char) =>
          char?.name?.toLowerCase().includes(query.toLowerCase())
        );
      }
      if (status) {
        filtered = filtered.filter(
          (char) => char?.status?.toLowerCase() === status.toLowerCase()
        );
      }
      setFilteredCharacters(filtered);
    }, 300),
    [characters]
  );

  useEffect(() => {
    handleSearch(searchQuery, statusFilter);
  }, [searchQuery, statusFilter, handleSearch]);

  return (
    <TouchableOpacity
      accessible={false}
      style={styles.container}
      onPress={Keyboard.dismiss}
      activeOpacity={1}
    >
      {loading ? (
        <Spinner style={styles.spinner} />
      ) : (
        <>
          <TextInput
            style={styles.search}
            placeholder="Karakter Ara..."
            placeholderTextColor={"#fff"}
            
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => handleSearch(searchQuery)}
          />
          <Picker
            selectedValue={statusFilter}
            style={styles.picker}
            onValueChange={(itemValue) => setStatusFilter(itemValue)}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="Alive" value="Alive" />
            <Picker.Item label="Dead" value="Dead" />
          </Picker>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredCharacters}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={({ item }) => (
              <CharacterCard
                character={item}
                onPress={() =>
                  navigation.navigate("characterDetails", { id: item?.id })
                }
              />
            )}
          />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
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
    color: "white",
  },
  spinner: {
    position: "absolute",
    top: 50,
    left: 50,
    right: 50,
    bottom: 50,
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  picker: {
    color: "white",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
  },
});

export default AllCharactersScreen;

import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CharacterCard from "../../components/CharacterCard";
import { loadFavorites } from "../../redux/slices/favoriteSlice";
import { useNavigation } from "expo-router";

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state?.favorites?.favoriteCharacters);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => (
          <View>
            <CharacterCard
              character={item}
              onPress={() =>
                navigation.navigate("characterDetails", { id: item?.id })
              }
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#00afcd",
  },
  btnContainer: {
    position: "absolute",
    right: 4,
    top: 18,
  },
  buttonText: {
    color: "white",
  },
  button: {
    backgroundColor: "black",
    borderRadius: 30,
    padding: 12,
    borderWidth: 1,
  },
});

export default FavoritesScreen;

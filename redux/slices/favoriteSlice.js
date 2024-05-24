import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  favoriteCharacters: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favoriteCharacters = action.payload;
    },
    addFavoriteSync: (state, action) => {
      const exists = state.favoriteCharacters.some(
        (character) => character.id === action.payload.id
      );
      if (exists) {
        alert("Bu karakter zaten favorilerinizde.");
      } else if (state.favoriteCharacters.length < 10) {
        state.favoriteCharacters.push(action.payload);
      } else {
        alert("Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız");
      }
    },
    removeFavoriteSync: (state, action) => {
      state.favoriteCharacters = state.favoriteCharacters.filter(
        (character) => character.id !== action.payload.id
      );
    },
  },
});

export const { setFavorites, addFavoriteSync, removeFavoriteSync } =
  favoriteSlice.actions;

export const loadFavorites = () => async (dispatch) => {
  try {
    const favoritesString = await AsyncStorage.getItem("favoriteCharacters");
    const favorites = favoritesString ? JSON.parse(favoritesString) : [];
    dispatch(setFavorites(favorites));
  } catch (error) {
    console.error("Failed to load favorites:", error);
  }
};

export const addFavorite = (character) => async (dispatch, getState) => {
  dispatch(addFavoriteSync(character));
  const { favoriteCharacters } = getState().favorites;
  await AsyncStorage.setItem(
    "favoriteCharacters",
    JSON.stringify(favoriteCharacters)
  );
};

export const removeFavorite = (character) => async (dispatch, getState) => {
  dispatch(removeFavoriteSync(character));
  const { favoriteCharacters } = getState().favorites;
  await AsyncStorage.setItem(
    "favoriteCharacters",
    JSON.stringify(favoriteCharacters)
  );
};

export default favoriteSlice.reducer;

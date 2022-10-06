import { createSlice } from '@reduxjs/toolkit';

const getPokedexEntry = (pokemon: String | number) => {
  return fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState: {
    pokemonEntry: {},
    speciesDetails: {},
  },
  reducers: {
    //API documentation can be found here: https://pokeapi.co/docs/v2
    setPokemonEntry: (state, action) => {
      state.pokemonEntry = action.payload;
    },
    setSpeciesDetails: (state, action) => {
      state.speciesDetails = action.payload;
    },
  },
});

export const { setPokemonEntry, setSpeciesDetails } = pokedexSlice.actions;
export default pokedexSlice.reducer;

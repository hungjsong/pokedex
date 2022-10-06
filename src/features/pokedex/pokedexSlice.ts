import { createSlice } from '@reduxjs/toolkit';

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

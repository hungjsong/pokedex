import { createSlice } from '@reduxjs/toolkit';

export const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState: {
    pokemonID: 1,
  },
  reducers: {
    loadPokemonDetails: (state) => {},
  },
});

export const { loadPokemonDetails } = pokedexSlice.actions;
export default pokedexSlice.reducer;

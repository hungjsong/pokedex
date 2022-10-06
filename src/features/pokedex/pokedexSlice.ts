import { createSlice } from '@reduxjs/toolkit';

export const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState: {
    pokemonEntry: {},
  },
  reducers: {
    //API documentation can be found here: https://pokeapi.co/docs/v2
    setPokemonEntry: (state, action) => {
      state.pokemonEntry = action.payload;
    },
  },
});

export const { setPokemonEntry } = pokedexSlice.actions;
export default pokedexSlice.reducer;

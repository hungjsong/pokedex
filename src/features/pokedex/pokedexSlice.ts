import { createSlice } from '@reduxjs/toolkit';
import { PokemonEntry, SpeciesDetails } from '../../types/pokemonTypes';

interface PokedexState {
  pokemonEntry: PokemonEntry | null;
  speciesDetails: SpeciesDetails | null;
}

const initialState: PokedexState = {
  pokemonEntry: null,
  speciesDetails: null,
};

export const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
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

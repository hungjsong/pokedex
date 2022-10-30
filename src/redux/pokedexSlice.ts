import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetAllPokemonResults } from '../API/pokemon';
import { PokemonEntry, SpeciesDetails } from '../types/pokemonTypes';

interface PokedexState {
  pokemonEntry: PokemonEntry | null;
  speciesDetails: SpeciesDetails | null;
  pokemonList: GetAllPokemonResults | null;
}

const initialState: PokedexState = {
  pokemonEntry: null,
  speciesDetails: null,
  pokemonList: null,
};

export const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    setPokemonEntry: (state, action: PayloadAction<PokemonEntry>) => {
      state.pokemonEntry = action.payload;
    },
    setSpeciesDetails: (state, action) => {
      state.speciesDetails = action.payload;
    },
    setPokemonList: (state, action) => {
      state.pokemonList = action.payload;
    },
  },
});

export const { setPokemonEntry, setSpeciesDetails, setPokemonList } =
  pokedexSlice.actions;
export default pokedexSlice.reducer;

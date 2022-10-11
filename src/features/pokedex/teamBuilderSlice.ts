import { createSlice } from '@reduxjs/toolkit';
import { PokemonEntry, SpeciesDetails } from '../../types/pokemonTypes';

interface TeamBuilderState {}

const initialState: TeamBuilderState = {};

export const teamBuilderSlice = createSlice({
  name: 'teamBuilder',
  initialState,
  reducers: {
    setPokemon: (state, action) => {},
  },
});

export const { setPokemon } = teamBuilderSlice.actions;
export default teamBuilderSlice.reducer;

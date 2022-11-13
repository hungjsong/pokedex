import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../types/pokemonTypes';

interface CatchingSimulatorState {
  pokemon: Pokemon;
  status?: string;
}

const initialState: CatchingSimulatorState = {
  pokemon: {
    name: 'Bulbasaur',
    id: 1,
    level: 1,
    gender: 'Male',
    shiny: false,
    types: [
      {
        slot: 0,
        type: {
          name: 'grass',
          url: '',
        },
      },
      {
        slot: 1,
        type: {
          name: 'poison',
          url: '',
        },
      },
    ],
    nature: { name: 'docile', increased_stat: null, decreased_stat: null },
    baseStats: {
      hp: 45,
      atk: 49,
      def: 49,
      spAtk: 65,
      spDef: 65,
      spd: 45,
    },
    iv: {
      hp: 31,
      atk: 31,
      def: 31,
      spAtk: 31,
      spDef: 31,
      spd: 31,
    },
    ev: {
      hp: 0,
      atk: 0,
      def: 0,
      spAtk: 0,
      spDef: 0,
      spd: 0,
    },
    catchRate: 45,
    weight: 6.9,
  },
  status: undefined,
};

export const catchingSimulatorSlice = createSlice({
  name: 'catchingSimulator',
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      state.pokemon = action.payload;
    },
    setStatus: (
      state,
      action: PayloadAction<{
        status: string;
      }>
    ) => {
      const { status } = action.payload;
      state.status = status;
    },
  },
});

export const { setStatus } = catchingSimulatorSlice.actions;
export default catchingSimulatorSlice.reducer;

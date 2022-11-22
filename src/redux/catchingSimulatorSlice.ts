import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../types/pokemonTypes';
import { calculateStatValues } from '../utilityFunctions';

type UserPokemon = { name: string; id: number; level: number; gender: string };

interface CatchingSimulatorState {
  wildPokemon: Pokemon;
  userPokemon: UserPokemon;
  status?: string;
  pokeball: string;
  hp: { currentHP: number; maximumHP: number };
  encounterMethod: string;
  timeOfDay: string;
}

const initialState: CatchingSimulatorState = {
  wildPokemon: {
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
  userPokemon: {
    name: 'Bulbasaur',
    id: 1,
    level: 1,
    gender: 'Male',
  },
  status: undefined,
  pokeball: 'Poke Ball',
  hp: { currentHP: 12, maximumHP: 12 },
  encounterMethod: 'Grass',
  timeOfDay: 'Day',
};

export const catchingSimulatorSlice = createSlice({
  name: 'catchingSimulator',
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      state.wildPokemon = action.payload;
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
    setPokeBall: (state, action: PayloadAction<{ pokeBall: string }>) => {
      const { pokeBall } = action.payload;
      state.pokeball = pokeBall;
    },
    setLevel: (
      state,
      action: PayloadAction<{ level: number; isWild: boolean }>
    ) => {
      const { level, isWild } = action.payload;

      if (isWild) {
        const maximumHP = calculateStatValues(state.wildPokemon, level).hp;
        state.hp.currentHP = maximumHP;
        state.hp.maximumHP = maximumHP;
        state.wildPokemon.level = level;
      } else {
        state.userPokemon.level = level;
      }
    },
    setGender: (
      state,
      action: PayloadAction<{ gender: string; isWild: boolean }>
    ) => {
      const { gender, isWild } = action.payload;
      isWild
        ? (state.wildPokemon.gender = gender)
        : (state.userPokemon.gender = gender);
    },
    setCurrentHP: (state, action: PayloadAction<{ currentHP: number }>) => {
      const { currentHP } = action.payload;
      state.hp.currentHP = currentHP;
    },
    setEncounterMethod: (
      state,
      action: PayloadAction<{ encounterMethod: string }>
    ) => {
      const { encounterMethod } = action.payload;
      state.encounterMethod = encounterMethod;
    },
    setTimeOfDay: (state, action: PayloadAction<{ time: string }>) => {
      const { time } = action.payload;
      state.timeOfDay = time;
    },
  },
});

export const {
  setStatus,
  setPokeBall,
  setLevel,
  setGender,
  setCurrentHP,
  setEncounterMethod,
  setTimeOfDay,
} = catchingSimulatorSlice.actions;
export default catchingSimulatorSlice.reducer;

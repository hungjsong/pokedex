import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon, PokemonEntry } from '../types/pokemonTypes';
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
  dialogBoxMessage: string;
  currentTurn: number;
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
  dialogBoxMessage: 'What will you do?',
  currentTurn: 1,
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
    setDialogBoxMessage: (
      state,
      action: PayloadAction<{ message: string }>
    ) => {
      const { message } = action.payload;
      state.dialogBoxMessage = message;
    },
    setCatchingPokemonID: (
      state,
      action: PayloadAction<{ pokemon: PokemonEntry; isWild: boolean }>
    ) => {
      const { pokemon, isWild } = action.payload;
      if (isWild) {
        state.wildPokemon.name = pokemon.name;
        state.wildPokemon.id = pokemon.id;
        state.wildPokemon.types = pokemon.types;
        state.wildPokemon.weight = pokemon.weight;
        state.wildPokemon.baseStats = {
          hp: pokemon.stats[0].base_stat,
          atk: pokemon.stats[1].base_stat,
          def: pokemon.stats[2].base_stat,
          spAtk: pokemon.stats[3].base_stat,
          spDef: pokemon.stats[4].base_stat,
          spd: pokemon.stats[5].base_stat,
        };
        const newMaxHP = calculateStatValues(
          state.wildPokemon,
          state.wildPokemon.level!
        ).hp;
        state.hp.maximumHP = newMaxHP;
        state.hp.currentHP = newMaxHP;
      } else {
        state.userPokemon.id = pokemon.id;
        state.userPokemon.name = pokemon.name;
      }
    },
    setCurrentTurn: (state, action: PayloadAction<{ turn: number }>) => {
      const { turn } = action.payload;
      state.currentTurn = turn;
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
  setDialogBoxMessage,
  setCatchingPokemonID,
  setCurrentTurn,
} = catchingSimulatorSlice.actions;
export default catchingSimulatorSlice.reducer;

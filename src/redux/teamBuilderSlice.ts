import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Move, Pokemon } from '../types/pokemonTypes';

interface TeamBuilderState {
  team: Pokemon[];
}

const initialState: TeamBuilderState = {
  team: [
    {
      name: undefined,
      id: undefined,
      moves: [],
      item: undefined,
      level: 1,
      gender: undefined,
      happiness: 0,
      shiny: false,
      types: [],
      nature: undefined,
      iv: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        spd: 0,
      },
      ev: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        spd: 0,
      },
    },
    {
      name: undefined,
      id: undefined,
      moves: [],
      item: undefined,
      level: 1,
      gender: undefined,
      happiness: 0,
      shiny: false,
      types: [],
      nature: undefined,
      iv: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        spd: 0,
      },
      ev: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        spd: 0,
      },
    },
    {
      name: undefined,
      id: undefined,
      moves: [],
      item: undefined,
      level: 1,
      gender: undefined,
      happiness: 0,
      shiny: false,
      types: [],
      nature: undefined,
      iv: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        spd: 0,
      },
      ev: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        spd: 0,
      },
    },
    {
      name: undefined,
      id: undefined,
      moves: [],
      item: undefined,
      level: 1,
      gender: undefined,
      happiness: 0,
      shiny: false,
      types: [],
      nature: undefined,
      iv: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        spd: 0,
      },
      ev: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        spd: 0,
      },
    },
    {
      name: undefined,
      id: undefined,
      moves: [],
      item: undefined,
      level: 1,
      gender: undefined,
      happiness: 0,
      shiny: false,
      types: [],
      nature: undefined,
      iv: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        spd: 0,
      },
      ev: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        spd: 0,
      },
    },
    {
      name: undefined,
      id: undefined,
      moves: [],
      item: undefined,
      level: 1,
      gender: undefined,
      happiness: 0,
      shiny: false,
      types: [],
      nature: undefined,
      iv: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        spd: 0,
      },
      ev: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        spd: 0,
      },
    },
  ],
};

export const teamBuilderSlice = createSlice({
  name: 'teamBuilder',
  initialState,
  reducers: {
    setPokemon: (
      state,
      action: PayloadAction<{
        teamSlotNumber: number;
        pokemonID: number;
        name: string;
      }>
    ) => {
      const { teamSlotNumber, name, pokemonID } = action.payload;
      state.team[teamSlotNumber].name = name;
      state.team[teamSlotNumber].id = pokemonID;
    },
    setMove: (
      state,
      action: PayloadAction<{
        teamSlotNumber: number;
        moveSlotNumber: number;
        selectedMove: Move;
      }>
    ) => {
      const { teamSlotNumber, moveSlotNumber, selectedMove } = action.payload;
      state.team[teamSlotNumber].moves![moveSlotNumber] = selectedMove;
    },
    setNature: (
      state,
      action: PayloadAction<{
        nature: string;
        teamSlotNumber: number;
      }>
    ) => {
      const { nature, teamSlotNumber } = action.payload;
      state.team[teamSlotNumber].nature = nature;
    },
    setShiny: (
      state,
      action: PayloadAction<{
        isShiny: boolean;
        teamSlotNumber: number;
      }>
    ) => {
      const { isShiny, teamSlotNumber } = action.payload;
      state.team[teamSlotNumber].shiny = isShiny;
    },
    setGender: (state, action) => {
      const { gender, teamSlotNumber } = action.payload;
      state.team[teamSlotNumber].gender = gender;
    },
    setLevel: (
      state,
      action: PayloadAction<{
        level: number;
        teamSlotNumber: number;
      }>
    ) => {
      const { level, teamSlotNumber } = action.payload;
      state.team[teamSlotNumber].level = level;
    },
    setEV: (
      state,
      action: PayloadAction<{
        evInputValue: number;
        teamSlotNumber: number;
        evName: string;
      }>
    ) => {
      const { evInputValue, evName, teamSlotNumber } = action.payload;
      switch (evName) {
        case 'hp':
          state.team[teamSlotNumber].ev!.hp = evInputValue;
          break;
        case 'atk':
          state.team[teamSlotNumber].ev!.atk = evInputValue;
          break;
        case 'def':
          state.team[teamSlotNumber].ev!.def = evInputValue;
          break;
        case 'spAtk':
          state.team[teamSlotNumber].ev!.spAtk = evInputValue;
          break;
        case 'spDef':
          state.team[teamSlotNumber].ev!.spDef = evInputValue;
          break;
        case 'spd':
          state.team[teamSlotNumber].ev!.spd = evInputValue;
          break;
        default:
          break;
      }
    },
    setIV: (
      state,
      action: PayloadAction<{
        ivInputValue: number;
        teamSlotNumber: number;
        ivName: string;
      }>
    ) => {
      const { ivInputValue, ivName, teamSlotNumber } = action.payload;
      switch (ivName) {
        case 'hp':
          state.team[teamSlotNumber].iv!.hp = ivInputValue;
          break;
        case 'atk':
          state.team[teamSlotNumber].iv!.atk = ivInputValue;
          break;
        case 'def':
          state.team[teamSlotNumber].iv!.def = ivInputValue;
          break;
        case 'spAtk':
          state.team[teamSlotNumber].iv!.spAtk = ivInputValue;
          break;
        case 'spDef':
          state.team[teamSlotNumber].iv!.spDef = ivInputValue;
          break;
        case 'spd':
          state.team[teamSlotNumber].iv!.spd = ivInputValue;
          break;
        default:
          break;
      }
    },
  },
});

export const {
  setPokemon,
  setNature,
  setMove,
  setShiny,
  setGender,
  setLevel,
  setEV,
  setIV,
} = teamBuilderSlice.actions;
export default teamBuilderSlice.reducer;

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
        speed: 0,
      },
      ev: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        speed: 0,
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
        speed: 0,
      },
      ev: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        speed: 0,
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
        speed: 0,
      },
      ev: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        speed: 0,
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
        speed: 0,
      },
      ev: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        speed: 0,
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
        speed: 0,
      },
      ev: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        speed: 0,
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
        speed: 0,
      },
      ev: {
        hp: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        speed: 0,
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
  },
});

export const { setPokemon, setNature, setMove, setShiny, setGender } =
  teamBuilderSlice.actions;
export default teamBuilderSlice.reducer;

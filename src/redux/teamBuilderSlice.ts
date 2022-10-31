import { createSlice } from '@reduxjs/toolkit';
import { Pokemon } from '../types/pokemonTypes';

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
    setPokemon: (state, action) => {
      state.team[action.payload.slotNumber].name = action.payload.name;
    },
    setMove: () => {
      console.log('hi'); //Added console log for now to prevent empty reducer error
    },
    setNature: (state, action) => {
      state.team[action.payload.slotNumber].nature = action.payload.nature;
    },
  },
});

export const { setPokemon, setNature } = teamBuilderSlice.actions;
export default teamBuilderSlice.reducer;
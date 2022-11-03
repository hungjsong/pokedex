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
    setPokemon: (state, action) => {
      state.team[action.payload.slotNumber].name = action.payload.name;
    },
    setReduxMove: (
      state,
      action: PayloadAction<{
        teamSlotNumber: number;
        moveSlotNumber: number;
        selectedMove: Move;
      }>
    ) => {
      //console.log(action.payload.selectedMoves);
      //console.log('HELLO', state.team);

      const { teamSlotNumber, moveSlotNumber, selectedMove } = action.payload;
      state.team[teamSlotNumber].moves![moveSlotNumber] = selectedMove;
    },
    setMoves: (state, action) => {
      //console.log(action.payload.selectedMoves);
      //console.log('HELLO', state.team);
      state.team[action.payload.teamSlotNumber].moves =
        action.payload.selectedMoves;
    },
    setNature: (state, action) => {
      state.team[action.payload.slotNumber].nature = action.payload.nature;
    },
  },
});

export const { setPokemon, setNature, setReduxMove, setMoves } =
  teamBuilderSlice.actions;
export default teamBuilderSlice.reducer;

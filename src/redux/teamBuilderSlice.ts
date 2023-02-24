import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Move, Pokemon, PokemonNature } from '../types/pokemonTypes';

interface TeamBuilderState {
  team: Pokemon[];
  teamID: number | undefined;
}

const initialState: TeamBuilderState = {
  team: [],
  teamID: undefined,
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
        selectedMove: Move | null;
      }>
    ) => {
      const { teamSlotNumber, moveSlotNumber, selectedMove } = action.payload;
      state.team[teamSlotNumber].moves![moveSlotNumber] = selectedMove;
    },
    setNature: (
      state,
      action: PayloadAction<{
        nature: PokemonNature;
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
    setHapppiness: (
      state,
      action: PayloadAction<{ happiness: number; teamSlotNumber: number }>
    ) => {
      const { happiness, teamSlotNumber } = action.payload;
      state.team[teamSlotNumber].happiness = happiness;
    },
    setItem: (
      state,
      action: PayloadAction<{
        id: number;
        item: string;
        description: string;
        spriteURL: string;
        teamSlotNumber: number;
      }>
    ) => {
      const { id, item, description, spriteURL, teamSlotNumber } =
        action.payload;
      state.team[teamSlotNumber].item = {
        id: id,
        name: item,
        description: description,
        spriteURL: spriteURL,
      };
    },
    addTeamPokemon: (state, action: PayloadAction<{}>) => {
      state.team.push({
        dbID: undefined,
        name: 'Bulbasaur',
        id: 1,
        moves: [],
        item: undefined,
        level: 1,
        gender: 'male',
        happiness: 0,
        shiny: false,
        types: [],
        nature: { name: 'hardy', increased_stat: null, decreased_stat: null },
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
      });
    },
    initializeTeam: (state, action: PayloadAction<{ team: Pokemon[] }>) => {
      const { team } = action.payload;
      state.team = team;
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
  setHapppiness,
  setItem,
  initializeTeam,
  addTeamPokemon,
} = teamBuilderSlice.actions;
export default teamBuilderSlice.reducer;

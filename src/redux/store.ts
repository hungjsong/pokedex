import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from './pokedexSlice';
import teamBuilderReducer from './teamBuilderSlice';

const reducer = {
  pokedex: pokedexReducer,
  teamBuilder: teamBuilderReducer,
};

export default configureStore({
  reducer: reducer,
});

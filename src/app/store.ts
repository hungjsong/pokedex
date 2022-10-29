import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from '../features/pokedex/pokedexSlice';
import teamBuilderReducer from '../features/pokedex/teamBuilderSlice';

const reducer = {
  pokedex: pokedexReducer,
  teamBuilder: teamBuilderReducer,
};

export default configureStore({
  reducer: reducer,
});

import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from '../features/pokedex/pokedexSlice';

const reducer = {
  pokedex: pokedexReducer,
};

export default configureStore({
  reducer: reducer,
});

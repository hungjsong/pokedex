import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from '../features/pokedex/pokedexSlice';

export default configureStore({
  reducer: pokedexReducer,
});

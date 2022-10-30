import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from './pokedexSlice';
import teamBuilderReducer from './teamBuilderSlice';

const reducer = {
  pokedex: pokedexReducer,
  teamBuilder: teamBuilderReducer,
};

const store = configureStore({
  reducer: reducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

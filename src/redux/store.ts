import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from './pokedexSlice';
import teamBuilderReducer from './teamBuilderSlice';
import catchingSimulatorReducer from './catchingSimulatorSlice';

const reducer = {
  pokedex: pokedexReducer,
  teamBuilder: teamBuilderReducer,
  catchingSimulator: catchingSimulatorReducer,
};

const store = configureStore({
  reducer: reducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import pokemonNatures from './mockData/pokemonNatures.json';
import pokemonMoves from './mockData/pokemonMoves.json';
import pokemonItems from './mockData/pokemonItems.json';
import pokeBalls from './mockData/pokeballs.json';
import { Item, Move, PokeBall, PokemonNature } from '../types/pokemonTypes';

//API documentation can be found here: https://pokeapi.co/docs/v2
export const getPokedexEntry = (pokemon: string | number) => {
  return fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

export const getSpeciesDetails = (pokemonID: string | number) => {
  return fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemonID)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

export type GetAllPokemonResponse = [
  {
    name: string;
    url: string;
  }
];

export const getAllPokemon = (): Promise<GetAllPokemonResponse> => {
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then((response) => response.json())
    .then((allpokemon) => allpokemon.results)
    .catch((error) => {
      console.error(error);
    });
};

const MOCK_API_DELAY = 1000;

type GetPokemonNaturesResponse = {
  payload: PokemonNature[];
};

type GetPokemonMovesResponse = {
  payload: Move[];
};

type GetItemsResponse = {
  payload: Item[];
};

type GetPokeBallsResponse = {
  payload: PokeBall[];
};

export const getPokemonNatures = () => {
  return new Promise<GetPokemonNaturesResponse>((resolve) => {
    setTimeout(() => {
      resolve(pokemonNatures);
    }, MOCK_API_DELAY);
  });
};

export const getPokemonMoves = () => {
  return new Promise<GetPokemonMovesResponse>((resolve) => {
    setTimeout(() => {
      resolve(pokemonMoves);
    }, MOCK_API_DELAY);
  });
};

export const getPokemonItems = () => {
  return new Promise<GetItemsResponse>((resolve) => {
    setTimeout(() => {
      resolve(pokemonItems);
    }, MOCK_API_DELAY);
  });
};

export const getPokeBalls = () => {
  return new Promise<GetPokeBallsResponse>((resolve) => {
    setTimeout(() => {
      resolve(pokeBalls);
    }, MOCK_API_DELAY);
  });
};

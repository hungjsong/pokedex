import pokemonNatures from './mockData/pokemonNatures.json';
import { PokemonNature } from '../types/pokemonTypes';

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

//TODO: Please rename this.
export type GetAllPokemonResults = [
  {
    name: string;
    url: string;
  }
];

export const getAllPokemon = (): Promise<GetAllPokemonResults> => {
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

export const getPokemonNatures = () => {
  return new Promise<GetPokemonNaturesResponse>((resolve) => {
    setTimeout(() => {
      resolve(pokemonNatures);
    }, MOCK_API_DELAY);
  });
};

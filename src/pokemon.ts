import { capitalize } from './utilityFunctions';

export const getPokedexEntry = (pokemon: String | number) => {
  return fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

export const getPokemonTypes = (types: any) => {
  if (types === undefined) {
    return '';
  }
  let pokemonTypes: String[] = [];
  types.forEach((type: any) => {
    const capitalizedType = capitalize(type.type.name);
    pokemonTypes.push(capitalizedType);
  });

  return pokemonTypes.join('/');
};

export const getSpeciesDetails = (pokemonID: number) => {
  return fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemonID)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

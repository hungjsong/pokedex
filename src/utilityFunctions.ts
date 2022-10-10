import { PokemonType } from './types/pokemonTypes';

export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getPokemonTypes = (types: PokemonType[]) => {
  if (types === undefined) {
    return '';
  }
  const pokemonTypes: string[] = [];
  types.forEach((type: PokemonType) => {
    const capitalizedType = capitalize(type.type.name);
    pokemonTypes.push(capitalizedType);
  });

  return pokemonTypes.join('/');
};

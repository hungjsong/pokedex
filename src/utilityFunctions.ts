export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getPokemonTypes = (types: any) => {
  if (types === undefined) {
    return '';
  }
  const pokemonTypes: string[] = [];
  types.forEach((type: any) => {
    const capitalizedType = capitalize(type.type.name);
    pokemonTypes.push(capitalizedType);
  });

  return pokemonTypes.join('/');
};

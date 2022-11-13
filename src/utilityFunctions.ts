import {
  Genus,
  Pokemon,
  PokemonNature,
  PokemonType,
  SpeciesDetails,
  statType,
} from './types/pokemonTypes';

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

export const getEnglishGenera = (speciesDetails: SpeciesDetails): Genus => {
  return speciesDetails.genera.filter(
    (genus) => genus.language.name === 'en'
  )[0];
};

export const calculateStatValues = (pokemon: Pokemon, level: number) => {
  const ivValues = pokemon.iv;
  const evValues = pokemon.ev;
  const baseStats = pokemon.baseStats;
  const nature = pokemon.nature;
  const increasedStatType =
    nature!.increased_stat === null
      ? ''
      : nature!.increased_stat!.replace('.', '');
  const decreasedStatType =
    nature!.decreased_stat === null
      ? ''
      : nature!.decreased_stat!.replace('.', '');
  const statTypes: statType[] = ['hp', 'atk', 'def', 'spAtk', 'spDef', 'spd'];
  const pokemonStats = { hp: 0, atk: 0, def: 0, spAtk: 0, spDef: 0, spd: 0 };

  statTypes.forEach((statType: statType) => {
    let natureModifier = 1;
    const commonDenominator =
      ((2 * baseStats![statType] +
        ivValues![statType] +
        evValues![statType] / 4) *
        level) /
      100;
    const matchingIncreasedStat =
      increasedStatType.toLowerCase() === statType.toLowerCase();
    const matchingDecreasedStat =
      decreasedStatType.toLowerCase() === statType.toLowerCase();

    if (statType === 'hp') {
      pokemonStats.hp = Math.floor(commonDenominator + level + 10);
    } else {
      if (matchingIncreasedStat) {
        natureModifier = 1.1;
      } else if (matchingDecreasedStat) {
        natureModifier = 0.9;
      }

      pokemonStats[statType] = Math.floor(
        (commonDenominator + 5) * natureModifier
      );
    }
  });

  return pokemonStats;
};

import {
  Genus,
  Pokemon,
  PokemonType,
  SpeciesDetails,
  statType,
} from './types/pokemonTypes';
import { useAppSelector } from './hooks';
import { CAPTURE_RNG_RATE } from './constants';

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

export function calculateBallBonus(ballUsed: string) {
  const userPokemon = useAppSelector(
    (state) => state.catchingSimulator.userPokemon
  );
  const wildPokemon = useAppSelector(
    (state) => state.catchingSimulator.wildPokemon
  );
  const encounterMethod = useAppSelector(
    (state) => state.catchingSimulator.encounterMethod
  );
  const statusCondition = useAppSelector(
    (state) => state.catchingSimulator.status
  );
  const timeOfDay = useAppSelector(
    (state) => state.catchingSimulator.timeOfDay
  );
  const numOfTurns = useAppSelector(
    (state) => state.catchingSimulator.currentTurn
  );

  switch (ballUsed) {
    case 'Heavy Ball':
      if (wildPokemon.weight! >= 300) {
        return 30;
      } else if (wildPokemon.weight! >= 200 && wildPokemon.weight! < 300) {
        return 20;
      } else if (wildPokemon.weight! >= 100 && wildPokemon.weight! < 200) {
        return 0;
      }
      return -20;
    case 'Great Ball':
      return 1.5;

    case 'Ultra Ball':
      return 2;

    case 'Master Ball':
      return 255;

    case 'Net Ball': {
      const pokemonIsBugOrWaterType =
        wildPokemon.types!.filter(
          (type) => type.type.name === 'water' || type.type.name === 'bug'
        ).length !== 0;

      if (pokemonIsBugOrWaterType) {
        return 3.5;
      }
      return 1;
    }
    case 'Dive Ball':
      if (encounterMethod === 'Surfing/Diving') {
        return 3.5;
      }
      return 1;

    case 'Nest Ball': {
      if (wildPokemon.level! < 31) {
        return (41 - wildPokemon.level!) / 10;
      }
      return 1;
    }

    case 'Repeat Ball': {
      const previouslyCaught = useAppSelector(
        (state) => state.catchingSimulator.previouslyCaught
      );

      if (previouslyCaught) {
        return 3.5;
      }
      return 1;
    }
    case 'Timer Ball': {
      return numOfTurns < 11
        ? Number((1 + numOfTurns * (1229 / 4096)).toPrecision(2))
        : 4;
    }
    case 'Quick Ball': {
      if (numOfTurns === 1) {
        return 5;
      }
      return 1;
    }
    case 'Level Ball': {
      if (Math.floor(userPokemon.level / 4) >= wildPokemon.level!) {
        return 8;
      } else if (Math.floor(userPokemon.level / 2) >= wildPokemon.level!) {
        return 4;
      } else if (userPokemon.level > wildPokemon.level!) {
        return 2;
      }
      return 1;
    }
    case 'Love Ball': {
      const userPokemonGender = userPokemon.gender;
      const userPokemonSpecies = userPokemon.id;
      const wildPokemonGender = wildPokemon.gender;
      const wildPokemonSpecies = wildPokemon.id;
      const sameSpecies = wildPokemonSpecies === userPokemonSpecies;
      const oppositeGender =
        wildPokemonGender !== userPokemonGender &&
        wildPokemonGender !== 'Genderless' &&
        userPokemonGender !== 'Genderless';

      if (sameSpecies && oppositeGender) {
        return 8;
      }
      return 1;
    }
    case 'Lure Ball': {
      if (encounterMethod === 'Fishing') {
        return 4;
      }
      return 1;
    }
    case 'Moon Ball': {
      const moonStonePokemon = [
        'Nidorina',
        'Nidorino',
        'Clefairy',
        'Jigglypuff',
        'Skitty',
        'Munna',
      ];
      const isMoonStonepokemon = moonStonePokemon.includes(wildPokemon.name!);

      if (isMoonStonepokemon) {
        return 4;
      }
      return 1;
    }
    case 'Beast Ball': {
      const ultraBeastPokemon = [
        'nihilego',
        'buzzwole',
        'pheromosa',
        'xurkitree',
        'celesteela',
        'kartana',
        'guzzlord',
        'poipole',
        'naganadel',
        'stakataka',
        'blacephalon',
      ];
      const isUltraBeast = ultraBeastPokemon.includes(
        wildPokemon.name!.toLowerCase()
      );

      if (isUltraBeast) {
        return 5;
      }

      return 410 / 4096;
    }
    case 'Dream Ball': {
      if (statusCondition === 'Asleep') {
        return 4;
      }
      return 1;
    }
    case 'Dusk Ball': {
      if (timeOfDay === 'Night' || encounterMethod === 'Cave') {
        return 3;
      }
      return 1;
    }
    default:
      return 1;
  }
}

export function calculateStatusConditionModifier() {
  const statusCondition = useAppSelector(
    (state) => state.catchingSimulator.status
  );

  if (statusCondition === 'Asleep' || statusCondition === 'Frozen') {
    return 2.5;
  } else if (
    statusCondition === 'Poisoned' ||
    statusCondition === 'Paralyzed' ||
    statusCondition === 'Burned'
  ) {
    return 1.5;
  }
  return 1;
}

export function calculateDifficultyModifier() {
  const storyCompleted = useAppSelector(
    (state) => state.catchingSimulator.storyCompleted
  );
  const wildPokemonLevel = useAppSelector(
    (state) => state.catchingSimulator.wildPokemon.level!
  );
  const userPokemonLevel = useAppSelector(
    (state) => state.catchingSimulator.userPokemon.level
  );

  if (!storyCompleted && userPokemonLevel < wildPokemonLevel) {
    return 410 / 4096;
  } else {
    return 1;
  }
}

export function calculateFinalCaptureRateGen8(ballBonusParameter?: number) {
  const ballUsed = useAppSelector((state) => state.catchingSimulator.pokeball);
  const currentHP = useAppSelector(
    (state) => state.catchingSimulator.hp.currentHP
  );
  const maximumHP = useAppSelector(
    (state) => state.catchingSimulator.hp.maximumHP
  );
  const wildPokemon = useAppSelector(
    (state) => state.catchingSimulator.wildPokemon
  );

  const ballBonus = ballBonusParameter ?? calculateBallBonus(ballUsed);
  const difficultyModifier = calculateDifficultyModifier();
  const statusConditionModifier = calculateStatusConditionModifier();
  const catchRate = wildPokemon.catchRate;
  const grassModifier = 1;
  const isHeavyBall = [-20, 0, 20, 30].includes(ballBonus);
  const lowLevelModifier =
    wildPokemon.level! < 20 ? (30 - wildPokemon.level!) / 10 : 1;

  const finalCaptureRate =
    (((3 * maximumHP - 2 * currentHP) *
      grassModifier *
      (isHeavyBall === true
        ? ballBonus + catchRate! <= 0
          ? 1
          : ballBonus + catchRate!
        : catchRate!) *
      (isHeavyBall === true ? 1 : ballBonus)) /
      (3 * maximumHP)) *
    lowLevelModifier *
    statusConditionModifier *
    difficultyModifier;

  return finalCaptureRate;
}

export function calculateShakeHoldSuccessRate(ballBonus?: number) {
  const finalCaptureRate = calculateFinalCaptureRateGen8(ballBonus);
  const shakeHoldSuccessRate = Math.floor(
    CAPTURE_RNG_RATE / Math.pow(255 / finalCaptureRate, 3 / 16)
  );

  return shakeHoldSuccessRate;
}

export function calculateCaptureChances(ballBonus?: number) {
  const shakeHoldSuccessRate =
    calculateShakeHoldSuccessRate(ballBonus) / CAPTURE_RNG_RATE;

  function convertToPercentage(shakeHoldSuccessRate: number) {
    return Number((shakeHoldSuccessRate * 100).toPrecision(4));
  }

  return [
    {
      chance: convertToPercentage(1 - shakeHoldSuccessRate),
    },
    {
      chance: convertToPercentage(
        shakeHoldSuccessRate - Math.pow(shakeHoldSuccessRate, 2)
      ),
    },
    {
      chance: convertToPercentage(
        Math.pow(shakeHoldSuccessRate, 2) - Math.pow(shakeHoldSuccessRate, 3)
      ),
    },
    {
      chance: convertToPercentage(
        Math.pow(shakeHoldSuccessRate, 3) - Math.pow(shakeHoldSuccessRate, 4)
      ),
    },
    {
      chance: convertToPercentage(Math.pow(shakeHoldSuccessRate, 4)),
    },
  ];
}

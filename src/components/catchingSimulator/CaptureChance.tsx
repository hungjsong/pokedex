import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { calculateStatValues } from '../../utilityFunctions';
import Loader from '../common/Loader';

function CaptureChance() {
  const ballUsed = useAppSelector((state) => state.catchingSimulator.pokeball);
  const pokemon = useAppSelector((state) => state.catchingSimulator.pokemon);
  const statusCondition = useAppSelector((state) =>
    state.catchingSimulator.status?.toLowerCase()
  );

  const [storyCompleted, setStoryCompleted] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);
  const catchRate = pokemon.catchRate;
  const maximumHP = calculateStatValues(pokemon, currentLevel).hp;
  const [currentHP, setCurrentHP] = useState(maximumHP);
  const [captureChances, setCaptureChances] = useState<
    { quote: string; chance: number }[]
  >([]);

  useEffect(() => {
    setCurrentHP(maximumHP);
    calculateCaptureRateGen8();
  }, [currentLevel, statusCondition, ballUsed]);

  function calculateBallBonus() {
    switch (ballUsed) {
      case 'Heavy Ball':
        if (pokemon.weight! >= 300) {
          return 30;
        } else if (pokemon.weight! >= 200 && pokemon.weight! < 300) {
          return 20;
        }
        return 1;

      case 'Great Ball':
        return 1.5;

      case 'Ultra Ball':
        return 2;

      case 'Master Ball':
        return 255;

      case 'Net Ball':
        const pokemonIsBugOrWaterType =
          pokemon.types!.filter(
            (type) => type.type.name === 'water' || type.type.name === 'bug'
          ).length !== 0;

        if (pokemonIsBugOrWaterType) {
          return 3.5;
        }
        return 1;

      case 'Dive Ball':
        //To implement later. If currently on or in water, return 3.5
        return 1;

      case 'Repeat Ball':
        //To implement later. If Pokemon is registered as caught in Pokedex, return 3.5
        return 1;

      case 'Timer Ball':
        //To implement later. Requires turns variable.
        return (1 + (1 * 1229) / 4096).toPrecision(2);

      case 'Quick Ball':
        //To Implement later. If first turn, return 5.
        return 5;

      case 'Level Ball':
        //To implement later. Requires calculating the difference between the levels of the wild pokemon and trainer's pokemon
        return 1;

      case 'Love Ball':
        //To implement later. Requires checking the genders of both the wild pokemon and trainer's pokemon
        return 1;

      case 'Lure Ball':
        //To implment later. Requires trainer to be fishing. Return 4 if fishing.
        return 1;

      case 'Moon Ball':
        const moonStonePokemon = [
          'Nidorina',
          'Nidorino',
          'Clefairy',
          'Jigglypuff',
          'Skitty',
          'Munna',
        ];
        const isMoonStonepokemon = moonStonePokemon.includes(pokemon.name!);

        if (isMoonStonepokemon) {
          return 4;
        }
        return 1;

      case 'Beast Ball':
        const ultraBeastPokemon = [
          'Nihilego',
          'Buzzwole',
          'Pheromosa',
          'Xurkitree',
          'Celesteela',
          'Kartana',
          'Guzzlord',
          'Poipole',
          'Naganadel',
          'Stakataka',
          'Blacephalon',
        ];
        const isUltraBeast = ultraBeastPokemon.includes(pokemon.name!);

        if (isUltraBeast) {
          return 5;
        }

        return 410 / 4096;

      case 'Dream Ball':
        if (statusCondition === 'Asleep') {
          return 4;
        }
        return 1;

      default:
        return 1;
    }
  }

  function calculateStatusConditionModifier() {
    if (statusCondition === 'asleep' || statusCondition === 'frozen') {
      return 2.5;
    } else if (
      statusCondition === 'poisoned' ||
      statusCondition === 'paralyzed' ||
      statusCondition === 'burned'
    ) {
      return 1.5;
    }
    return 1;
  }

  function calculateDifficultyModifier() {
    if (!storyCompleted) {
      return 410 / 4096;
    } else {
      return 1;
    }
  }

  function calculateCaptureRateGen8() {
    const grassModifier = 1;
    const ballBonus = calculateBallBonus();
    const statusConditionModifier = calculateStatusConditionModifier();
    const lowLevelModifier = currentLevel < 20 ? (30 - currentLevel) / 10 : 1;
    const difficultyModifier = calculateDifficultyModifier();
    const finalCaptureRate =
      (((3 * maximumHP - 2 * currentHP) *
        grassModifier *
        catchRate! *
        ballBonus) /
        (3 * maximumHP)) *
      lowLevelModifier *
      statusConditionModifier *
      difficultyModifier;

    setCaptureChances(calculateShakeChancePercentages(finalCaptureRate));
  }

  function calculateShakeChancePercentages(finalCaptureRate: number) {
    const shakeProbability =
      65536 / Math.pow(255 / finalCaptureRate, 3 / 16) / 65536;

    return [
      {
        quote: 'Oh no! The Pokémon broke free!',
        chance: +((1 - shakeProbability) * 100).toPrecision(4),
      },
      {
        quote: 'Aww! It appeared to be caught!',
        chance: +(
          (shakeProbability - Math.pow(shakeProbability, 2)) *
          100
        ).toPrecision(4),
      },
      {
        quote: 'Aargh! Almost had it!',
        chance: +(
          (Math.pow(shakeProbability, 2) - Math.pow(shakeProbability, 3)) *
          100
        ).toPrecision(4),
      },
      {
        quote: 'Gah! It was so close, too!',
        chance: +(
          (Math.pow(shakeProbability, 3) - Math.pow(shakeProbability, 4)) *
          100
        ).toPrecision(4),
      },
      {
        quote: 'Gotcha! ' + pokemon.name + ' was caught!',
        chance: +(Math.pow(shakeProbability, 4) * 100).toPrecision(4),
      },
    ];
  }

  function displayCaptureChances() {
    if (ballUsed === 'Master Ball') {
      return <p>Successful Capture: 100% Gotcha! {pokemon.name} was caught!</p>;
    }

    return (
      <>
        <p>
          0 Shakes: {captureChances[0].chance}% {captureChances[0].quote}
        </p>
        <p>
          1 Shakes: {captureChances[1].chance}% {captureChances[1].quote}
        </p>
        <p>
          2 Shakes: {captureChances[2].chance}% {captureChances[2].quote}
        </p>
        <p>
          3 Shakes: {captureChances[3].chance}% {captureChances[3].quote}
        </p>
        <p>
          Successful Capture: {captureChances[4].chance}%{' '}
          {captureChances[4].quote}
        </p>
      </>
    );
  }

  if (captureChances.length === 0) {
    return <Loader />;
  } else {
    return (
      <>
        <h1>Catching Simulator</h1>
        {displayCaptureChances()}
        <label>
          Level:
          <input
            type="number"
            min="1"
            max="100"
            value={currentLevel}
            onChange={(event) => {
              setCurrentLevel(+(event.target as HTMLInputElement).value);
            }}
          />
        </label>
      </>
    );
  }
}

export default CaptureChance;

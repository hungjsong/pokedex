import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { calculateStatValues } from '../../utilityFunctions';
import Loader from '../common/Loader';

const CaptureRateBar = styled.div<{ title: string }>`
  display: inline-block;
  position: relative;
  title: ${(props) => props.title};
  width: 20em;
  height: 2em;
  background: #51ff2e;
`;

const Wobbles0 = styled.div<{ barWidth: number; title: string }>`
  float: left;
  background: #ff6142;
  height: 100%;
  width: ${(props) => props.barWidth + '%'};
  title: ${(props) => props.title};
`;

const Wobbles1 = styled(Wobbles0)`
  background: #e88f33;
`;

const Wobbles2 = styled(Wobbles0)`
  background: #ffd444;
`;

const Wobbles3 = styled(Wobbles0)`
  background: #e9eb44;
`;

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
  const [captureChances, setCaptureChances] = useState<{ chance: number }[]>(
    []
  );
  const captureQuotes = [
    'Oh no! The Pokémon broke free!',
    'Aww! It appeared to be caught!',
    'Aargh! Almost had it!',
    'Gah! It was so close, too!',
    'Gotcha! ' + pokemon.name + ' was caught!',
  ];

  useEffect(() => {
    setCaptureChances(calculateCaptureChances());
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

      case 'Net Ball': {
        const pokemonIsBugOrWaterType =
          pokemon.types!.filter(
            (type) => type.type.name === 'water' || type.type.name === 'bug'
          ).length !== 0;

        if (pokemonIsBugOrWaterType) {
          return 3.5;
        }
        return 1;
      }
      case 'Dive Ball':
        //To implement later. If currently on or in water, return 3.5
        return 1;

      case 'Nest Ball': {
        if (pokemon.level! < 31) {
          return (41 - pokemon.level!) / 10;
        }
        return 1;
      }

      case 'Repeat Ball':
        //To implement later. If Pokemon is registered as caught in Pokedex, return 3.5
        return 1;

      case 'Timer Ball':
        //To implement later. Requires turns variable.
        return +(1 + (1 * 1229) / 4096).toPrecision(2);

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

      case 'Moon Ball': {
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
      }
      case 'Beast Ball': {
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
      }
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

  function calculateFinalCaptureRateGen8() {
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

    return finalCaptureRate;
  }

  function calculateShakeHoldSuccessRate() {
    const finalCaptureRate = calculateFinalCaptureRateGen8();

    const shakeHoldSuccessRate = Math.floor(
      65536 / Math.pow(255 / finalCaptureRate, 3 / 16)
    );

    return shakeHoldSuccessRate;
  }

  function calculateCaptureChances() {
    const shakeHoldSuccessRate = calculateShakeHoldSuccessRate() / 65536;

    return [
      {
        chance: +((1 - shakeHoldSuccessRate) * 100).toPrecision(4),
      },
      {
        chance: +(
          (shakeHoldSuccessRate - Math.pow(shakeHoldSuccessRate, 2)) *
          100
        ).toPrecision(4),
      },
      {
        chance: +(
          (Math.pow(shakeHoldSuccessRate, 2) -
            Math.pow(shakeHoldSuccessRate, 3)) *
          100
        ).toPrecision(4),
      },
      {
        chance: +(
          (Math.pow(shakeHoldSuccessRate, 3) -
            Math.pow(shakeHoldSuccessRate, 4)) *
          100
        ).toPrecision(4),
      },
      {
        chance: +(Math.pow(shakeHoldSuccessRate, 4) * 100).toPrecision(4),
      },
    ];
  }

  function throwBall() {
    const shakeHoldSuccessRate = calculateShakeHoldSuccessRate();
    let numOfShakes = 0;
    let pokeBallStillHolding = true;

    while (pokeBallStillHolding && numOfShakes <= 3) {
      const shakeCheck = Math.floor(Math.random() * 65536);
      console.log(shakeCheck, shakeHoldSuccessRate);
      if (shakeCheck < shakeHoldSuccessRate) {
        console.log('BALL HOLDING');
        numOfShakes++;
      } else {
        console.log('POKEMON BROKE FREE');
        pokeBallStillHolding = false;
      }
    }
    if (numOfShakes === 4 && pokeBallStillHolding === true) {
      console.log('CAPTURE SUCCESS');
    }
  }

  function displayCaptureChances() {
    if (ballUsed === 'Master Ball') {
      return (
        <>
          <p>Successful Capture: 100% Gotcha! {pokemon.name} was caught!</p>
          <CaptureRateBar title={captureQuotes[4]} />
        </>
      );
    }

    return (
      <>
        <p>
          0 Shakes: {captureChances[0].chance}% {captureQuotes[0]}
        </p>
        <p>
          1 Shakes: {captureChances[1].chance}% {captureQuotes[1]}
        </p>
        <p>
          2 Shakes: {captureChances[2].chance}% {captureQuotes[2]}
        </p>
        <p>
          3 Shakes: {captureChances[3].chance}% {captureQuotes[3]}
        </p>
        <p>
          Successful Capture: {captureChances[4].chance}% {captureQuotes[4]}
        </p>
        <CaptureRateBar
          title={
            'Success: ' + captureChances[4].chance + '% ' + captureQuotes[4]
          }
        >
          <Wobbles0
            barWidth={captureChances[0].chance}
            title={
              '0 Shakes: ' + captureChances[0].chance + '% ' + captureQuotes[0]
            }
          />
          <Wobbles1
            barWidth={captureChances[1].chance}
            title={
              '1 Shake: ' + captureChances[1].chance + '% ' + captureQuotes[1]
            }
          />
          <Wobbles2
            barWidth={captureChances[2].chance}
            title={
              '2 Shakes: ' + captureChances[2].chance + '% ' + captureQuotes[2]
            }
          />
          <Wobbles3
            barWidth={captureChances[3].chance}
            title={
              '3 Shakes: ' + captureChances[3].chance + '% ' + captureQuotes[3]
            }
          />
        </CaptureRateBar>
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
              const newLevel = +(event.target as HTMLInputElement).value;
              setCurrentLevel(newLevel);
              setCurrentHP(calculateStatValues(pokemon, newLevel).hp);
            }}
          />
        </label>
        <button onClick={throwBall}>Throw</button>
      </>
    );
  }
}

export default CaptureChance;

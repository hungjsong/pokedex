import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setDialogBoxMessage } from '../../redux/catchingSimulatorSlice';
import DialogBox from './DialogBox';

const GrassTerain = styled.span`
  display: block;
  background: transparent url(https://www.spriters-resource.com/download/18502/)
    no-repeat scroll -518px -148px;
  width: 255px;
  height: 143px;
  margin-left: auto;
  margin-right: auto;
`;

const Pokemon = styled.span<{ pokemonID: number }>`
  float: left;
  background-image: url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(
    props
  ) => props.pokemonID}.png);
  background-size: 100px;
  background-repeat: no-repeat;
  width: 100px;
  height: 100px;
  margin-left: 145px;
  margin-top: 23px;
`;

type PokemonEncounterProps = {
  endEncounter: Dispatch<SetStateAction<boolean>>;
};

function PokemonEncounter(props: PokemonEncounterProps) {
  const [turn, setTurn] = useState(1);
  const wildPokemon = useAppSelector(
    (state) => state.catchingSimulator.wildPokemon
  );
  const ballUsed = useAppSelector((state) => state.catchingSimulator.pokeball);
  const [catchSuccessful, setCatchSuccessful] = useState(false);
  const dispatch = useAppDispatch();
  const captureQuotes = [
    'Oh no! The Pokémon broke free!',
    'Aww! It appeared to be caught!',
    'Aargh! Almost had it!',
    'Gah! It was so close, too!',
    'Gotcha! ' + wildPokemon.name + ' was caught!',
  ];
  const statusCondition = useAppSelector((state) =>
    state.catchingSimulator.status?.toLowerCase()
  );
  const [storyCompleted, setStoryCompleted] = useState(true);
  const currentLevel = useAppSelector(
    (state) => state.catchingSimulator.wildPokemon.level
  )!;
  const catchRate = wildPokemon.catchRate;
  const maximumHP = useAppSelector(
    (state) => state.catchingSimulator.hp.maximumHP
  );
  const currentHP = useAppSelector(
    (state) => state.catchingSimulator.hp.currentHP
  );
  const timeOfDay = useAppSelector(
    (state) => state.catchingSimulator.timeOfDay
  );
  const UserPokemon = useAppSelector(
    (state) => state.catchingSimulator.userPokemon
  );
  const encounterMethod = useAppSelector(
    (state) => state.catchingSimulator.encounterMethod
  );

  function calculateBallBonus() {
    switch (ballUsed) {
      case 'Heavy Ball':
        if (wildPokemon.weight! >= 300) {
          return 30;
        } else if (wildPokemon.weight! >= 200 && wildPokemon.weight! < 300) {
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
        if (encounterMethod === 'Fishing') {
          return 4;
        }
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
        const isMoonStonepokemon = moonStonePokemon.includes(wildPokemon.name!);

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
        const isUltraBeast = ultraBeastPokemon.includes(wildPokemon.name!);

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
      case 'Dusk Ball':
        if (timeOfDay === 'Night' || encounterMethod === 'Cave') {
          return 3;
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

  function runAway() {
    setTurn(1);
    props.endEncounter(false);
    dispatch(setDialogBoxMessage({ message: 'What will you do?' }));
  }

  function throwBall() {
    const shakeHoldSuccessRate = calculateShakeHoldSuccessRate();
    let numOfShakes = 0;
    let pokeBallStillHolding = true;
    let ballHoldingMessage = '.';

    dispatch(
      setDialogBoxMessage({ message: 'You used one ' + ballUsed + '!' })
    );

    const shakeInterval = setInterval(function () {
      const shakeCheck = Math.floor(Math.random() * 65536);
      if (shakeCheck < shakeHoldSuccessRate) {
        numOfShakes > 0 ? (ballHoldingMessage = ballHoldingMessage + ' .') : '';
        dispatch(setDialogBoxMessage({ message: ballHoldingMessage }));
        numOfShakes++;
      } else {
        dispatch(setDialogBoxMessage({ message: captureQuotes[numOfShakes] }));
        pokeBallStillHolding = false;
        setTurn(turn + 1);
        clearInterval(shakeInterval);
      }
      if (numOfShakes === 4 && pokeBallStillHolding === true) {
        dispatch(setDialogBoxMessage({ message: captureQuotes[numOfShakes] }));
        setCatchSuccessful(true);
        clearInterval(shakeInterval);
      }
    }, 1500);
  }

  return (
    <>
      Turn {turn}
      <GrassTerain>
        <Pokemon pokemonID={wildPokemon.id!} />
      </GrassTerain>
      <DialogBox />
      {!catchSuccessful && <button onClick={throwBall}>Throw</button>}
      <button onClick={runAway}>
        {catchSuccessful === true ? 'Return to Menu' : 'Run'}
      </button>
    </>
  );
}

export default PokemonEncounter;

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
  }, [currentLevel, statusCondition]);

  function calculateBallBonus() {
    return 1; //WIP
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

  if (captureChances.length === 0) {
    return <Loader />;
  } else {
    return (
      <>
        <h1>Catching Simulator</h1>
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

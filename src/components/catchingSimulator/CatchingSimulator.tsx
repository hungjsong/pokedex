import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function CatchingSimulator() {
  const { t } = useTranslation();
  const [maximumHP, setMaximumHP] = useState(100);
  const [currentHP, setCurrentHP] = useState(1);
  const [catchRate, setCatchRate] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [statusCondition, setStatusCondition] = useState('');
  const [numOfPokemonCaught, setNumOfPokemonCaught] = useState(0);
  const [finalCaptureRate, setFinalCaptureRate] = useState(0);
  const [ballUsed, setBallUsed] = useState(0);
  const [storyCompleted, setStoryCompleted] = useState(false);

  useEffect(() => {
    calculateCaptureRateGen8();
  }, []);

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
        catchRate *
        ballBonus) /
        (3 * maximumHP)) *
      lowLevelModifier *
      statusConditionModifier *
      difficultyModifier;

    setFinalCaptureRate(+(finalCaptureRate * 100).toFixed(2));
  }

  return (
    <nav>
      <h1>Catching Simulator</h1>
      <p>{finalCaptureRate}%</p>
      <Link to="/">{t('home')}</Link>
    </nav>
  );
}

export default CatchingSimulator;

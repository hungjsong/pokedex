import { calculateShakeHoldSuccessRate } from '../../utilityFunctions';
import { useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import CaptureChancesBars from './CaptureChancesBars';
import styled from 'styled-components';

const PokeBallIcon = styled.img`
  vertical-align: middle;
`;

function SelectedBallCaptureChance() {
  const ballUsed = useAppSelector((state) => state.catchingSimulator.pokeball);
  const statusCondition = useAppSelector((state) =>
    state.catchingSimulator.status?.toLowerCase()
  );
  const currentLevel = useAppSelector(
    (state) => state.catchingSimulator.wildPokemon.level
  )!;
  const [captureChances, setCaptureChances] = useState<{ chance: number }[]>(
    []
  );

  useEffect(() => {
    setCaptureChances(calculateCaptureChances());
  }, [currentLevel, statusCondition, ballUsed]);

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

  return (
    <>
      <PokeBallIcon
        src={
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/' +
          ballUsed.toLowerCase().split(' ').join('-') +
          '.png'
        }
      />
      {ballUsed}'s Capture Chances
      <br />
      <CaptureChancesBars captureChances={captureChances} />
    </>
  );
}

export default SelectedBallCaptureChance;

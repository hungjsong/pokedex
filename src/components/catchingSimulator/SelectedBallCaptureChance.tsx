import { calculateShakeHoldSuccessRate } from '../../utilityFunctions';
import { useAppSelector } from '../../hooks';
import CaptureChancesBars from './CaptureChancesBars';
import styled from 'styled-components';
import { CAPTURE_RNG_RATE } from '../../constants';

const PokeBallIcon = styled.img`
  vertical-align: middle;
`;

function SelectedBallCaptureChance() {
  const ballUsed = useAppSelector((state) => state.catchingSimulator.pokeball);

  function calculateCaptureChances() {
    const shakeHoldSuccessRate =
      calculateShakeHoldSuccessRate() / CAPTURE_RNG_RATE;

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
      <CaptureChancesBars captureChances={calculateCaptureChances()} />
    </>
  );
}

export default SelectedBallCaptureChance;

import {
  calculateCaptureChances,
  calculateShakeHoldSuccessRate,
} from '../../utilityFunctions';
import { useAppSelector } from '../../hooks';
import CaptureChancesBars from './CaptureChancesBars';
import styled from 'styled-components';
import { CAPTURE_RNG_RATE } from '../../constants';

const PokeBallIcon = styled.img`
  vertical-align: middle;
`;

function SelectedBallCaptureChance() {
  const ballUsed = useAppSelector((state) => state.catchingSimulator.pokeball);

  return (
    <div>
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
    </div>
  );
}

export default SelectedBallCaptureChance;

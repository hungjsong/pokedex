import Loader from '../common/Loader';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';

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

type CaptureChanceBarsProps = {
  captureChances: {
    chance: number;
  }[];
};

function CaptureChancesBars(props: CaptureChanceBarsProps) {
  const wildPokemon = useAppSelector(
    (state) => state.catchingSimulator.wildPokemon
  );
  const captureQuotes = [
    'Oh no! The Pokémon broke free!',
    'Aww! It appeared to be caught!',
    'Aargh! Almost had it!',
    'Gah! It was so close, too!',
    `Gotcha! ${wildPokemon.name} was caught!`,
  ];

  function displayCaptureChances() {
    return (
      <>
        <CaptureRateBar
          title={`Success: 
            ${
              props.captureChances[4].chance > 100
                ? 100
                : props.captureChances[4].chance
            }
            % 
            ${captureQuotes[4]}`}
        >
          <Wobbles0
            barWidth={props.captureChances[0].chance}
            title={`0 Shakes: 
              ${props.captureChances[0].chance} 
              % 
              ${captureQuotes[0]}`}
          />
          <Wobbles1
            barWidth={props.captureChances[1].chance}
            title={`1 Shake: 
              ${props.captureChances[1].chance} 
              % 
              ${captureQuotes[1]}`}
          />
          <Wobbles2
            barWidth={props.captureChances[2].chance}
            title={`2 Shakes: 
              ${props.captureChances[2].chance}
              % 
              ${captureQuotes[2]}`}
          />
          <Wobbles3
            barWidth={props.captureChances[3].chance}
            title={`3 Shakes: 
              ${props.captureChances[3].chance} 
              % 
              ${captureQuotes[3]}`}
          />
        </CaptureRateBar>
      </>
    );
  }

  if (props.captureChances.length === 0) {
    return <Loader />;
  } else {
    return <>{displayCaptureChances()}</>;
  }
}

export default CaptureChancesBars;

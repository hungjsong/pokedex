import { calculateShakeHoldSuccessRate } from '../../utilityFunctions';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  setCurrentTurn,
  setDialogBoxMessage,
} from '../../redux/catchingSimulatorSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import DialogBox from './DialogBox';
import styled from 'styled-components';

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
  const dispatch = useAppDispatch();
  const [catchSuccessful, setCatchSuccessful] = useState(false);
  const [turn, setTurn] = useState(1);
  const ballUsed = useAppSelector((state) => state.catchingSimulator.pokeball);
  const wildPokemon = useAppSelector(
    (state) => state.catchingSimulator.wildPokemon
  );
  const captureQuotes = [
    'Oh no! The Pokémon broke free!',
    'Aww! It appeared to be caught!',
    'Aargh! Almost had it!',
    'Gah! It was so close, too!',
    'Gotcha! ' + wildPokemon.name + ' was caught!',
  ];

  useEffect(() => {
    dispatch(setCurrentTurn({ turn: turn }));
  }, [turn]);

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

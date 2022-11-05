import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setEV } from '../../redux/teamBuilderSlice';
import { EVType } from '../../types/pokemonTypes';

type PokemonSlotProps = {
  evName: EVType;
  evStatValue: number;
  teamSlotNumber: number;
  remainingEVs: number;
};

function EVSlider(props: PokemonSlotProps) {
  const dispatch = useDispatch();

  function changeEV(event: ChangeEvent<HTMLInputElement>) {
    const inputEV = +event.target.value;
    const validEV =
      inputEV <= +event.target.max &&
      inputEV >= +event.target.min &&
      inputEV - props.evStatValue <= props.remainingEVs;
    if (validEV) {
      dispatch(
        setEV({
          evInputValue: +event.target.value,
          teamSlotNumber: props.teamSlotNumber,
          evName: props.evName, //'hpp'
        })
      );
    }
  }

  return (
    <>
      <input
        id={props.evName}
        type="number"
        min="0"
        max="252"
        value={props.evStatValue}
        onChange={changeEV}
      />
      <input
        id={props.evName}
        type="range"
        min="0"
        max="252"
        value={props.evStatValue}
        step="1"
        onInput={changeEV}
      />
    </>
  );
}

export default EVSlider;

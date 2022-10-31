import { ChangeEvent, Dispatch, SetStateAction } from 'react';

type PokemonSlotProps = {
  setEV: Dispatch<SetStateAction<number>>;
  evName: string;
  evStatType: number;
};

function EVSlider(props: PokemonSlotProps) {
  function changeEV(event: ChangeEvent<HTMLInputElement>) {
    props.setEV(+event.target.value);
  }

  return (
    <>
      <input
        id={props.evName}
        type="number"
        min="0"
        max="252"
        value={props.evStatType}
        onChange={changeEV}
      />
      <input
        id={props.evName}
        type="range"
        min="0"
        max="252"
        value={props.evStatType}
        step="1"
        onInput={changeEV}
      />
    </>
  );
}

export default EVSlider;

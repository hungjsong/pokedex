import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { setIV } from '../../redux/teamBuilderSlice';

type PokemonIVsType = {
  teamSlotNumber: number;
};

function PokemonIVs(props: PokemonIVsType) {
  const team = useAppSelector((state) => state.teamBuilder.team);
  const hpIV = team[props.teamSlotNumber].iv!.hp;
  const atkIV = team[props.teamSlotNumber].iv!.atk;
  const defIV = team[props.teamSlotNumber].iv!.def;
  const spAtkIV = team[props.teamSlotNumber].iv!.spAtk;
  const spDefIV = team[props.teamSlotNumber].iv!.spDef;
  const spdIV = team[props.teamSlotNumber].iv!.spd;
  const dispatch = useDispatch();

  function handleIVChange(event: ChangeEvent<HTMLInputElement>) {
    const inputIV = +event.target.value;
    const validIV =
      inputIV <= +event.target.max && inputIV >= +event.target.min;
    if (validIV) {
      dispatch(
        setIV({
          ivInputValue: +event.target.value,
          teamSlotNumber: props.teamSlotNumber,
          ivName: event.target.id,
        })
      );
    }
  }

  function displayIVs() {
    return (
      <>
        <input
          id="hp"
          type="number"
          min="0"
          max="31"
          value={hpIV}
          onChange={handleIVChange}
        />
        <input
          id="atk"
          type="number"
          min="0"
          max="31"
          value={atkIV}
          onChange={handleIVChange}
        />
        <input
          id="def"
          type="number"
          min="0"
          max="31"
          value={defIV}
          onChange={handleIVChange}
        />
        <input
          id="spAtk"
          type="number"
          min="0"
          max="31"
          value={spAtkIV}
          onChange={handleIVChange}
        />
        <input
          id="spDef"
          type="number"
          min="0"
          max="31"
          value={spDefIV}
          onChange={handleIVChange}
        />
        <input
          id="spd"
          type="number"
          min="0"
          max="31"
          value={spdIV}
          onChange={handleIVChange}
        />
      </>
    );
  }

  return displayIVs();
}

export default PokemonIVs;

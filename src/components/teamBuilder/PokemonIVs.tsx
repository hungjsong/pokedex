import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setIV } from '../../redux/teamBuilderSlice';
import { useAppSelector } from '../../hooks';
import {
  MAXIMUM_INDIVIDUAL_VALUES,
  MINIMUM_INDIVIDUAL_VALUES,
} from '../../constants';

type PokemonIVsProps = {
  teamSlotNumber: number;
};

function PokemonIVs(props: PokemonIVsProps) {
  const team = useAppSelector((state) => state.teamBuilder.team);
  const hpIV = team[props.teamSlotNumber].iv!.hp;
  const atkIV = team[props.teamSlotNumber].iv!.atk;
  const defIV = team[props.teamSlotNumber].iv!.def;
  const spAtkIV = team[props.teamSlotNumber].iv!.spAtk;
  const spDefIV = team[props.teamSlotNumber].iv!.spDef;
  const spdIV = team[props.teamSlotNumber].iv!.spd;
  const dispatch = useDispatch();

  function handleIVChange(event: ChangeEvent<HTMLInputElement>) {
    const inputIV = Number(event.target.value);
    const validIV =
      inputIV <= Number(event.target.max) &&
      inputIV >= Number(event.target.min);
    if (validIV) {
      dispatch(
        setIV({
          ivInputValue: Number(event.target.value),
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
          min={MINIMUM_INDIVIDUAL_VALUES}
          max={MAXIMUM_INDIVIDUAL_VALUES}
          value={hpIV}
          onChange={handleIVChange}
        />
        <input
          id="atk"
          type="number"
          min={MINIMUM_INDIVIDUAL_VALUES}
          max={MAXIMUM_INDIVIDUAL_VALUES}
          value={atkIV}
          onChange={handleIVChange}
        />
        <input
          id="def"
          type="number"
          min={MINIMUM_INDIVIDUAL_VALUES}
          max={MAXIMUM_INDIVIDUAL_VALUES}
          value={defIV}
          onChange={handleIVChange}
        />
        <input
          id="spAtk"
          type="number"
          min={MINIMUM_INDIVIDUAL_VALUES}
          max={MAXIMUM_INDIVIDUAL_VALUES}
          value={spAtkIV}
          onChange={handleIVChange}
        />
        <input
          id="spDef"
          type="number"
          min={MINIMUM_INDIVIDUAL_VALUES}
          max={MAXIMUM_INDIVIDUAL_VALUES}
          value={spDefIV}
          onChange={handleIVChange}
        />
        <input
          id="spd"
          type="number"
          min={MINIMUM_INDIVIDUAL_VALUES}
          max={MAXIMUM_INDIVIDUAL_VALUES}
          value={spdIV}
          onChange={handleIVChange}
        />
      </>
    );
  }

  return displayIVs();
}

export default PokemonIVs;

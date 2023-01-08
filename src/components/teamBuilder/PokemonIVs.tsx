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
  const { teamSlotNumber } = props;
  const { team } = useAppSelector((state) => state.teamBuilder);
  const {
    hp: hpIV,
    atk: atkIV,
    def: defIV,
    spAtk: spAtkIV,
    spDef: spDefIV,
    spd: spdIV,
  } = team[props.teamSlotNumber].iv!;
  const dispatch = useDispatch();

  function handleIVChange(event: ChangeEvent<HTMLInputElement>) {
    const { max, min, value, id } = event.target;
    const inputIV = Number(value);
    const validIV = inputIV <= Number(max) && inputIV >= Number(min);
    if (validIV) {
      dispatch(
        setIV({
          ivInputValue: Number(value),
          teamSlotNumber: teamSlotNumber,
          ivName: id,
        })
      );
    }
  }

  return (
    <div>
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
    </div>
  );
}

export default PokemonIVs;

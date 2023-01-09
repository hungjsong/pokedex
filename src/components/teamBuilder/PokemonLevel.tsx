import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setLevel } from '../../redux/teamBuilderSlice';
import { useAppSelector } from '../../hooks';
import { MAXIMUM_POKEMON_LEVEL, MINIMUM_POKEMON_LEVEL } from '../../constants';

type PokemonLevelProps = {
  teamSlotNumber: number;
};

function PokemonLevel(props: PokemonLevelProps) {
  const { teamSlotNumber } = props;
  const { team } = useAppSelector((state) => state.teamBuilder);
  const { level } = team[teamSlotNumber];
  const dispatch = useDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { max, min, value } = event.target;
    const inputLevel = Number(value);
    const validLevel = inputLevel <= Number(max) && inputLevel >= Number(min);
    if (validLevel) {
      dispatch(
        setLevel({
          level: inputLevel,
          teamSlotNumber: teamSlotNumber,
        })
      );
    }
  }

  return (
    <label>
      Level
      <input
        type="number"
        min={MINIMUM_POKEMON_LEVEL}
        max={MAXIMUM_POKEMON_LEVEL}
        value={level}
        onChange={handleChange}
      />
    </label>
  );
}

export default PokemonLevel;

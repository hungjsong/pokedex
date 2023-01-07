import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setLevel } from '../../redux/teamBuilderSlice';
import { useAppSelector } from '../../hooks';
import { MAXIMUM_POKEMON_LEVEL, MINIMUM_POKEMON_LEVEL } from '../../constants';

type PokemonLevelProps = {
  teamSlotNumber: number;
};

function PokemonLevel(props: PokemonLevelProps) {
  const team = useAppSelector((state) => state.teamBuilder.team);
  const level = team[props.teamSlotNumber].level;
  const dispatch = useDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const inputLevel = Number(event.target.value);
    const validLevel =
      inputLevel <= Number(event.target.max) &&
      inputLevel >= Number(event.target.min);
    if (validLevel) {
      dispatch(
        setLevel({
          level: inputLevel,
          teamSlotNumber: props.teamSlotNumber,
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

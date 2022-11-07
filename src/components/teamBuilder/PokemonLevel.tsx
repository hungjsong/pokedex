import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { setLevel } from '../../redux/teamBuilderSlice';

type PokemonLevelType = {
  teamSlotNumber: number;
};

function PokemonLevel(props: PokemonLevelType) {
  const team = useAppSelector((state) => state.teamBuilder.team);
  const level = team[props.teamSlotNumber].level;
  const dispatch = useDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const inputLevel = +event.target.value;
    const validLevel =
      inputLevel <= +event.target.max && inputLevel >= +event.target.min;
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
        min="1"
        max="100"
        value={level}
        onChange={handleChange}
      />
    </label>
  );
}

export default PokemonLevel;

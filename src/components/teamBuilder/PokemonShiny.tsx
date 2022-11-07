import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { setShiny } from '../../redux/teamBuilderSlice';

type PokemonShinyType = {
  teamSlotNumber: number;
};

function PokemonShiny(props: PokemonShinyType) {
  const team = useAppSelector((state) => state.teamBuilder.team);
  const isShiny = team[props.teamSlotNumber].shiny;
  const dispatch = useDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(
      setShiny({
        isShiny: event.target.checked,
        teamSlotNumber: props.teamSlotNumber,
      })
    );
  }

  return (
    <label>
      Shiny:
      <input
        name="isShiny"
        type="checkbox"
        checked={isShiny}
        onChange={handleChange}
      />
    </label>
  );
}

export default PokemonShiny;

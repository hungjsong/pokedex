import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setShiny } from '../../redux/teamBuilderSlice';
import { useAppSelector } from '../../hooks';

type PokemonShinyProps = {
  teamSlotNumber: number;
};

function PokemonShiny(props: PokemonShinyProps) {
  const { teamSlotNumber } = props;
  const { team } = useAppSelector((state) => state.teamBuilder);
  const { shiny: isShiny } = team[teamSlotNumber];
  const dispatch = useDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;
    dispatch(
      setShiny({
        isShiny: checked,
        teamSlotNumber: teamSlotNumber,
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

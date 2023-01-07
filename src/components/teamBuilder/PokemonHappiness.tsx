import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setHapppiness } from '../../redux/teamBuilderSlice';
import { useAppSelector } from '../../hooks';
import { MAXIMUM_HAPPINESS, MINIMUM_HAPPINESS } from '../../constants';

type PokemonHappinessProps = {
  teamSlotNumber: number;
};

function PokemonHappiness(props: PokemonHappinessProps) {
  const team = useAppSelector((state) => state.teamBuilder.team);
  const happiness = team[props.teamSlotNumber].happiness;
  const dispatch = useDispatch();

  function handleHappinessChange(event: ChangeEvent<HTMLInputElement>) {
    const happiness = +event.target.value;
    const validHappinessEntered =
      happiness <= +event.target.max && happiness >= +event.target.min;
    if (validHappinessEntered) {
      dispatch(
        setHapppiness({
          happiness: happiness,
          teamSlotNumber: props.teamSlotNumber,
        })
      );
    }
  }

  return (
    <label>
      Happiness:
      <input
        type="number"
        min={MINIMUM_HAPPINESS}
        max={MAXIMUM_HAPPINESS}
        value={happiness}
        onChange={handleHappinessChange}
      />
    </label>
  );
}

export default PokemonHappiness;

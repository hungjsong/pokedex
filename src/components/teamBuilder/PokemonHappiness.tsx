import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { setHapppiness } from '../../redux/teamBuilderSlice';

type PokemonHappinessType = {
  teamSlotNumber: number;
};

function PokemonHappiness(props: PokemonHappinessType) {
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
        min="1"
        max="255"
        value={happiness}
        onChange={handleHappinessChange}
      />
    </label>
  );
}

export default PokemonHappiness;

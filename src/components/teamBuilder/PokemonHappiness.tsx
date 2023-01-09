import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setHapppiness } from '../../redux/teamBuilderSlice';
import { useAppSelector } from '../../hooks';
import { MAXIMUM_HAPPINESS, MINIMUM_HAPPINESS } from '../../constants';

type PokemonHappinessProps = {
  teamSlotNumber: number;
};

function PokemonHappiness(props: PokemonHappinessProps) {
  const { team } = useAppSelector((state) => state.teamBuilder);
  const { teamSlotNumber } = props;
  const { happiness } = team[teamSlotNumber];
  const dispatch = useDispatch();

  function handleHappinessChange(event: ChangeEvent<HTMLInputElement>) {
    const { max, min, value } = event.target;
    const happiness = Number(value);
    const validHappinessEntered =
      happiness <= Number(max) && happiness >= Number(min);
    if (validHappinessEntered) {
      dispatch(
        setHapppiness({
          happiness: happiness,
          teamSlotNumber: teamSlotNumber,
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

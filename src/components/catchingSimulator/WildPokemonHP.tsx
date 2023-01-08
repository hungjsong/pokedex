import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentHP } from '../../redux/catchingSimulatorSlice';

function WildPokemonHP() {
  const { currentHP, maximumHP } = useAppSelector(
    (state) => state.catchingSimulator.hp
  );
  const dispatch = useAppDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { max, min, value } = event.target;
    const validHPValue =
      Number(value) >= Number(min) && Number(value) <= Number(max);
    if (validHPValue) {
      dispatch(setCurrentHP({ currentHP: Number(value) }));
    }
  }

  return (
    <>
      <label>
        Current HP:
        <input
          type="number"
          min={1}
          max={maximumHP}
          value={currentHP}
          onChange={handleChange}
        />
        /{maximumHP}
      </label>
    </>
  );
}

export default WildPokemonHP;

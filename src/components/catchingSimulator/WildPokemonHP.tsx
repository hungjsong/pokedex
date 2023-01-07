import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentHP } from '../../redux/catchingSimulatorSlice';

function WildPokemonHP() {
  const maxHP = useAppSelector((state) => state.catchingSimulator.hp.maximumHP);
  const currentHP = useAppSelector(
    (state) => state.catchingSimulator.hp.currentHP
  );
  const dispatch = useAppDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const validHPValue =
      Number(event.target.value) >= Number(event.target.min) &&
      Number(event.target.value) <= Number(event.target.max);
    if (validHPValue) {
      dispatch(setCurrentHP({ currentHP: Number(event.target.value) }));
    }
  }

  return (
    <>
      <label>
        Current HP:
        <input
          type="number"
          min={1}
          max={maxHP}
          value={currentHP}
          onChange={handleChange}
        />
        /{maxHP}
      </label>
    </>
  );
}

export default WildPokemonHP;

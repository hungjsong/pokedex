import { setLevel } from '../../redux/catchingSimulatorSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';

function WildPokemonLevel() {
  const dispatch = useDispatch();
  const pokemon = useAppSelector((state) => state.catchingSimulator.pokemon);
  const currentLevel = pokemon.level!;

  return (
    <label>
      Level:
      <input
        type="number"
        min="1"
        max="100"
        value={currentLevel}
        onChange={(event) => {
          const newLevel = +(event.target as HTMLInputElement).value;
          dispatch(setLevel({ level: newLevel }));
        }}
      />
    </label>
  );
}

export default WildPokemonLevel;

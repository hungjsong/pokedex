import { setLevel } from '../../redux/catchingSimulatorSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { MAXIMUM_LEVEL, MINIMUM_LEVEL } from '../../constants';

type AdjustSimulatorPokemonLevelProps = {
  isWild: boolean;
};

function AdjustSimulatorPokemonLevel(props: AdjustSimulatorPokemonLevelProps) {
  const dispatch = useDispatch();
  const { isWild } = props;
  const { userPokemon, wildPokemon } = useAppSelector(
    (state) => state.catchingSimulator
  );
  const pokemon = isWild === true ? wildPokemon : userPokemon;
  const { level: currentLevel } = pokemon;

  return (
    <label>
      Level:
      <input
        type="number"
        min={MINIMUM_LEVEL}
        max={MAXIMUM_LEVEL}
        value={currentLevel}
        onChange={(event) => {
          const newLevel = Number((event.target as HTMLInputElement).value);
          dispatch(setLevel({ level: newLevel, isWild: isWild }));
        }}
      />
    </label>
  );
}

export default AdjustSimulatorPokemonLevel;

import { setLevel } from '../../redux/catchingSimulatorSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { MAXIMUM_LEVEL, MINIMUM_LEVEL } from '../../constants';

type AdjustSimulatorPokemonLevelProps = {
  isWild: boolean;
};

function AdjustSimulatorPokemonLevel(props: AdjustSimulatorPokemonLevelProps) {
  const dispatch = useDispatch();
  const pokemon = useAppSelector((state) =>
    props.isWild === true
      ? state.catchingSimulator.wildPokemon
      : state.catchingSimulator.userPokemon
  );
  const currentLevel = pokemon.level!;

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
          dispatch(setLevel({ level: newLevel, isWild: props.isWild }));
        }}
      />
    </label>
  );
}

export default AdjustSimulatorPokemonLevel;

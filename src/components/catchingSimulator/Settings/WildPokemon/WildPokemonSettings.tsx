import AdjustSimulatorPokemonLevel from '../../AdjustSimulatorPokemonLevel';
import StatusesList from '../../StatusesList';

function WildPokemonSettings() {
  return (
    <>
      <h3>Wild Pokemon Settings</h3>
      <StatusesList />
      <AdjustSimulatorPokemonLevel isWild={true} />
    </>
  );
}

export default WildPokemonSettings;

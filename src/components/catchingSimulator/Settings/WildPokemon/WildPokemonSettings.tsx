import AdjustSimulatorPokemonLevel from '../../AdjustSimulatorPokemonLevel';
import SimulatorPokemonGender from '../../SimulatorPokemonGender';
import StatusesList from '../../StatusesList';

function WildPokemonSettings() {
  return (
    <>
      <h3>Wild Pokemon Settings</h3>
      <StatusesList />
      <AdjustSimulatorPokemonLevel isWild={true} />
      <SimulatorPokemonGender isWild={true} />
    </>
  );
}

export default WildPokemonSettings;

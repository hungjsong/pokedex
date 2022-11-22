import AdjustSimulatorPokemonLevel from '../../AdjustSimulatorPokemonLevel';
import SimulatorPokemonGender from '../../SimulatorPokemonGender';
import StatusesList from '../../StatusesList';
import WildPokemonHP from '../../WildPokemonHP';

function WildPokemonSettings() {
  return (
    <>
      <h3>Wild Pokemon Settings</h3>
      <StatusesList />
      <br />
      <WildPokemonHP />
      <br />
      <AdjustSimulatorPokemonLevel isWild={true} />
      <br />
      <SimulatorPokemonGender isWild={true} />
    </>
  );
}

export default WildPokemonSettings;

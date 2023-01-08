import AdjustSimulatorPokemonLevel from '../../AdjustSimulatorPokemonLevel';
import CatchingPokemonList from '../../CatchingPokemonList';
import SimulatorPokemonGender from '../../SimulatorPokemonGender';
import StatusesList from '../../StatusesList';
import WildPokemonHP from '../../WildPokemonHP';

function WildPokemonSettings() {
  return (
    <div>
      <h3>Wild Pokemon Settings</h3>
      <CatchingPokemonList isWild={true} />
      <StatusesList />
      <br />
      <WildPokemonHP />
      <br />
      <AdjustSimulatorPokemonLevel isWild={true} />
      <br />
      <SimulatorPokemonGender isWild={true} />
    </div>
  );
}

export default WildPokemonSettings;

import AdjustSimulatorPokemonLevel from '../../AdjustSimulatorPokemonLevel';
import CatchingPokemonList from '../../CatchingPokemonList';
import SimulatorPokemonGender from '../../SimulatorPokemonGender';

function UserPokemonSettings() {
  return (
    <>
      <h3>Your Pokemon Settings</h3>
      <CatchingPokemonList isWild={false} />
      <AdjustSimulatorPokemonLevel isWild={false} />
      <br />
      <SimulatorPokemonGender isWild={false} />
    </>
  );
}

export default UserPokemonSettings;

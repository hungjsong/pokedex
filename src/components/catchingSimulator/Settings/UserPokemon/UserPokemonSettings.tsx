import AdjustSimulatorPokemonLevel from '../../AdjustSimulatorPokemonLevel';
import SimulatorPokemonGender from '../../SimulatorPokemonGender';

function UserPokemonSettings() {
  return (
    <>
      <h3>Your Pokemon Settings</h3>
      <AdjustSimulatorPokemonLevel isWild={false} />
      <SimulatorPokemonGender isWild={false} />
    </>
  );
}

export default UserPokemonSettings;

import { useAppDispatch } from '../../hooks';
import { removeTeamPokemon } from '../../redux/teamBuilderSlice';
import EVSliders from './EVSliders';
import ItemList from './ItemList';
import NatureList from './NatureList';
import PokemonGender from './PokemonGender';
import PokemonHappiness from './PokemonHappiness';
import PokemonIVs from './PokemonIVs';
import PokemonLevel from './PokemonLevel';
import PokemonList from './PokemonList';
import PokemonMoves from './PokemonMoves';
import PokemonShiny from './PokemonShiny';

type PokemonSlotProps = {
  teamSlotNumber: number;
};

function PokemonSlot(props: PokemonSlotProps) {
  const { teamSlotNumber } = props;
  const dispatch = useAppDispatch();

  function removePokemon() {
    dispatch(removeTeamPokemon({ teamSlotNumber: teamSlotNumber }));
  }

  return (
    <div>
      <h3>Slot {teamSlotNumber + 1}</h3>
      <button onClick={removePokemon}>Remove Pokemon</button>
      <PokemonList teamSlotNumber={teamSlotNumber} />
      <ItemList teamSlotNumber={teamSlotNumber} />
      <PokemonShiny teamSlotNumber={teamSlotNumber} />
      <PokemonLevel teamSlotNumber={teamSlotNumber} />
      <PokemonHappiness teamSlotNumber={teamSlotNumber} />
      <NatureList teamSlotNumber={teamSlotNumber} />
      <EVSliders teamSlotNumber={teamSlotNumber} />
      <PokemonMoves teamSlotNumber={teamSlotNumber} />
      <PokemonGender teamSlotNumber={teamSlotNumber} />
      <PokemonIVs teamSlotNumber={teamSlotNumber} />
    </div>
  );
}

export default PokemonSlot;

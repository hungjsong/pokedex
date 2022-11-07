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
  return (
    <>
      <PokemonList slotNumber={props.teamSlotNumber} />
      <ItemList slotNumber={props.teamSlotNumber} />
      <PokemonShiny teamSlotNumber={props.teamSlotNumber} />
      <PokemonLevel teamSlotNumber={props.teamSlotNumber} />
      <PokemonHappiness teamSlotNumber={props.teamSlotNumber} />
      <NatureList teamSlotNumber={props.teamSlotNumber} />
      <EVSliders teamSlotNumber={props.teamSlotNumber} />
      <PokemonMoves teamSlotNumber={props.teamSlotNumber} />
      <PokemonGender teamSlotNumber={props.teamSlotNumber} />
      <PokemonIVs teamSlotNumber={props.teamSlotNumber} />
    </>
  );
}

export default PokemonSlot;

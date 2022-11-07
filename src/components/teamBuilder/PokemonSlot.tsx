import PokemonList from './PokemonList';
import ItemList from './ItemList';
import EVSliders from './EVSliders';
import PokemonIVs from './PokemonIVs';
import PokemonMoves from './PokemonMoves';
import PokemonLevel from './PokemonLevel';
import PokemonGender from './PokemonGender';
import NatureList from './NatureList';
import PokemonHappiness from './PokemonHappiness';
import PokemonShiny from './PokemonShiny';

type PokemonSlotProps = {
  slotNumber: number;
};

function PokemonSlot(props: PokemonSlotProps) {
  return (
    <>
      <PokemonList slotNumber={props.slotNumber} />
      <ItemList slotNumber={props.slotNumber} />
      <PokemonShiny teamSlotNumber={props.slotNumber} />
      <PokemonLevel teamSlotNumber={props.slotNumber} />
      <PokemonHappiness teamSlotNumber={props.slotNumber} />
      <NatureList teamSlotNumber={props.slotNumber} />
      <EVSliders teamSlotNumber={props.slotNumber} />
      <PokemonMoves teamSlotNumber={props.slotNumber} />
      <PokemonGender teamSlotNumber={props.slotNumber} />
      <PokemonIVs teamSlotNumber={props.slotNumber} />
    </>
  );
}

export default PokemonSlot;

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

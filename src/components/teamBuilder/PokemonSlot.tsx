import { ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PokemonList from './PokemonList';
import { setHapppiness, setShiny } from '../../redux/teamBuilderSlice';
import { useAppSelector } from '../../hooks';
import ItemList from './ItemList';
import EVSliders from './EVSliders';
import PokemonIVs from './PokemonIVs';
import PokemonMoves from './PokemonMoves';
import PokemonLevel from './PokemonLevel';
import PokemonGender from './PokemonGender';
import NatureList from './NatureList';

type PokemonSlotProps = {
  slotNumber: number;
};

function PokemonSlot(props: PokemonSlotProps) {
  const dispatch = useDispatch();
  const team = useAppSelector((state) => state.teamBuilder.team);
  const isShiny = team[props.slotNumber].shiny;
  const happiness = team[props.slotNumber].happiness;

  useEffect(() => {
    console.log(team);
  }, [team]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.type === 'checkbox') {
      dispatch(
        setShiny({
          isShiny: event.target.checked,
          teamSlotNumber: props.slotNumber,
        })
      );
    }
  }

  function handleHappinessChange(event: ChangeEvent<HTMLInputElement>) {
    const happiness = +event.target.value;
    const validHappinessEntered =
      happiness <= +event.target.max && happiness >= +event.target.min;
    if (validHappinessEntered) {
      dispatch(
        setHapppiness({
          happiness: happiness,
          teamSlotNumber: props.slotNumber,
        })
      );
    }
  }

  return (
    <>
      <PokemonList slotNumber={props.slotNumber} />
      <ItemList slotNumber={props.slotNumber} />
      <label>
        Shiny:
        <input
          name="isShiny"
          type="checkbox"
          checked={isShiny}
          onChange={handleChange}
        />
      </label>
      <PokemonLevel teamSlotNumber={props.slotNumber} />
      <label>
        Happiness:
        <input
          type="number"
          min="1"
          max="255"
          value={happiness}
          onChange={handleHappinessChange}
        />
      </label>
      <NatureList teamSlotNumber={props.slotNumber} />
      <EVSliders teamSlotNumber={props.slotNumber} />
      <PokemonMoves teamSlotNumber={props.slotNumber} />
      <PokemonGender teamSlotNumber={props.slotNumber} />
      <PokemonIVs teamSlotNumber={props.slotNumber} />
    </>
  );
}

export default PokemonSlot;

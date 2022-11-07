import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PokemonList from './PokemonList';
import { capitalize } from '../../utilityFunctions';
import { getPokemonNatures } from '../../API/pokemon';
import { PokemonNature } from '../../types/pokemonTypes';
import {
  setHapppiness,
  setNature,
  setShiny,
} from '../../redux/teamBuilderSlice';
import { useAppSelector } from '../../hooks';
import ItemList from './ItemList';
import EVSliders from './EVSliders';
import PokemonIVs from './PokemonIVs';
import PokemonMoves from './PokemonMoves';
import PokemonLevel from './PokemonLevel';
import PokemonGender from './PokemonGender';

type PokemonSlotProps = {
  slotNumber: number;
};

function PokemonSlot(props: PokemonSlotProps) {
  const dispatch = useDispatch();
  const [pokemonNatures, setPokemonNatures] = useState<PokemonNature[]>([]);
  const [inputNature, setInputNature] = useState('');
  const [displayList, setDisplayList] = useState(false);
  const team = useAppSelector((state) => state.teamBuilder.team);
  const isShiny = team[props.slotNumber].shiny;
  const happiness = team[props.slotNumber].happiness;

  useEffect(() => {
    getPokemonNatures().then((response) => {
      setPokemonNatures(response.payload);
    });

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
    } else {
      setInputNature(event.target.value);
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

  function displayListOfNatures(slotNumber: number) {
    return (
      <ul>
        {pokemonNatures
          .filter((nature) =>
            nature.name.toLowerCase().includes(inputNature.toLowerCase())
          )
          .map((nature) => (
            <>
              <li
                key={nature.name}
                onMouseDown={() => {
                  dispatch(
                    setNature({
                      nature: nature.name,
                      teamSlotNumber: slotNumber,
                    })
                  );
                  setInputNature(nature.name);
                }}
              >
                {capitalize(nature.name) + ' ('}
                {nature.increased_stat !== null ? (
                  <span style={{ color: 'green' }}>
                    {'↑' + nature.increased_stat}
                  </span>
                ) : (
                  ''
                )}
                {nature.decreased_stat !== null ? (
                  <span style={{ color: 'red' }}>
                    {' ↓' + nature.decreased_stat}
                  </span>
                ) : (
                  'No Effect'
                )}
                {')'}
              </li>
            </>
          ))}
      </ul>
    );
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
      <input
        type="search"
        autoComplete="off"
        placeholder="Nature"
        value={inputNature}
        onFocus={() => {
          setDisplayList(true);
        }}
        onBlur={() => {
          setDisplayList(false);
        }}
        onChange={handleChange}
      />
      {displayList && displayListOfNatures(props.slotNumber)}
      <EVSliders teamSlotNumber={props.slotNumber} />
      <PokemonMoves teamSlotNumber={props.slotNumber} />
      <PokemonGender teamSlotNumber={props.slotNumber} />
      <PokemonIVs teamSlotNumber={props.slotNumber} />
    </>
  );
}

export default PokemonSlot;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PokemonList from './PokemonList';
import pokemonNatures from '../pokemonNatures.json';
import { capitalize } from '../utilityFunctions';
import { setNature } from '../features/pokedex/teamBuilderSlice';

function PokemonSlot(props: any) {
  const dispatch = useDispatch();
  const [inputNature, setInputNature] = useState('');
  const [displayList, setDisplayList] = useState(false);

  function handleChange(event: any) {
    setInputNature(event.target.value);
  }

  function displayListOfNatures(slotNumber: number) {
    return (
      <ul>
        {pokemonNatures.natures
          .filter((nature: any) => nature.name.includes(inputNature))
          .map((nature: any, index: number) => (
            <>
              <li
                key={nature.name}
                onMouseDown={() => {
                  dispatch(
                    setNature({
                      name: nature.name,
                      slotNumber: slotNumber,
                    })
                  );
                  setInputNature(nature.name);
                }}
              >
                {capitalize(nature.name)}
              </li>
            </>
          ))}
      </ul>
    );
  }

  return (
    <>
      <PokemonList slotNumber={props.slotNumber} />
      <input
        type="search"
        autoComplete="off"
        placeholder="Nature"
        value={inputNature}
        onFocus={(event) => {
          setDisplayList(true);
        }}
        onBlur={(event) => {
          setDisplayList(false);
        }}
        onChange={handleChange}
        onKeyUp={(event) => {
          setNature((event.target as HTMLInputElement).value.toLowerCase());
        }}
      />
      {displayList && displayListOfNatures(props.slotNumber)}
    </>
  );
}

export default PokemonSlot;

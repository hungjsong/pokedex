import React, { useState } from 'react';
import { capitalize } from '../utilityFunctions';

function PokemonList() {
  const [displayList, setDisplayList] = useState(false);
  const [pokemonID, setPokemonID] = useState('');
  const listOfPokemon = [
    { name: 'bulbasaur' },
    { name: 'charmander' },
    { name: 'garchomp' },
    { name: 'gardevoir' },
  ];

  function displayListOfPokemon() {
    return (
      <ul>
        {listOfPokemon
          .filter((pokemon) => pokemon.name.includes(pokemonID))
          .map((element) => (
            <li
              key={element.name}
              onMouseDown={() => console.log(element.name)} //Replace with dispatch later
            >
              {capitalize(element.name)}
            </li>
          ))}
      </ul>
    );
  }

  return (
    <>
      <div>
        <input
          type="search"
          autoComplete="off"
          id="pokemon-search"
          placeholder="Search Pokémon"
          onFocus={(event) => {
            setDisplayList(true); //Display list of Pokemon
          }}
          onBlur={(event) => {
            setDisplayList(false); //Hide list of Pokemon
          }}
          onKeyUp={(event) => {
            setPokemonID(
              (event.target as HTMLInputElement).value.toLowerCase()
            );
          }}
        />
      </div>
      {displayList && displayListOfPokemon()}
    </>
  );
}

export default PokemonList;

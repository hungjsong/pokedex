import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemon } from '../API/pokemon';
import { setPokemonList } from '../features/pokedex/pokedexSlice';
import { capitalize } from '../utilityFunctions';

function PokemonList() {
  const [displayList, setDisplayList] = useState(false);
  const [pokemonID, setPokemonID] = useState('');
  const dispatch = useDispatch();
  const pokedexEntry = useSelector((state: any) => state.pokedex.pokemonList);

  useEffect(() => {
    getAllPokemon().then((allPokemon) => dispatch(setPokemonList(allPokemon)));
  }, []);

  function displayListOfPokemon() {
    return (
      <ul>
        {pokedexEntry
          .filter((pokemon: any) => pokemon.name.includes(pokemonID))
          .map((element: any, index: number) => (
            <>
              <li
                key={element.name}
                onMouseDown={() => console.log(element.name)} //Replace with dispatch later
              >
                <img
                  src={
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/' +
                    (index + 1) +
                    '.png'
                  }
                ></img>
                {capitalize(element.name)}
              </li>
            </>
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

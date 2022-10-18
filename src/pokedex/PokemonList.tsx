import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemon } from '../API/pokemon';
import { setPokemonList } from '../features/pokedex/pokedexSlice';
import { setPokemon } from '../features/pokedex/teamBuilderSlice';
import { capitalize } from '../utilityFunctions';

function PokemonList(props: any) {
  const [displayList, setDisplayList] = useState(false);
  const [pokemonID, setPokemonID] = useState('');
  const dispatch = useDispatch();
  const pokedexEntry = useSelector((state: any) => state.pokedex.pokemonList);
  const team = useSelector((state: any) => state.teamBuilder.team);

  useEffect(() => {
    getAllPokemon().then((allPokemon) => dispatch(setPokemonList(allPokemon)));
  }, [pokemonID]);

  function handleChange(event: any) {
    setPokemonID(event.target.value);
  }

  function displayListOfPokemon(position: number) {
    return (
      <ul>
        {pokedexEntry
          .filter((pokemon: any) => pokemon.name.includes(pokemonID))
          .map((element: any, index: number) => (
            <>
              <li
                key={element.name}
                onMouseDown={() => {
                  dispatch(
                    setPokemon({
                      name: element.name,
                      teamPosition: position,
                    })
                  );
                  setPokemonID(capitalize(element.name));
                }}
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
        <h3>Slot {props.position + 1}</h3>
        <input
          type="search"
          autoComplete="off"
          placeholder="Search Pokémon"
          value={pokemonID}
          onFocus={(event) => {
            setDisplayList(true); //Display list of Pokemon
          }}
          onBlur={(event) => {
            setDisplayList(false); //Hide list of Pokemon
          }}
          onChange={handleChange}
          onKeyUp={(event) => {
            setPokemonID(
              (event.target as HTMLInputElement).value.toLowerCase()
            );
          }}
        />
        {displayList && displayListOfPokemon(props.position)}
      </div>
    </>
  );
}

export default PokemonList;

import { capitalize } from '../../utilityFunctions';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  getAllPokemon,
  getPokedexEntry,
  getSpeciesDetails,
} from '../../API/pokemon';
import { setCatchingPokemonID } from '../../redux/catchingSimulatorSlice';
import { setPokemonList } from '../../redux/pokedexSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Loader from '../common/Loader';

type CatchingPokemonListTypes = {
  isWild: boolean;
};

function CatchingPokemonList(props: CatchingPokemonListTypes) {
  const [displayList, setDisplayList] = useState(false);
  const [pokemonID, setPokemonID] = useState('');
  const dispatch = useAppDispatch();
  const pokemonList = useAppSelector((state) => state.pokedex.pokemonList);

  useEffect(() => {
    if (pokemonList === null) {
      getAllPokemon().then((allPokemon) =>
        dispatch(setPokemonList(allPokemon))
      );
    }
  }, [pokemonID]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setPokemonID(event.target.value);
  }

  //Temp solution to retrieving pokemonID
  function getPokemonID(url: string) {
    const regex = '0123456789';
    function checkIfNumber(character: string) {
      return regex.includes(character) ? true : false;
    }

    return [...url.split('')]
      .reduce(
        (x, character) => (checkIfNumber(character) ? x + character : x),
        ''
      )
      .slice(1);
  }

  function displayListOfPokemon() {
    if (pokemonList === null) {
      return <Loader />;
    }

    return (
      <ul>
        {pokemonList
          .filter((pokemon) => pokemon.name.includes(pokemonID))
          .map((pokemon) => (
            <li
              key={pokemon.name}
              onMouseDown={() => {
                setPokemonID(pokemon.name);
                getPokedexEntry(pokemon.name).then((pokedexEntry) =>
                  getSpeciesDetails(pokemon.name).then((speciesDetails) => {
                    pokedexEntry.weight = (pokedexEntry.weight * 100) / 1000;
                    dispatch(
                      setCatchingPokemonID({
                        pokemon: pokedexEntry,
                        captureRate: speciesDetails.capture_rate,
                        isWild: props.isWild,
                      })
                    );
                  })
                );
              }}
            >
              <img
                src={
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/' +
                  getPokemonID(pokemon.url) +
                  '.png'
                }
              ></img>
              {capitalize(pokemon.name)}
            </li>
          ))}
      </ul>
    );
  }

  return (
    <div>
      <label>
        {props.isWild ? 'Select Wild Pokemon:' : 'Select Your Pokemon:'}
        <input
          type="search"
          autoComplete="off"
          placeholder="Search"
          value={pokemonID}
          onFocus={() => {
            setDisplayList(true);
          }}
          onBlur={() => {
            setDisplayList(false);
          }}
          onChange={handleChange}
          onKeyUp={(event) => {
            setPokemonID(
              (event.target as HTMLInputElement).value.toLowerCase()
            );
          }}
        />
        {displayList && displayListOfPokemon()}
      </label>
    </div>
  );
}

export default CatchingPokemonList;

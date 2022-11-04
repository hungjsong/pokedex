import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPokemon } from '../../API/pokemon';
import { useAppSelector } from '../../hooks';
import { setPokemonList } from '../../redux/pokedexSlice';
import { setPokemon } from '../../redux/teamBuilderSlice';
import { capitalize } from '../../utilityFunctions';
import Loader from '../common/Loader';

type PokemonListProps = {
  slotNumber: number;
};

function PokemonList(props: PokemonListProps) {
  const [displayList, setDisplayList] = useState(false);
  const [pokemonID, setPokemonID] = useState('');
  const dispatch = useDispatch();
  const pokedexEntry = useAppSelector((state) => state.pokedex.pokemonList);

  useEffect(() => {
    getAllPokemon().then((allPokemon) => dispatch(setPokemonList(allPokemon)));
  }, []);

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

  function displayListOfPokemon(slotNumber: number) {
    if (pokedexEntry === null) {
      return <Loader />;
    }

    return (
      <ul>
        {pokedexEntry
          .filter((pokemon) => pokemon.name.includes(pokemonID))
          .map((pokemon) => (
            <li
              key={pokemon.name}
              onMouseDown={() => {
                getPokemonID(pokemon.url);
                dispatch(
                  setPokemon({
                    name: pokemon.name,
                    pokemonID: parseInt(getPokemonID(pokemon.url)),
                    teamSlotNumber: slotNumber,
                  })
                );
                setPokemonID(pokemon.name);
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
      <h3>Slot {props.slotNumber + 1}</h3>
      <input
        type="search"
        autoComplete="off"
        placeholder="Search Pokémon"
        value={pokemonID}
        onFocus={() => {
          setDisplayList(true);
        }}
        onBlur={() => {
          setDisplayList(false);
        }}
        onChange={handleChange}
        onKeyUp={(event) => {
          setPokemonID((event.target as HTMLInputElement).value.toLowerCase());
        }}
      />
      {displayList && displayListOfPokemon(props.slotNumber)}
    </div>
  );
}

export default PokemonList;

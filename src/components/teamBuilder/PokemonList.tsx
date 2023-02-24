import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { capitalize } from '../../utilityFunctions';
import { getAllPokemon } from '../../API/pokemon';
import Loader from '../common/Loader';
import { setPokemon } from '../../redux/teamBuilderSlice';
import { setPokemonList } from '../../redux/pokedexSlice';
import { useAppSelector } from '../../hooks';

type PokemonListProps = {
  teamSlotNumber: number;
};

function PokemonList(props: PokemonListProps) {
  const [displayList, setDisplayList] = useState(false);
  const [pokemonID, setPokemonID] = useState('');
  const dispatch = useDispatch();
  const { pokemonList: pokedexEntry } = useAppSelector(
    (state) => state.pokedex
  );
  const { teamSlotNumber } = props;
  const { name } = useAppSelector(
    (state) => state.teamBuilder.team[teamSlotNumber]
  );

  useEffect(() => {
    getAllPokemon().then((allPokemon) => dispatch(setPokemonList(allPokemon)));
    setPokemonID(name!);
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
          .map((pokemon) => {
            const { name, url } = pokemon;
            return (
              <li
                key={name}
                onMouseDown={() => {
                  getPokemonID(url);
                  dispatch(
                    setPokemon({
                      name: name,
                      pokemonID: parseInt(getPokemonID(url)),
                      teamSlotNumber: slotNumber,
                    })
                  );
                  setPokemonID(name);
                }}
              >
                <img
                  src={
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/' +
                    getPokemonID(url) +
                    '.png'
                  }
                ></img>
                {capitalize(name)}
              </li>
            );
          })}
      </ul>
    );
  }

  return (
    <div>
      <h3>Slot {teamSlotNumber + 1}</h3>
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
      {displayList && displayListOfPokemon(teamSlotNumber)}
    </div>
  );
}

export default PokemonList;

import { ChangeEvent, useEffect, useState } from 'react';
import { getPokeBalls } from '../../API/pokemon';
import { PokeBall } from '../../types/pokemonTypes';
import Loader from '../common/Loader';

type PokeBallsListProps = {};

function PokeBallsList(props: PokeBallsListProps) {
  const [pokeBalls, setPokeBalls] = useState<PokeBall[]>([]);
  const [displayList, setDisplayList] = useState(false);
  const [selectedPokeBall, setSelectedPokeBall] = useState('');

  useEffect(() => {
    getPokeBalls().then((response) => {
      setPokeBalls(response.payload);
    });
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedPokeBall(event.target.value);
  }

  function displayListOfPokeBalls() {
    if (pokeBalls === null) {
      return <Loader />;
    }

    return (
      <ul>
        {pokeBalls
          .filter((pokeBall) =>
            pokeBall.name.toLowerCase().includes(selectedPokeBall.toLowerCase())
          )
          .map((pokeBall) => (
            <>
              <li
                key={pokeBall.name}
                onMouseDown={() => {
                  setSelectedPokeBall(pokeBall.name);
                }}
              >
                <img
                  src={
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/' +
                    pokeBall.name.toLowerCase().split(' ').join('-') +
                    '.png'
                  }
                ></img>
                {pokeBall.name === 'Poke Ball' ? 'Poké Ball' : pokeBall.name}
              </li>
            </>
          ))}
      </ul>
    );
  }

  function calculateCatchRateModifier() {}

  return (
    <>
      <input
        type="search"
        autoComplete="off"
        placeholder="Pokeball"
        value={selectedPokeBall}
        onFocus={() => {
          setDisplayList(true);
        }}
        onBlur={() => {
          setDisplayList(false);
        }}
        onChange={handleChange}
        onKeyUp={(event) => {
          setSelectedPokeBall(
            (event.target as HTMLInputElement).value.toLowerCase()
          );
        }}
      />
      {displayList && displayListOfPokeBalls()}
    </>
  );
}

export default PokeBallsList;

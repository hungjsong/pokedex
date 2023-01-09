import { ChangeEvent, useEffect, useState } from 'react';
import { getPokeBalls } from '../../API/pokemon';
import { useAppDispatch } from '../../hooks';
import { setPokeBall } from '../../redux/catchingSimulatorSlice';
import { PokeBall } from '../../types/pokemonTypes';
import Loader from '../common/Loader';

type PokeBallsListProps = {};

function PokeBallsList(props: PokeBallsListProps) {
  const dispatch = useAppDispatch();
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
          .filter((pokeBall) => {
            const { name } = pokeBall;
            return name.toLowerCase().includes(selectedPokeBall.toLowerCase());
          })
          .map((pokeBall) => {
            const { name } = pokeBall;
            return (
              <div>
                <li
                  key={name}
                  onMouseDown={() => {
                    setSelectedPokeBall(name);
                    dispatch(setPokeBall({ pokeBall: name }));
                  }}
                >
                  <img
                    src={
                      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/' +
                      name.toLowerCase().split(' ').join('-') +
                      '.png'
                    }
                  ></img>
                  {name === 'Poke Ball' ? 'Poké Ball' : name}
                </li>
              </div>
            );
          })}
      </ul>
    );
  }

  return (
    <div>
      <input
        type="search"
        autoComplete="off"
        placeholder="Poké Ball"
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
    </div>
  );
}

export default PokeBallsList;

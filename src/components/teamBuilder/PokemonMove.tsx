import { ChangeEvent, useEffect, useState } from 'react';
import { getPokemonMoves } from '../../API/pokemon';
import { Move } from '../../types/pokemonTypes';

// type PokemonSlotProps = {
//   setMove: Dispatch<SetStateAction<number>>;
//   pokemonID: string | number;
//   teamSlotNumber: number;
// };

function PokemonMove() {
  const [move, setMove] = useState('');

  const [displayList, setDisplayList] = useState(false);
  const [pokemonMoves, setPokemonMoves] = useState<Move[]>([]);

  useEffect(() => {
    getPokemonMoves().then((response) => {
      setPokemonMoves(response.payload);
    });
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setMove(event.target.value);
  }

  function displayListOfMoves() {
    return (
      <ul>
        {pokemonMoves
          .filter((pokemonMove) =>
            pokemonMove.name.toLowerCase().includes(move.toLowerCase())
          )
          .map((pokemonMove) => (
            <li
              key={pokemonMove.name}
              onMouseDown={() => {
                setMove(pokemonMove.name);
              }}
            >
              <img
                src={
                  'https://play.pokemonshowdown.com/sprites/types/' +
                  pokemonMove.type +
                  '.png'
                }
              />
              <img
                src={
                  'https://play.pokemonshowdown.com/sprites/categories/' +
                  pokemonMove.category +
                  '.png'
                }
              />
              {pokemonMove.name}
            </li>
          ))}
      </ul>
    );
  }

  return (
    <>
      <h3>Move 1</h3>
      <input
        type="search"
        autoComplete="off"
        value={move}
        onFocus={() => {
          setDisplayList(true);
        }}
        onBlur={() => {
          setDisplayList(false);
        }}
        onChange={handleChange}
        onKeyUp={(event) => {
          setMove((event.target as HTMLInputElement).value.toLowerCase());
        }}
      />
      {displayList && displayListOfMoves()}
    </>
  );
}

export default PokemonMove;

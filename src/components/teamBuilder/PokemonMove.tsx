import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { getPokemonMoves } from '../../API/pokemon';
import { Move } from '../../types/pokemonTypes';

type PokemonSlotProps = {
  moveSlotNumber: number;
  selectedMoves: string[];
  setSelectedMoves: Dispatch<SetStateAction<string[]>>;
};

function PokemonMove(props: PokemonSlotProps) {
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
    if (event.target.value === '') {
      const updatedSelectedMoves = props.selectedMoves;
      updatedSelectedMoves[props.moveSlotNumber] = '';
      props.setSelectedMoves(updatedSelectedMoves);
    }
  }

  function displayListOfMoves() {
    return (
      <ul>
        {pokemonMoves
          .filter((pokemonMove) =>
            pokemonMove.name.toLowerCase().includes(move.toLowerCase())
          )
          .filter(
            (pokemonMove) => !props.selectedMoves.includes(pokemonMove.name)
          )
          .map((pokemonMove) => (
            <li
              key={pokemonMove.name}
              onMouseDown={() => {
                const updatedSelectedMoves = props.selectedMoves;
                updatedSelectedMoves[props.moveSlotNumber] = pokemonMove.name;
                setMove(pokemonMove.name);
                props.setSelectedMoves(updatedSelectedMoves);
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
      <h3>Move {props.moveSlotNumber + 1}</h3>
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

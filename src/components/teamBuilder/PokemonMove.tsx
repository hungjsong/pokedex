import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonMoves } from '../../API/pokemon';
import Loader from '../common/Loader';
import { Move } from '../../types/pokemonTypes';
import { setMove } from '../../redux/teamBuilderSlice';

type PokemonMoveProps = {
  moveSlotNumber: number;
  selectedMoves: Move[];
  teamSlotNumber: number;
};

function PokemonMove(props: PokemonMoveProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayList, setDisplayList] = useState(false);
  const [pokemonMoves, setPokemonMoves] = useState<Move[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getPokemonMoves().then((response) => {
      setPokemonMoves(response.payload);
    });
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      dispatch(
        setMove({
          selectedMove: {
            name: '',
            type: 'Normal',
            category: 'Physical',
            accuracy: 0,
            powerPoint: 0,
            power: 0,
            additional_effect: {
              description: null,
              chance: null,
            },
          },
          teamSlotNumber: props.teamSlotNumber,
          moveSlotNumber: props.moveSlotNumber,
        })
      );
    }
  }

  function displayListOfMoves() {
    if (pokemonMoves.length === 0) {
      return <Loader />;
    }

    return (
      <ul>
        {pokemonMoves
          .filter((pokemonMove) =>
            pokemonMove.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter(
            (pokemonMove) =>
              !props.selectedMoves
                .filter(
                  (selectedMove) => selectedMove.name === pokemonMove.name
                )
                .includes(pokemonMove)
          )
          .map((pokemonMove) => (
            <li
              key={pokemonMove.name}
              onMouseDown={() => {
                setSearchTerm(pokemonMove.name);
                dispatch(
                  setMove({
                    selectedMove: pokemonMoves.filter((move) =>
                      move.name.includes(pokemonMove.name)
                    )[0],
                    teamSlotNumber: props.teamSlotNumber,
                    moveSlotNumber: props.moveSlotNumber,
                  })
                );
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
        value={searchTerm}
        onFocus={() => {
          setDisplayList(true);
        }}
        onBlur={() => {
          setDisplayList(false);
        }}
        onChange={handleChange}
        onKeyUp={(event) => {
          setSearchTerm((event.target as HTMLInputElement).value.toLowerCase());
        }}
      />
      {displayList && displayListOfMoves()}
    </>
  );
}

export default PokemonMove;

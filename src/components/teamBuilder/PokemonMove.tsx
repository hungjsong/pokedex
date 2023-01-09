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
  const { moveSlotNumber, selectedMoves, teamSlotNumber } = props;
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
    const { value } = event.target;
    setSearchTerm(value);
    if (value === '') {
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
          teamSlotNumber: teamSlotNumber,
          moveSlotNumber: moveSlotNumber,
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
              !selectedMoves
                .filter(
                  (selectedMove) => selectedMove.name === pokemonMove.name
                )
                .includes(pokemonMove)
          )
          .map((pokemonMove) => {
            const { category, name, type } = pokemonMove;
            return (
              <li
                key={name}
                onMouseDown={() => {
                  setSearchTerm(name);
                  dispatch(
                    setMove({
                      selectedMove: pokemonMoves.filter((move) =>
                        move.name.includes(name)
                      )[0],
                      teamSlotNumber: teamSlotNumber,
                      moveSlotNumber: moveSlotNumber,
                    })
                  );
                }}
              >
                <img
                  src={
                    'https://play.pokemonshowdown.com/sprites/types/' +
                    type +
                    '.png'
                  }
                />
                <img
                  src={
                    'https://play.pokemonshowdown.com/sprites/categories/' +
                    category +
                    '.png'
                  }
                />
                {name}
              </li>
            );
          })}
      </ul>
    );
  }

  return (
    <div>
      <h3>Move {moveSlotNumber + 1}</h3>
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
    </div>
  );
}

export default PokemonMove;

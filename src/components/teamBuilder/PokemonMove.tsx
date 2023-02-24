import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../common/Loader';
import { Move } from '../../types/pokemonTypes';
import { setMove } from '../../redux/teamBuilderSlice';
import { getAllLearnableMoves } from '../../API/teamBuilder';
import { useAppSelector } from '../../hooks';
import { capitalize } from '../../utilityFunctions';

type PokemonMoveProps = {
  moveSlotNumber: number;
  selectedMoves: (Move | null)[];
  teamSlotNumber: number;
};

function PokemonMove(props: PokemonMoveProps) {
  const { moveSlotNumber, selectedMoves, teamSlotNumber } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [displayList, setDisplayList] = useState(false);
  const [pokemonMoves, setPokemonMoves] = useState<Move[]>([]);
  const pokemon = useAppSelector(
    (state) => state.teamBuilder.team[teamSlotNumber]
  );
  const { id, moves } = pokemon;
  const dispatch = useDispatch();

  useEffect(() => {
    getAllLearnableMoves(id!).then((response) => {
      setPokemonMoves(response.data);
    });

    setSearchTerm(
      moves![moveSlotNumber]?.name === undefined
        ? ''
        : moves![moveSlotNumber]!.name
    );
  }, [id]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setSearchTerm(value);
    if (value === '') {
      dispatch(
        setMove({
          selectedMove: null,
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
                .filter((selectedMove) => {
                  if (selectedMove === null) {
                    return '';
                  } else {
                    return selectedMove!.name === pokemonMove.name;
                  }
                })
                .includes(pokemonMove)
          )
          .map((pokemonMove) => {
            const { category, name, type, power, powerPoint, accuracy } =
              pokemonMove;
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
                {name}
                <img
                  src={`https://play.pokemonshowdown.com/sprites/types/${capitalize(
                    type
                  )}.png`}
                />
                <img
                  src={`https://play.pokemonshowdown.com/sprites/categories/${capitalize(
                    category
                  )}.png`}
                />
                Power: {power} | PP: {powerPoint} | Accuracy: {accuracy}
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

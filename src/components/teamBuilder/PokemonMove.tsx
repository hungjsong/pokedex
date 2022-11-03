import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonMoves } from '../../API/pokemon';
import { setMoves } from '../../redux/teamBuilderSlice';
import { Move } from '../../types/pokemonTypes';

type PokemonSlotProps = {
  moveSlotNumber: number;
  selectedMoves: Move[];
  setSelectedMoves: Dispatch<SetStateAction<Move[]>>;
  teamSlotNumber: number;
};

function PokemonMove(props: PokemonSlotProps) {
  const [move, setMove] = useState('');
  const [displayList, setDisplayList] = useState(false);
  const [pokemonMoves, setPokemonMoves] = useState<Move[]>([
    {
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
    {
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
    {
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
    {
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
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    getPokemonMoves().then((response) => {
      setPokemonMoves(response.payload);
    });
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setMove(event.target.value);
    if (event.target.value === '') {
      const updatedSelectedMoves = props.selectedMoves;
      updatedSelectedMoves[props.moveSlotNumber] = {
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
      };
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
                const updatedSelectedMoves = props.selectedMoves;
                updatedSelectedMoves[props.moveSlotNumber] =
                  pokemonMoves.filter((move) =>
                    move.name.includes(pokemonMove.name)
                  )[0];
                setMove(pokemonMove.name);
                props.setSelectedMoves(updatedSelectedMoves);
                dispatch(
                  setMoves({
                    selectedMoves: updatedSelectedMoves,
                    teamSlotNumber: props.teamSlotNumber,
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

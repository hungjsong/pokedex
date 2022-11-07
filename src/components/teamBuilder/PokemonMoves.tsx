import Loader from '../common/Loader';
import PokemonMove from './PokemonMove';
import { useAppSelector } from '../../hooks';

type PokemonMovesProps = {
  teamSlotNumber: number;
};

function PokemonMoves(props: PokemonMovesProps) {
  const team = useAppSelector((state) => state.teamBuilder.team);
  const selectedMoves = team[props.teamSlotNumber].moves;

  function displayMoves() {
    if (selectedMoves === undefined) {
      return <Loader />;
    }

    return (
      <>
        <PokemonMove
          moveSlotNumber={0}
          selectedMoves={selectedMoves}
          teamSlotNumber={props.teamSlotNumber}
        />
        <PokemonMove
          moveSlotNumber={1}
          selectedMoves={selectedMoves}
          teamSlotNumber={props.teamSlotNumber}
        />
        <PokemonMove
          moveSlotNumber={2}
          selectedMoves={selectedMoves}
          teamSlotNumber={props.teamSlotNumber}
        />
        <PokemonMove
          moveSlotNumber={3}
          selectedMoves={selectedMoves}
          teamSlotNumber={props.teamSlotNumber}
        />
      </>
    );
  }

  return displayMoves();
}

export default PokemonMoves;

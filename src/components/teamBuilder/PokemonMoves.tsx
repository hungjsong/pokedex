import Loader from '../common/Loader';
import PokemonMove from './PokemonMove';
import { useAppSelector } from '../../hooks';

type PokemonMovesProps = {
  teamSlotNumber: number;
};

function PokemonMoves(props: PokemonMovesProps) {
  const { teamSlotNumber } = props;
  const { team } = useAppSelector((state) => state.teamBuilder);
  const { moves: selectedMoves } = team[teamSlotNumber];

  if (selectedMoves === undefined) {
    return <Loader />;
  }
  return (
    <div>
      <PokemonMove
        moveSlotNumber={0}
        selectedMoves={selectedMoves}
        teamSlotNumber={teamSlotNumber}
      />
      <PokemonMove
        moveSlotNumber={1}
        selectedMoves={selectedMoves}
        teamSlotNumber={teamSlotNumber}
      />
      <PokemonMove
        moveSlotNumber={2}
        selectedMoves={selectedMoves}
        teamSlotNumber={teamSlotNumber}
      />
      <PokemonMove
        moveSlotNumber={3}
        selectedMoves={selectedMoves}
        teamSlotNumber={teamSlotNumber}
      />
    </div>
  );
}

export default PokemonMoves;

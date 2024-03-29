import CaptureChancesBars from './CaptureChancesBars';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import {
  calculateCaptureChances,
  calculateFinalCaptureRateGen8,
  calculateShakeHoldSuccessRate,
} from '../../utilityFunctions';
import { CAPTURE_RNG_RATE } from '../../constants';

const AllBallsCaptureChancesTable = styled.table`
  margin-left: auto;
  margin-right: auto;
  border-spacing: 0px;
`;

const HeaderCell = styled.th`
  padding: 0.3em;
  text-align: left;
`;

const PokeBallIcon = styled.img`
  vertical-align: middle;
`;

const TableBody = styled.tbody<{ index: number }>`
  background: ${(props) => (props.index % 2 === 0 ? 'white' : '#dfe3ef')};
`;

const TableCell = styled.td`
  padding: 0.3em;
  text-align: left;
`;

const TableCellSuccessRate = styled(TableCell)`
  text-align: right;
`;

const TableHead = styled.thead`
  background-color: #8b989f;
`;

function AllBallsCaptureChances() {
  const { currentTurn, wildPokemon } = useAppSelector(
    (state) => state.catchingSimulator
  );
  const { level } = wildPokemon;
  const allBallsCaptureChances = calculateAllBallsSuccessRate();

  function calculateAllBallsSuccessRate() {
    return [
      {
        name: 'Poke Ball',
        conditions: [
          { description: '', captureChances: calculateCaptureChances(1) },
        ],
      },
      {
        name: 'Great Ball',
        conditions: [
          { description: '', captureChances: calculateCaptureChances(1.5) },
        ],
      },
      {
        name: 'Ultra Ball',
        conditions: [
          { description: '', captureChances: calculateCaptureChances(2) },
        ],
      },
      {
        name: 'Master Ball',
        conditions: [
          { description: '', captureChances: calculateCaptureChances(255) },
        ],
      },
      {
        name: 'Safari Ball',
        conditions: [
          {
            description:
              'Only available in Brilliant Diamond and Shining Pearl',
            captureChances: calculateCaptureChances(1.5),
          },
        ],
      },
      {
        name: 'Fast Ball',
        conditions: [
          {
            description: "Wild Pokemon's base speed >= 100",
            captureChances: calculateCaptureChances(4),
          },
          {
            description: 'Otherwise',
            captureChances: calculateCaptureChances(1),
          },
        ],
      },
      {
        name: 'Level Ball',
        conditions: [
          {
            description: "Your Pokemon's level <= wild Pokemon's level",
            captureChances: calculateCaptureChances(1),
          },
          {
            description: "Wild Pokemon's level < Your Pokemon's level",
            captureChances: calculateCaptureChances(2),
          },
          {
            description: "Wild Pokemon's level <= Your Pokemon's level / 2",
            captureChances: calculateCaptureChances(4),
          },
          {
            description: "Wild Pokemon's level <= Your Pokemon's level / 4",
            captureChances: calculateCaptureChances(8),
          },
        ],
      },
      {
        name: 'Lure Ball',
        conditions: [
          {
            description: 'Pokemon encountered via fishing',
            captureChances: calculateCaptureChances(4),
          },
          {
            description: 'Otherwise',
            captureChances: calculateCaptureChances(1),
          },
        ],
      },
      {
        name: 'Heavy Ball',
        conditions: [
          {
            description: 'Pokemon weight < 100 kg.',
            captureChances: calculateCaptureChances(-20),
          },
          {
            description: '200 kg. < Pokemon weight >= 100 kg.',
            captureChances: calculateCaptureChances(0),
          },
          {
            description: '300 kg. <Pokemon weight >= 200 kg.',
            captureChances: calculateCaptureChances(20),
          },
          {
            description: 'Pokemon weight >= 300 kg.',
            captureChances: calculateCaptureChances(30),
          },
        ],
      },
      {
        name: 'Love Ball',
        conditions: [
          {
            description:
              'Wild Pokemon is the opposite gender of and same species as your Pokemon',
            captureChances: calculateCaptureChances(8),
          },
          {
            description: 'Otherwise',
            captureChances: calculateCaptureChances(1),
          },
        ],
      },
      {
        name: 'Friend Ball',
        conditions: [
          { description: '', captureChances: calculateCaptureChances(1) },
        ],
      },
      {
        name: 'Moon Ball',
        conditions: [
          {
            description: 'Pokemon evolves with a Moon Stone',
            captureChances: calculateCaptureChances(4),
          },
          {
            description: 'Otherwise',
            captureChances: calculateCaptureChances(1),
          },
        ],
      },
      {
        name: 'Net Ball',
        conditions: [
          {
            description: "Pokémon's type(s) is Water or Bug",
            captureChances: calculateCaptureChances(3.5),
          },
          {
            description: 'Otherwise',
            captureChances: calculateCaptureChances(1),
          },
        ],
      },
      {
        name: 'Dive Ball',
        conditions: [
          {
            description: 'Pokemon encountered while on or in water',
            captureChances: calculateCaptureChances(3.5),
          },
          {
            description: 'Otherwise',
            captureChances: calculateCaptureChances(1),
          },
        ],
      },
      {
        name: 'Nest Ball',
        conditions: [
          {
            description:
              "Wild Pokemon's level is < 31 (more effective against lower levels)",
            captureChances: calculateCaptureChances(
              level! < 31 ? (41 - level!) / 10 : 1
            ),
          },
          {
            description: 'Otherwise',
            captureChances: calculateCaptureChances(1),
          },
        ],
      },
      {
        name: 'Repeat Ball',
        conditions: [
          {
            description: 'Pokemon is registered as caught in Pokedex',
            captureChances: calculateCaptureChances(3.5),
          },
          {
            description: 'Otherwise',
            captureChances: calculateCaptureChances(1),
          },
        ],
      },
      {
        name: 'Timer Ball',
        conditions: [
          {
            description: `Capture chance scales with number of turns passed in battle. Caps at turn 11 (Current turn: ${currentTurn})`,
            captureChances: calculateCaptureChances(
              1 + (currentTurn * 1229) / 4096
            ),
          },
        ],
      },
      {
        name: 'Luxury Ball',
        conditions: [
          { description: '', captureChances: calculateCaptureChances(1) },
        ],
      },
      {
        name: 'Premier Ball',
        conditions: [
          { description: '', captureChances: calculateCaptureChances(1) },
        ],
      },
      {
        name: 'Dusk Ball',
        conditions: [
          {
            description:
              'When used at night, inside caves, or on Newmoon Island or the Darkest Day',
            captureChances: calculateCaptureChances(3),
          },
          {
            description: 'Otherwise',
            captureChances: calculateCaptureChances(1),
          },
        ],
      },
      {
        name: 'Heal Ball',
        conditions: [
          { description: '', captureChances: calculateCaptureChances(1) },
        ],
      },
      {
        name: 'Quick Ball',
        conditions: [
          {
            description: 'When used on first turn',
            captureChances: calculateCaptureChances(5),
          },
          {
            description: 'Otherwise',
            captureChances: calculateCaptureChances(1),
          },
        ],
      },
      {
        name: 'Dream Ball',
        conditions: [
          {
            description: 'Pokemon is asleep or has the ability comatose',
            captureChances: calculateCaptureChances(4),
          },
          {
            description: 'Otherwise',
            captureChances: calculateCaptureChances(1),
          },
        ],
      },
      {
        name: 'Beast Ball',
        conditions: [
          {
            description: 'Wild Pokemon is an Ultra Beast',
            captureChances: calculateCaptureChances(5),
          },
          {
            description: 'Otherwise',
            captureChances: calculateCaptureChances(410 / 4096),
          },
        ],
      },
    ];
  }

  return (
    <AllBallsCaptureChancesTable>
      <TableHead>
        <tr>
          <th>Ball Name</th>
          <th colSpan={2}>Catch Rate</th>
          <th>Condition</th>
        </tr>
      </TableHead>
      {allBallsCaptureChances.map((ball, allBallsIndex) => {
        const { conditions, name } = ball;
        return (
          <TableBody index={allBallsIndex} key={ball.name}>
            {conditions.map((condition, index) => {
              const { captureChances, description } = condition;
              const successRate =
                captureChances[4].chance > 100 ? 100 : captureChances[4].chance;

              if (index === 0) {
                return (
                  <tr key={description + index}>
                    <HeaderCell rowSpan={conditions.length}>
                      <PokeBallIcon
                        src={
                          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/' +
                          name.toLowerCase().split(' ').join('-') +
                          '.png'
                        }
                      />
                      {name}
                    </HeaderCell>
                    <TableCell>
                      <CaptureChancesBars captureChances={captureChances} />
                    </TableCell>
                    <TableCellSuccessRate>{successRate}%</TableCellSuccessRate>
                    <TableCell>{description}</TableCell>
                  </tr>
                );
              } else {
                return (
                  <tr key={description + index}>
                    <TableCell>
                      <CaptureChancesBars captureChances={captureChances} />
                    </TableCell>
                    <TableCellSuccessRate>{successRate}%</TableCellSuccessRate>
                    <TableCell>{description}</TableCell>
                  </tr>
                );
              }
            })}
          </TableBody>
        );
      })}
    </AllBallsCaptureChancesTable>
  );
}

export default AllBallsCaptureChances;

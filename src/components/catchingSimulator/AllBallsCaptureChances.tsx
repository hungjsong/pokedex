import CaptureChancesBars from './CaptureChancesBars';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { useState } from 'react';

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
  const wildPokemon = useAppSelector(
    (state) => state.catchingSimulator.wildPokemon
  );
  const statusCondition = useAppSelector((state) =>
    state.catchingSimulator.status?.toLowerCase()
  );
  const [storyCompleted, setStoryCompleted] = useState(true);
  const catchRate = wildPokemon.catchRate;
  const turn = 1;
  const currentLevel = useAppSelector(
    (state) => state.catchingSimulator.wildPokemon.level
  )!;
  const maximumHP = useAppSelector(
    (state) => state.catchingSimulator.hp.maximumHP
  );
  const currentHP = useAppSelector(
    (state) => state.catchingSimulator.hp.currentHP
  );
  const allBallsCaptureChances = calculateAllBallsSuccessRate();

  function displayAllBallsSuccessRate() {
    return (
      <AllBallsCaptureChancesTable>
        <TableHead>
          <tr>
            <th>Ball Name</th>
            <th colSpan={2}>Catch Rate</th>
            <th>Condition</th>
          </tr>
        </TableHead>
        {allBallsCaptureChances.map((ball, allBallsIndex) => (
          <TableBody index={allBallsIndex}>
            {ball.conditions.map((condition, index) => {
              const successRate =
                condition.captureChances[4].chance > 100
                  ? 100
                  : condition.captureChances[4].chance;

              if (index === 0) {
                return (
                  <tr>
                    <HeaderCell rowSpan={ball.conditions.length}>
                      <PokeBallIcon
                        src={
                          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/' +
                          ball.name.toLowerCase().split(' ').join('-') +
                          '.png'
                        }
                      />
                      {ball.name}
                    </HeaderCell>
                    <TableCell>
                      <CaptureChancesBars
                        captureChances={condition.captureChances}
                      />
                    </TableCell>
                    <TableCellSuccessRate>{successRate}%</TableCellSuccessRate>
                    <TableCell>{condition.description}</TableCell>
                  </tr>
                );
              } else {
                return (
                  <tr>
                    <TableCell>
                      <CaptureChancesBars
                        captureChances={condition.captureChances}
                      />
                    </TableCell>
                    <TableCellSuccessRate>{successRate}%</TableCellSuccessRate>
                    <TableCell>{condition.description}</TableCell>
                  </tr>
                );
              }
            })}
          </TableBody>
        ))}
      </AllBallsCaptureChancesTable>
    );
  }

  function calculateStatusConditionModifier() {
    if (statusCondition === 'asleep' || statusCondition === 'frozen') {
      return 2.5;
    } else if (
      statusCondition === 'poisoned' ||
      statusCondition === 'paralyzed' ||
      statusCondition === 'burned'
    ) {
      return 1.5;
    }
    return 1;
  }

  function calculateDifficultyModifier() {
    if (!storyCompleted) {
      return 410 / 4096;
    } else {
      return 1;
    }
  }

  function calculateCaptureChances(ballBonus: number) {
    const grassModifier = 1;
    const statusConditionModifier = calculateStatusConditionModifier();
    const lowLevelModifier = currentLevel < 20 ? (30 - currentLevel) / 10 : 1;
    const difficultyModifier = calculateDifficultyModifier();
    const isHeavyBall = [-20, 0, 20, 30].includes(ballBonus);

    const finalCaptureRate =
      (((3 * maximumHP - 2 * currentHP) *
        grassModifier *
        (isHeavyBall === true ? ballBonus + catchRate! : catchRate!) *
        (isHeavyBall === true ? 1 : ballBonus)) /
        (3 * maximumHP)) *
      lowLevelModifier *
      statusConditionModifier *
      difficultyModifier;

    const shakeHoldSuccessRate =
      Math.floor(65536 / Math.pow(255 / finalCaptureRate, 3 / 16)) / 65536;

    return [
      {
        chance: +((1 - shakeHoldSuccessRate) * 100).toPrecision(4),
      },
      {
        chance: +(
          (shakeHoldSuccessRate - Math.pow(shakeHoldSuccessRate, 2)) *
          100
        ).toPrecision(4),
      },
      {
        chance: +(
          (Math.pow(shakeHoldSuccessRate, 2) -
            Math.pow(shakeHoldSuccessRate, 3)) *
          100
        ).toPrecision(4),
      },
      {
        chance: +(
          (Math.pow(shakeHoldSuccessRate, 3) -
            Math.pow(shakeHoldSuccessRate, 4)) *
          100
        ).toPrecision(4),
      },
      {
        chance: +(Math.pow(shakeHoldSuccessRate, 4) * 100).toPrecision(4),
      },
    ];
  }

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
              wildPokemon.level! < 31 ? (41 - wildPokemon.level!) / 10 : 1
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
            description:
              'Capture chance scales with number of turns passed in battle. Caps at turn 11 (Current turn: ' +
              turn +
              ')',
            captureChances: calculateCaptureChances(1 + (turn * 1229) / 4096),
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

  return displayAllBallsSuccessRate();
}

export default AllBallsCaptureChances;

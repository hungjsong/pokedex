import EVSlider from './EVSlider';
import { useAppSelector } from '../../hooks';
import { TOTAL_EFFORT_VALUES } from '../../constants';

type EVSlidersProps = {
  teamSlotNumber: number;
};

function EVSliders(props: EVSlidersProps) {
  const team = useAppSelector((state) => state.teamBuilder.team);
  const { teamSlotNumber } = props;
  const {
    hp: hpEV,
    atk: atkEV,
    def: defEV,
    spAtk: spAtkEV,
    spDef: spDefEV,
    spd: spdEV,
  } = team[teamSlotNumber].ev!;
  const remainingEVs =
    TOTAL_EFFORT_VALUES - (hpEV + atkEV + defEV + spAtkEV + spDefEV + spdEV);

  return (
    <>
      <h4>Remaining EVs {remainingEVs}</h4>
      <h4>HP</h4>
      <EVSlider
        evStatValue={hpEV}
        evName={'hp'}
        teamSlotNumber={teamSlotNumber}
        remainingEVs={remainingEVs}
      />
      <h4>Attack</h4>
      <EVSlider
        evStatValue={atkEV}
        evName={'atk'}
        teamSlotNumber={teamSlotNumber}
        remainingEVs={remainingEVs}
      />
      <h4>Defence</h4>
      <EVSlider
        evStatValue={defEV}
        evName={'def'}
        teamSlotNumber={teamSlotNumber}
        remainingEVs={remainingEVs}
      />
      <h4>Special Attack</h4>
      <EVSlider
        evStatValue={spAtkEV}
        evName={'spAtk'}
        teamSlotNumber={teamSlotNumber}
        remainingEVs={remainingEVs}
      />
      <h4>Special Defence</h4>
      <EVSlider
        evStatValue={spDefEV}
        evName={'spDef'}
        teamSlotNumber={teamSlotNumber}
        remainingEVs={remainingEVs}
      />
      <h4>Speed</h4>
      <EVSlider
        evStatValue={spdEV}
        evName={'spd'}
        teamSlotNumber={teamSlotNumber}
        remainingEVs={remainingEVs}
      />
    </>
  );
}

export default EVSliders;

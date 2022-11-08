import EVSlider from './EVSlider';
import { useAppSelector } from '../../hooks';

type EVSlidersProps = {
  teamSlotNumber: number;
};

function EVSliders(props: EVSlidersProps) {
  const team = useAppSelector((state) => state.teamBuilder.team);
  const hpEV = team[props.teamSlotNumber].ev!.hp;
  const atkEV = team[props.teamSlotNumber].ev!.atk;
  const defEV = team[props.teamSlotNumber].ev!.def;
  const spAtkEV = team[props.teamSlotNumber].ev!.spAtk;
  const spDefEV = team[props.teamSlotNumber].ev!.spDef;
  const spdEV = team[props.teamSlotNumber].ev!.spd;
  const remainingEVs = 510 - (hpEV + atkEV + defEV + spAtkEV + spDefEV + spdEV);

  function displayEVSliders() {
    return (
      <>
        <h4>Remaining EVs {remainingEVs}</h4>
        <h4>HP</h4>
        <EVSlider
          evStatValue={hpEV}
          evName={'hp'}
          teamSlotNumber={props.teamSlotNumber}
          remainingEVs={remainingEVs}
        />
        <h4>Attack</h4>
        <EVSlider
          evStatValue={atkEV}
          evName={'atk'}
          teamSlotNumber={props.teamSlotNumber}
          remainingEVs={remainingEVs}
        />
        <h4>Defence</h4>
        <EVSlider
          evStatValue={defEV}
          evName={'def'}
          teamSlotNumber={props.teamSlotNumber}
          remainingEVs={remainingEVs}
        />
        <h4>Special Attack</h4>
        <EVSlider
          evStatValue={spAtkEV}
          evName={'spAtk'}
          teamSlotNumber={props.teamSlotNumber}
          remainingEVs={remainingEVs}
        />
        <h4>Special Defence</h4>
        <EVSlider
          evStatValue={spDefEV}
          evName={'spDef'}
          teamSlotNumber={props.teamSlotNumber}
          remainingEVs={remainingEVs}
        />
        <h4>Speed</h4>
        <EVSlider
          evStatValue={spdEV}
          evName={'spd'}
          teamSlotNumber={props.teamSlotNumber}
          remainingEVs={remainingEVs}
        />
      </>
    );
  }

  return displayEVSliders();
}

export default EVSliders;

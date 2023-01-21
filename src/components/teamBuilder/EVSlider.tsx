import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { MAXIMUM_EFFORT_VALUES, MINIMUM_EFFORT_VALUES } from '../../constants';
import { setEV } from '../../redux/teamBuilderSlice';

type EVSliderProps = {
  evName: string;
  evStatValue: number;
  teamSlotNumber: number;
  remainingEVs: number;
};

function EVSlider(props: EVSliderProps) {
  const dispatch = useDispatch();
  const { evName, evStatValue, teamSlotNumber, remainingEVs } = props;

  function changeEV(event: ChangeEvent<HTMLInputElement>) {
    const { max, min, value } = event.target;
    const inputEV = Number(value);
    const validEV =
      inputEV <= Number(max) &&
      inputEV >= Number(min) &&
      inputEV - evStatValue <= remainingEVs;
    if (validEV) {
      dispatch(
        setEV({
          evInputValue: Number(value),
          teamSlotNumber: teamSlotNumber,
          evName: evName,
        })
      );
    }
  }

  return (
    <div data-testid="evSlider">
      <input
        id={evName}
        type="number"
        min={MINIMUM_EFFORT_VALUES}
        max={MAXIMUM_EFFORT_VALUES}
        value={evStatValue}
        onChange={changeEV}
        data-testid="evSliderNumberValue"
      />
      <input
        id={evName}
        type="range"
        min={MINIMUM_EFFORT_VALUES}
        max={MAXIMUM_EFFORT_VALUES}
        value={evStatValue}
        step="1"
        onInput={changeEV}
        data-testid="evSliderStepValue"
      />
    </div>
  );
}

export default EVSlider;

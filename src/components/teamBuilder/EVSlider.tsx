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

  function changeEV(event: ChangeEvent<HTMLInputElement>) {
    const inputEV = Number(event.target.value);
    const validEV =
      inputEV <= Number(event.target.max) &&
      inputEV >= Number(event.target.min) &&
      inputEV - props.evStatValue <= props.remainingEVs;
    if (validEV) {
      dispatch(
        setEV({
          evInputValue: Number(event.target.value),
          teamSlotNumber: props.teamSlotNumber,
          evName: props.evName,
        })
      );
    }
  }

  return (
    <>
      <input
        id={props.evName}
        type="number"
        min={MINIMUM_EFFORT_VALUES}
        max={MAXIMUM_EFFORT_VALUES}
        value={props.evStatValue}
        onChange={changeEV}
      />
      <input
        id={props.evName}
        type="range"
        min={MINIMUM_EFFORT_VALUES}
        max={MAXIMUM_EFFORT_VALUES}
        value={props.evStatValue}
        step="1"
        onInput={changeEV}
      />
    </>
  );
}

export default EVSlider;

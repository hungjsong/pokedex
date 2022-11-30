import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setPreviouslyCaught } from '../../../../redux/catchingSimulatorSlice';

function PreviouslyCaughtCheckbox() {
  const previouslyCaught = useAppSelector(
    (state) => state.catchingSimulator.previouslyCaught
  );
  const dispatch = useAppDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setPreviouslyCaught({ previouslyCaught: event.target.checked }));
  }

  return (
    <label>
      Previously Caught:
      <input
        type="checkbox"
        checked={previouslyCaught}
        onChange={handleChange}
      />
    </label>
  );
}
export default PreviouslyCaughtCheckbox;

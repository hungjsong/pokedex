import { ChangeEvent } from 'react';
import { setTimeOfDay } from '../../../../redux/catchingSimulatorSlice';
import { useAppDispatch } from '../../../../hooks';

function TimesOfDayList() {
  const timesOfDay = ['Day', 'Night'];
  const dispatch = useAppDispatch();

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    dispatch(
      setTimeOfDay({
        time: event.target.value,
      })
    );
  }

  function displayTimesOfDay() {
    return (
      <select onChange={handleChange}>
        {timesOfDay.map((timeOfDay) => (
          <option key={timeOfDay}>{timeOfDay}</option>
        ))}
      </select>
    );
  }

  return (
    <label>
      Time of Day:
      {displayTimesOfDay()}
    </label>
  );
}

export default TimesOfDayList;

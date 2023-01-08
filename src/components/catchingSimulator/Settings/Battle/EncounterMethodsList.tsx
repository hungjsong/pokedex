import { ChangeEvent } from 'react';
import { setEncounterMethod } from '../../../../redux/catchingSimulatorSlice';
import { useAppDispatch } from '../../../../hooks';

function EncounterMethodsList() {
  const encounterMethods = ['Grass', 'Surfing/Diving', 'Cave', 'Fishing'];
  const dispatch = useAppDispatch();

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    dispatch(
      setEncounterMethod({
        encounterMethod: event.target.value,
      })
    );
  }

  return (
    <label>
      Encounter Method:
      <select onChange={handleChange}>
        {encounterMethods.map((methodName) => (
          <option key={methodName}>{methodName}</option>
        ))}
      </select>
    </label>
  );
}

export default EncounterMethodsList;

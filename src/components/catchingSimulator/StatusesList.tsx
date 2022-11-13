import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { setStatus } from '../../redux/catchingSimulatorSlice';

type StatusesListProps = {};

function StatusesList(props: StatusesListProps) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [displayList, setDisplayList] = useState(false);
  const dispatch = useAppDispatch();
  const statuses = [
    { name: 'None' },
    { name: 'Asleep' },
    { name: 'Burned' },
    { name: 'Frozen' },
    { name: 'Paralyzed' },
    { name: 'Poisoned' },
  ];

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedStatus(event.target.value);
  }

  function displayListOfStatuses() {
    return (
      <ul>
        {statuses
          .filter((status) =>
            status.name.toLowerCase().includes(selectedStatus.toLowerCase())
          )
          .map((status) => (
            <>
              <li
                key={status.name}
                onMouseDown={() => {
                  setSelectedStatus(status.name);
                  dispatch(setStatus({ status: status.name }));
                }}
              >
                {status.name}
              </li>
            </>
          ))}
      </ul>
    );
  }

  return (
    <label>
      Status:
      <input
        type="search"
        autoComplete="off"
        placeholder="Status"
        value={selectedStatus}
        onFocus={() => {
          setDisplayList(true);
        }}
        onBlur={() => {
          setDisplayList(false);
        }}
        onChange={handleChange}
        onKeyUp={(event) => {
          setSelectedStatus(
            (event.target as HTMLInputElement).value.toLowerCase()
          );
        }}
      />
      {displayList && displayListOfStatuses()}
    </label>
  );
}

export default StatusesList;
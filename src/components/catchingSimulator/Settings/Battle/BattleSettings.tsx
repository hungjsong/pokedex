import EncounterMethodsList from './EncounterMethodsList';
import TimesOfDayList from './TimesOfDayList';

function BattleSettings() {
  return (
    <div>
      <h3>Battle Settings</h3>
      <EncounterMethodsList />
      <br />
      <TimesOfDayList />
    </div>
  );
}

export default BattleSettings;

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PokeBallsList from './PokeBallsList';
import AllBallsCaptureChances from './AllBallsCaptureChances';
import SelectedBallCaptureChance from './SelectedBallCaptureChance';
import WildPokemonSettings from './Settings/WildPokemon/WildPokemonSettings';
import UserPokemonSettings from './Settings/UserPokemon/UserPokemonSettings';
import BattleSettings from './Settings/Battle/BattleSettings';
import PokemonEncounter from './PokemonEncounter';
import { useState } from 'react';
import OtherSettings from './Settings/Other/OtherSettings';

function CatchingSimulator() {
  const [encounterInProgress, setEncounterInProgress] = useState(false);
  const { t } = useTranslation();

  function startEncounter() {
    setEncounterInProgress(true);
  }

  return (
    <>
      <h1>Catching Simulator</h1>
      {!encounterInProgress && (
        <>
          <button onClick={startEncounter}>Start Encounter</button>
          <BattleSettings />
          <WildPokemonSettings />
          <UserPokemonSettings />
          <OtherSettings />
        </>
      )}
      {encounterInProgress && (
        <>
          <PokemonEncounter endEncounter={setEncounterInProgress} />
          <PokeBallsList />
          <br />
          <SelectedBallCaptureChance />
        </>
      )}
      <AllBallsCaptureChances />
      <nav>
        <Link to="/">{t('home')}</Link>
      </nav>
    </>
  );
}

export default CatchingSimulator;

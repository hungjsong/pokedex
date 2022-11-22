import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PokeBallsList from './PokeBallsList';
import AllBallsCaptureChances from './AllBallsCaptureChances';
import SelectedBallCaptureChance from './SelectedBallCaptureChance';
import WildPokemonSettings from './Settings/WildPokemon/WildPokemonSettings';
import UserPokemonSettings from './Settings/UserPokemon/UserPokemonSettings';
import BattleSettings from './Settings/Battle/BattleSettings';

function CatchingSimulator() {
  const { t } = useTranslation();

  return (
    <>
      <h1>Catching Simulator</h1>
      <PokeBallsList />
      <BattleSettings />
      <WildPokemonSettings />
      <UserPokemonSettings />
      <br />
      <SelectedBallCaptureChance />
      <AllBallsCaptureChances />
      <nav>
        <Link to="/">{t('home')}</Link>
      </nav>
    </>
  );
}

export default CatchingSimulator;

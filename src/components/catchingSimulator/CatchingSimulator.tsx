import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CaptureChance from './CaptureChance';
import PokeBallsList from './PokeBallsList';
import StatusesList from './StatusesList';
import WildPokemonLevel from './WildPokemonLevel';

function CatchingSimulator() {
  const { t } = useTranslation();

  return (
    <>
      <h1>Catching Simulator</h1>
      <CaptureChance />
      <StatusesList />
      <PokeBallsList />
      <WildPokemonLevel />
      <nav>
        <Link to="/">{t('home')}</Link>
      </nav>
    </>
  );
}

export default CatchingSimulator;

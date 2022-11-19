import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PokeBallsList from './PokeBallsList';
import StatusesList from './StatusesList';
import WildPokemonLevel from './WildPokemonLevel';
import SelectedBallCaptureChance from './SelectedBallCaptureChance';

function CatchingSimulator() {
  const { t } = useTranslation();

  return (
    <>
      <h1>Catching Simulator</h1>
      <StatusesList />
      <PokeBallsList />
      <WildPokemonLevel />
      <br />
      <SelectedBallCaptureChance />
      <nav>
        <Link to="/">{t('home')}</Link>
      </nav>
    </>
  );
}

export default CatchingSimulator;

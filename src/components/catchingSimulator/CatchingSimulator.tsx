import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CaptureChance from './CaptureChance';
import PokeBallsList from './PokeBallsList';
import StatusesList from './StatusesList';

function CatchingSimulator() {
  const { t } = useTranslation();

  return (
    <>
      <CaptureChance />
      <StatusesList />
      <PokeBallsList />
      <nav>
        <Link to="/">{t('home')}</Link>
      </nav>
    </>
  );
}

export default CatchingSimulator;

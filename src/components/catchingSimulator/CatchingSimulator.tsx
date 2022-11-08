import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function CatchingSimulator() {
  const { t } = useTranslation();

  return (
    <nav>
      <Link to="/">{t('home')}</Link>
    </nav>
  );
}

export default CatchingSimulator;

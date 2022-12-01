import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('pokedex')}</h1>
      <nav>
        <Link to="/PokedexEntry">{t('viewPokedex')}</Link>
        <Link to="/TeamBuilder">{t('teamBuilder')}</Link>
        <Link to="/CatchingSimulator">{t('catchingSimulator')}</Link>
      </nav>
    </div>
  );
}

export default Home;

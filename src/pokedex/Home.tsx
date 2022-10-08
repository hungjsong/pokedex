import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import React from 'react';

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('pokedex')}</h1>
      <nav>
        <Link to="/PokedexEntry">{t('viewPokedex')}</Link>
      </nav>
    </div>
  );
}

export default Home;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PokemonList from './PokemonList';

function TeamBuilder() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('teamBuilder')}</h1>
      <PokemonList />
      <nav>
        <Link to="/">{t('home')}</Link>
      </nav>
    </div>
  );
}

export default TeamBuilder;

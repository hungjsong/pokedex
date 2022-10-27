import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PokemonSlot from './PokemonSlot';

function TeamBuilder() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('teamBuilder')}</h1>
      <PokemonSlot position={0} />
      <PokemonSlot position={1} />
      <PokemonSlot position={2} />
      <PokemonSlot position={3} />
      <PokemonSlot position={4} />
      <PokemonSlot position={5} />
      <nav>
        <Link to="/">{t('home')}</Link>
      </nav>
    </div>
  );
}

export default TeamBuilder;

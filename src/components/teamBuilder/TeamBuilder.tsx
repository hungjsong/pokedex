import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PokemonSlot from './PokemonSlot';

function TeamBuilder() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('teamBuilder')}</h1>
      <PokemonSlot slotNumber={0} />
      <PokemonSlot slotNumber={1} />
      <PokemonSlot slotNumber={2} />
      <PokemonSlot slotNumber={3} />
      <PokemonSlot slotNumber={4} />
      <PokemonSlot slotNumber={5} />
      <nav>
        <Link to="/">{t('home')}</Link>
      </nav>
    </div>
  );
}

export default TeamBuilder;

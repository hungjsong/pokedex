import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PokemonSlot from './PokemonSlot';

function TeamBuilder() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('teamBuilder')}</h1>
      <PokemonSlot teamSlotNumber={0} />
      <PokemonSlot teamSlotNumber={1} />
      <PokemonSlot teamSlotNumber={2} />
      <PokemonSlot teamSlotNumber={3} />
      <PokemonSlot teamSlotNumber={4} />
      <PokemonSlot teamSlotNumber={5} />
      <nav>
        <Link to="/">{t('home')}</Link>
      </nav>
    </div>
  );
}

export default TeamBuilder;

import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonItems } from '../../API/pokemon';
import { Item } from '../../types/pokemonTypes';
import Loader from '../common/Loader';
import { setItem } from '../../redux/teamBuilderSlice';

type ItemListProps = {
  teamSlotNumber: number;
};

function ItemList(props: ItemListProps) {
  const [displayList, setDisplayList] = useState(false);
  const [itemID, setItemID] = useState('');
  const [pokemonItems, setPokemonItems] = useState<Item[]>([]);
  const dispatch = useDispatch();
  const { teamSlotNumber } = props;

  useEffect(() => {
    getPokemonItems().then((allItems) => setPokemonItems(allItems.payload));
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setItemID(event.target.value);
  }

  function displayListOfItems(slotNumber: number) {
    if (pokemonItems === null) {
      return <Loader />;
    }

    return (
      <ul>
        {pokemonItems
          .filter((item) =>
            item.name.toLowerCase().includes(itemID.toLowerCase())
          )
          .map(({ name }) => {
            return (
              <li
                key={name}
                onMouseDown={() => {
                  dispatch(setItem({ item: name, teamSlotNumber: slotNumber }));
                  setItemID(name);
                }}
              >
                <img
                  src={
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/' +
                    name.toLowerCase().split(' ').join('-') +
                    '.png'
                  }
                ></img>
                {name}
              </li>
            );
          })}
      </ul>
    );
  }

  return (
    <div>
      <h3>Item</h3>
      <input
        type="search"
        autoComplete="off"
        placeholder="Search Item"
        value={itemID}
        onFocus={() => {
          setDisplayList(true);
        }}
        onBlur={() => {
          setDisplayList(false);
        }}
        onChange={handleChange}
        onKeyUp={(event) => {
          setItemID((event.target as HTMLInputElement).value.toLowerCase());
        }}
      />
      {displayList && displayListOfItems(teamSlotNumber)}
    </div>
  );
}

export default ItemList;

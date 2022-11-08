import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonItems } from '../../API/pokemon';
import { Item } from '../../types/pokemonTypes';
import Loader from '../common/Loader';
import { setItem } from '../../redux/teamBuilderSlice';

type ItemListProps = {
  slotNumber: number;
};

function ItemList(props: ItemListProps) {
  const [displayList, setDisplayList] = useState(false);
  const [itemID, setItemID] = useState('');
  const [pokemonItems, setPokemonItems] = useState<Item[]>([]);
  const dispatch = useDispatch();

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
          .map((item) => (
            <li
              key={item.name}
              onMouseDown={() => {
                dispatch(
                  setItem({ item: item.name, teamSlotNumber: slotNumber })
                );
                setItemID(item.name);
              }}
            >
              <img
                src={
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/' +
                  item.name.toLowerCase().split(' ').join('-') +
                  '.png'
                }
              ></img>
              {item.name}
            </li>
          ))}
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
      {displayList && displayListOfItems(props.slotNumber)}
    </div>
  );
}

export default ItemList;

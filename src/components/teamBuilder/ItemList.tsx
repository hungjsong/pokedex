import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Item } from '../../types/pokemonTypes';
import Loader from '../common/Loader';
import { setItem } from '../../redux/teamBuilderSlice';
import { getAllHoldableItems } from '../../API/teamBuilder';
import { useAppSelector } from '../../hooks';

type ItemListProps = {
  teamSlotNumber: number;
};

function ItemList(props: ItemListProps) {
  const [displayList, setDisplayList] = useState(false);
  const [itemID, setItemID] = useState('');
  const [pokemonItems, setPokemonItems] = useState<Item[]>([]);
  const dispatch = useDispatch();
  const { teamSlotNumber } = props;
  const { item } = useAppSelector(
    (state) => state.teamBuilder.team[teamSlotNumber]
  );

  useEffect(() => {
    getAllHoldableItems().then((allItems) => setPokemonItems(allItems.data));
    setItemID(item?.name ?? '');
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
          .map(({ id, name, description, spriteURL }) => {
            return (
              <li
                key={name}
                onMouseDown={() => {
                  dispatch(
                    setItem({
                      id: id,
                      item: name,
                      description: description,
                      spriteURL: spriteURL,
                      teamSlotNumber: slotNumber,
                    })
                  );
                  setItemID(name);
                }}
              >
                <img src={spriteURL}></img>
                {name}
                <br />
                {description}
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

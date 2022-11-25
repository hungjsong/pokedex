import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';

function DialogBox() {
  const message = useAppSelector(
    (state) => state.catchingSimulator.dialogBoxMessage
  );
  const [dialogMessage, setDialogMessage] = useState(message);

  useEffect(() => {
    displayDialogBox();
  }, [message]);

  function displayDialogBox() {
    let currentCharacter = 0;
    let newDialog = '';
    const dialogCharacters = message.split('');

    const dialogInterval = setInterval(function () {
      if (currentCharacter < dialogCharacters.length) {
        newDialog = newDialog + dialogCharacters[currentCharacter++];
        setDialogMessage(newDialog);
      } else {
        clearInterval(dialogInterval);
      }
    }, 30);
  }

  return <h4>{dialogMessage}</h4>;
}

export default DialogBox;

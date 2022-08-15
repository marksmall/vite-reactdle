import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const WORD_LENGTH = 5;

export const useGuess = (): [
  string,
  Dispatch<SetStateAction<string>>,
  (letter: string) => void,
] => {
  const [guess, setGuess] = useState<string>('');

  const addGuessLetter = (letter: string) =>
    setGuess(currentGuess => {
      const newGuess =
        letter.length === 1 && currentGuess.length !== WORD_LENGTH
          ? currentGuess + letter
          : currentGuess;

      switch (letter) {
        case 'Backspace':
          return newGuess.slice(0, -1);
        case 'Enter':
          if (newGuess.length === WORD_LENGTH) {
            return '';
          }
      }

      if (newGuess.length === WORD_LENGTH) {
        return newGuess;
      }

      return newGuess;
    });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => addGuessLetter(event.key);

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return [guess, setGuess, addGuessLetter];
};

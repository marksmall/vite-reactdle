import React, { FC } from 'react';
import { LetterState } from '~/utils/utils';

const LETTERS_LENGTH = 5;

const CHARACTER_STATE_STYLES = {
  [LetterState.Miss]: 'border-gray-500 bg-gray-500',
  [LetterState.Present]: 'border-yellow-500 bg-yellow-500',
  [LetterState.Match]: 'border-green-500 bg-green-500',
};

interface CharacterBoxProps {
  value?: string;
  state?: LetterState;
}

const CharacterBox: FC<CharacterBoxProps> = ({ value, state }) => {
  const stateStyles =
    state == null
      ? 'border-gray-500 text-black'
      : `${CHARACTER_STATE_STYLES[state]} text-white`;

  return (
    <span
      className={`border-2 p-2 uppercase text-center font-extrabold text-4xl before:inline-block before:content-['_'] ${stateStyles}`}
    >
      {value}
    </span>
  );
};

interface WordRowProps {
  word: string;
  result?: LetterState[];
  className?: string;
}

export const WordRow: FC<WordRowProps> = ({
  word = '',
  result = [],
  className = '',
}) => {
  const lettersRemaining = LETTERS_LENGTH - word.length;
  const letters = word.split('').concat(Array(lettersRemaining).fill(''));

  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {letters.map((char, index) => (
        <CharacterBox
          key={`${char}-${index}`}
          value={char}
          state={result[index]}
        />
      ))}
    </div>
  );
};

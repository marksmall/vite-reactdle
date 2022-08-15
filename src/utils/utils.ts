import wordbank from '~/data/wordbank.json';

export const randomWord = (): string =>
  wordbank[Math.floor(Math.random() * wordbank.length)];

export enum LetterState {
  Miss,
  Present,
  Match,
}

export const computeGuess = (guess: string, answer: string): LetterState[] => {
  const result: LetterState[] = [];

  // Bomb out early if legth of guess doesn't match the answer length.
  if (guess.length !== answer.length) {
    return result;
  }

  const guesses = guess.split('');
  const answers = answer.split('');

  const answerLetterCount: Record<string, number> = {};

  guesses.forEach((letter, index) => {
    const currentAnswerLetter = answers[index];

    answerLetterCount[currentAnswerLetter] = answerLetterCount[
      currentAnswerLetter
    ]
      ? answerLetterCount[currentAnswerLetter] + 1
      : 1;

    if (currentAnswerLetter === letter) {
      result.push(LetterState.Match);
    } else if (answers.includes(letter)) {
      result.push(LetterState.Present);
    } else {
      result.push(LetterState.Miss);
    }
  });

  result.forEach((res: LetterState, resultIndex: number) => {
    if (res !== LetterState.Present) {
      return;
    }

    const guessLetter = guesses[resultIndex];

    answers.forEach((currentAnswerLetter: string, answersIndex: number) => {
      if (currentAnswerLetter !== guessLetter) {
        return;
      }

      if (result[answersIndex] === LetterState.Match) {
        result[resultIndex] = LetterState.Miss;
      }

      if (answerLetterCount[guessLetter] <= 0) {
        result[resultIndex] = LetterState.Miss;
      }
    });

    answerLetterCount[guessLetter]--;
  });

  return result;
};

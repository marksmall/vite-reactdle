import { computeGuess, LetterState, randomWord } from './utils';

describe('Word Utils', () => {
  describe('Random Word Generator', () => {
    it('should pick a random word', () => {
      expect(randomWord()).toBeTruthy();
      expect(randomWord().length).toEqual(5);
    });
  });

  describe('Compute Guess', () => {
    it('should return an empty array when given an incomplete guess', () => {
      expect(computeGuess('bar', 'boost')).toEqual([]);
    });

    it('should verify all words Match', () => {
      expect(computeGuess('boost', 'boost')).toEqual([
        LetterState.Match,
        LetterState.Match,
        LetterState.Match,
        LetterState.Match,
        LetterState.Match,
      ]);
    });

    it('should verify all letters present', () => {
      expect(computeGuess('tbsoo', 'boost')).toEqual([
        LetterState.Present,
        LetterState.Present,
        LetterState.Present,
        LetterState.Present,
        LetterState.Present,
      ]);
    });

    it('should verify all letters miss', () => {
      expect(computeGuess('charm', 'boost')).toEqual([
        LetterState.Miss,
        LetterState.Miss,
        LetterState.Miss,
        LetterState.Miss,
        LetterState.Miss,
      ]);
    });

    it('should verify first letter matches, next 2 miss and last 2 are present', () => {
      expect(computeGuess('barto', 'boost')).toEqual([
        LetterState.Match,
        LetterState.Miss,
        LetterState.Miss,
        LetterState.Present,
        LetterState.Present,
      ]);
    });

    it('should verify when 2 letters are present but answer only has one of them', () => {
      expect(computeGuess('barbo', 'boost')).toEqual([
        LetterState.Match,
        LetterState.Miss,
        LetterState.Miss,
        LetterState.Miss,
        LetterState.Present,
      ]);
    });
  });
});

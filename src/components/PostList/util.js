export const TIME_ASC = 'time-asc';
export const TIME_DESC = 'time-desc';
export const SCORE_ASC = 'score-asc';
export const SCORE_DESC = 'score-desc';

export const sortHelper = (val1, val2, asc) => {
  if (val1 === val2) return 0;
  if (asc) {
    return val1 > val2 ? 1 : -1;
  }
  return val1 < val2 ? 1 : -1;
};

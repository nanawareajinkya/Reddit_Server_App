import { getCategories } from "../utils/apiHelper";

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export function fetchCategories() {
  return dispatch => {
    return getCategories().then(categories => dispatch({
      type: FETCH_CATEGORIES,
      payload: categories,
    }));
  };
}

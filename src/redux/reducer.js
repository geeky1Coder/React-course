import { COMMENTS } from "../Shared/comments.js";
import { PROMOTIONS } from "../Shared/promotions.js";
import { LEADERS } from "../Shared/leaders.js";
import { DISHES } from "../Shared/dishes";

export const initialState = {
  dishes: DISHES,
  comments: COMMENTS,
  promotions: PROMOTIONS,
  leaders: LEADERS,
};

export const Reducer = (state = initialState, action) => {
  return state;
};

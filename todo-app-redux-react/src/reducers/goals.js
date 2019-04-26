import {
  ADD_GOAL,
  REMOVE_GOAL
} from '../actions/goals';
import { RECEIVE_DATA } from '../actions/shared';

/**
 *  goals reducer as a pure function
 *  Get state and action and returns new state
 *  @param { state } - Current state
 *  @param { action } - Action object
 *  @returns { state } - Returns a new state
*/
export default function goals (state = [], action) {
  switch (action.type) {
    case ADD_GOAL :
      return state.concat([action.goal]);
    case  REMOVE_GOAL :
      return state.filter( (goal) => goal.id !== action.id );
    case RECEIVE_DATA :
      return action.goals;
    default:
      return state;
  }
}
import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO
} from '../actions/todos';
import { RECEIVE_DATA } from '../actions/shared';

/**
 *  todos reducer as a pure function
 *  Get state and action and returns new state
 *  @param { state } - Current state
 *  @param { action } - Action object
 *  @returns { state } - Returns a new state
*/
export default function todos (state = [], action) {
  switch (action.type) {
    case ADD_TODO :
      return state.concat([action.todo]);
    case REMOVE_TODO :
      return state.filter( (todo) => todo.id !== action.id );
    case TOGGLE_TODO :
      return state.map( (todo) => todo.id !== action.id ? todo : 
        Object.assign({}, todo, { complete: !todo.complete }));
    case RECEIVE_DATA :
      return action.todos;
    default :
      return state;
  }
}
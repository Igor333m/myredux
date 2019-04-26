import API from 'goals-todos-api';

export const TOGGLE_TODO = 'TOGGLE_TODO';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

// Action creator functions

function addTodo (todo) {
  return {
    type: ADD_TODO,
    todo
  }
}

function removeTodo (id) {
  return {
    type: REMOVE_TODO,
    id
  }
}
function toggleTodo (id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

/**
 *  handleDeleteTodo action creator with data fetching logic
 *  Use REDUX-THUNK middleware as a wrapper for the store’s dispatch() method;
 *   rather than returning action objects, we can use thunk action creators
 *   to dispatch functions (or even or Promises).
 *  Instead of waiting for confirmation from the server,
 *  just instantly remove the todo, if errors add the goal back in.
 *  Technique called optimistic updates
 *
 *  @param { todo } - Todo
 *  @returns { object or function } - Return action object or function
*/
export function handleDeleteTodo (todo) {
  return (dispatch) => {
    dispatch(removeTodo(todo.id));

    return API.deleteTodo(todo.id)
      .catch(() => {
        dispatch(addTodo(todo));
        alert('Something went wrong. Try again');
      });
  }
}

export function handleAddTodo (name, callback) {
  return (dispatch) => {
    return API.saveTodo(name)
      .then((todo) => {
        dispatch(addTodo(todo));
        callback();
      })
      .catch(() => {
        alert('Something went wrong. Try again');
      });
  }
}

export function handleToggle (id) {
  return (dispatch) => {
    dispatch(toggleTodo(id));

    return API.saveTodoToggle(id)
      .catch(() => {
        dispatch(toggleTodo(id));
        alert('Something went wrong. Try again');
      });
  }
}
import API from 'goals-todos-api';

export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

// Action creator functions

function addGoal (goal) {
  return {
    type: ADD_GOAL,
    goal
  }
}

function removeGoal (id) {
  return {
    type: REMOVE_GOAL,
    id
  }
}

/**
 *  handleAddGoal action creator with data fetching logic
 *  Use REDUX-THUNK middleware as a wrapper for the store’s dispatch() method;
 *   rather than returning action objects, we can use thunk action creators
 *   to dispatch functions (or even or Promises).
 *  @param { name } - Add goal string
 *  @param { callback } - Call callback to reset the input value
 *  @returns { object or function } - Return action object or function
*/
export function handleAddGoal(name, callback) {
  return (dispatch) => {
    return API.saveGoal(name)
      .then((goal) => {
        dispatch(addGoal(goal));
        callback();
      })
      .catch(() => {
        alert('Something went wrong. Try again');
      });
  }
}



/**
 *  handleDeleteGoal action creator with data fetching logic
 *  Use REDUX-THUNK middleware as a wrapper for the store’s dispatch() method;
 *   rather than returning action objects, we can use thunk action creators
 *   to dispatch functions (or even or Promises).
 *  Instead of waiting for confirmation from the server,
 *  just instantly remove the goal, if errors add the goal back in.
 *  Technique called optimistic updates
 *  @param { goal } - Goal
 *  @returns { object or function } - Return action object or function
*/
export function handleDeleteGoal(goal) {
  return (dispatch) => {
    dispatch(removeGoal(goal.id));

    return API.deleteGoal(goal.id)
      .catch(() => {
        dispatch(addGoal(goal));
        alert('Something went wrong. Try again');
      })
  }
}
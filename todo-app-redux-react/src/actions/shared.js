import API from 'goals-todos-api';

export const RECEIVE_DATA = 'RECEIVE_DATA';

// Action creator functions

function receiveData (todos, goals) {
  return {
    type: RECEIVE_DATA,
    todos,
    goals
  }
}

export function handleInitialData () {
  return (dispatch) => {
    /**
     *  Get asynchronous data from https://tylermcginnis.com/goals-todos-api/index.js
    */ 
    return Promise.all([
      API.fetchGoals(),
      API.fetchTodos()
    ]).then(([todos, goals]) => {
      dispatch(receiveData(todos, goals));
    });
  }
}
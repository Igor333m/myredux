function generateId () {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

// ________________Library code changed with Redux_________________________

// function createStore (reducer) {
//   // 1. The state
//   // 2. Get the state
//   // 3. Listen to changes on the state
//   // 4. Update the state

//   let state;
//   let listeners = [];

//   const getState = () => state;

//   const subscribe = (listener) => {
//     listeners.push(listener);
//     return () => {
//       listeners = listeners.filter((l) => l !== listener);
//     };
//   }

//   /**
//    *   Responsible for updating the state inside store
//    *   @param {object} action - Action object
//   */
//   const dispatch = (action) => {
//     state = reducer(state, action);
//     listeners.forEach( (listener) => listener() );
//   }

//   return {
//     getState,
//     subscribe,
//     dispatch
//   }
// }


// __________App code___________

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
const RECEIVE_DATA = 'RECEIVE_DATA';

// Action creator functions

function receiveDataAction (todos, goals) {
  return {
    type: RECEIVE_DATA,
    todos,
    goals
  }
}

function addTodoAction (todo) {
  return {
    type: ADD_TODO,
    todo
  }
}

function removeTodoAction (id) {
  return {
    type: REMOVE_TODO,
    id
  }
}
function toggleTodoAction (id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

function addGoalAction (goal) {
  return {
    type: ADD_GOAL,
    goal
  }
}

function removeGoalAction (id) {
  return {
    type: REMOVE_GOAL,
    id
  }
}

/**
 *  todos reducer as a pure function
 *  Get state and action and returns new state
 *  @param { state } - Current state
 *  @param { action } - Action creator function
 *  @returns { state } - Returns a new state
*/
function todos (state = [], action) {
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

/**
 *  goals reducer as a pure function
 *  Get state and action and returns new state
 *  @param { state } - Current state
 *  @param { action } - Action creator function
 *  @returns { state } - Returns a new state
*/
function goals (state = [], action) {
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

/**
 *  loading reducer as a pure function
 *  Set loading while data is fetching form server
 *  @param { state } - Default state set loading to true
 *  @param { action } - Action creator function
 *  @returns { boolean } - Return boolean
*/
function loading (state = true, action) {
  switch (action.type) {
    case RECEIVE_DATA :
      return false;
    default :
      return state;
  }
}

/**
 *   Custom middleware, hooked after action is dispatched but before
 *   it hits the reduser and modified the state
 *   Check if the new item contains the word 'bitcoin'
*/
// function checkAndDispatch (store, action) {
//   if (
//     action.type === ADD_TODO && 
//     action.todo.name.toLowerCase().includes('bitcoin')
//   ) {
//     return alert("Nope. That's a bad idea.");
//   }

//   if (
//     action.type === ADD_GOAL && 
//     action.goal.name.toLowerCase().includes('bitcoin')
//   ) {
//     return alert("Nope. That's a bad idea.");
//   }

//   return store.dispatch(action);
// }


/**
 *  Real Redux middleware
 */
const checker = (store) => (next) => (action) => {
  if (
    action.type === ADD_TODO && 
    action.todo.name.toLowerCase().includes('bitcoin')
  ) {
    return alert("Nope. That's a bad idea.");
  }

  if (
    action.type === ADD_GOAL && 
    action.goal.name.toLowerCase().includes('bitcoin')
  ) {
    return alert("Nope. That's a bad idea.");
  }

  return next(action);
}

/**
 *  logger middleware intercept all dispatch calls and
 *  log out what the action is that's being dispatched and
 *  what the state changes to after the reducer has run.
 */
const logger = (store) => (next) => (action) => {
  console.group(action.type);
    console.log('The action: ', action);
    const result = next(action);
    console.log('The new state: ', store.getState());
  console.groupEnd();
  return result;
}


/**
 *   Root reducer changed with Redux.combineReducers
*/
// function app (state = {}, action) {
//   return {
//     todos: todos(state.todos, action),
//     goals: goals(state.goals, action)
//   };
// }

/**
 *  createStore can take only one reducer function as an argument
 *  change custom store with Redux store
 *  const store = createStore(app);
 *  @param { Redux.combineReducers } - Pass all reducers as arguments
 *  @param { Redux.applyMiddleware } - Pass middlewares as arguments
*/
const store = Redux.createStore(Redux.combineReducers({
  todos,
  goals,
  loading
}), Redux.applyMiddleware(checker, logger));

store.subscribe(() => {
  console.log(store.getState());
  const { goals, todos } = store.getState();

  // document.getElementById('goals').innerHTML = '';
  // document.getElementById('todos').innerHTML = '';

  // goals.forEach(addGoalToDOM);
  // todos.forEach(addTodoToDOM);
});

// DOM code for vanilla js

// function addTodo () {
//   const input = document.getElementById('todo');
//   const name = input.value;
//   input.value = '';

//   store.dispatch (addTodoAction({
//     name,
//     complete: false,
//     id: generateId()
//   }));
// }

// function addGoal () {
//   const input = document.getElementById('goal');
//   const name = input.value;
//   input.value = '';

//   store.dispatch(addGoalAction({
//     name,
//     id: generateId()
//   }));
// }

// document.getElementById('todoBtn')
//   .addEventListener('click', addTodo);

// document.getElementById('goalBtn')
//   .addEventListener('click', addGoal);

// function createRemoveButton (onClick) {
//   const removeBtn = document.createElement('button');
//   removeBtn.innerHTML = 'X';
//   removeBtn.addEventListener('click', onClick);
//   return removeBtn;
// }

// function addTodoToDOM (todo) {
//   const node = document.createElement('li');
//   const text = document.createTextNode(todo.name);

//   const removeBtn = createRemoveButton( () => {
//     store.dispatch(removeTodoAction(todo.id));
//   });

//   node.appendChild(text);
//   node.appendChild(removeBtn);
//   node.style.textDecoration = todo.complete ? 'line-through' : 'none';
//   node.addEventListener('click', () => {
//     store.dispatch(toggleTodoAction(todo.id));
//   });

//   document.getElementById('todos').appendChild(node);
// }

// function addGoalToDOM (goal) {
//   const node = document.createElement('li');
//   const text = document.createTextNode(goal.name);

//   const removeBtn = createRemoveButton( () => {
//     store.dispatch(removeGoalAction(goal.id));
//   });

//   node.appendChild(text);
//   node.appendChild(removeBtn);
//   node.style.textDecoration = todo.complete ? 'line-through' : 'none';
  
//   document.getElementById('goals').appendChild(node);
// }
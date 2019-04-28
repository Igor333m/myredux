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

export default logger;
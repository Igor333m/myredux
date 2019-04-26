import { RECEIVE_DATA } from '../actions/shared';

/**
 *  loading reducer as a pure function
 *  Set loading while data is fetching form server
 *  @param { state } - Default state set loading to true
 *  @param { action } - Action creator function
 *  @returns { boolean } - Return boolean
*/
export default function loading (state = true, action) {
  switch (action.type) {
    case RECEIVE_DATA :
      return false;
    default :
      return state;
  }
}
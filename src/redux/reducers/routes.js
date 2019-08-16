import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import createHistory from "history/createBrowserHistory";
export const history = createHistory();


export default (history) => combineReducers({
    router: connectRouter(history)
  });
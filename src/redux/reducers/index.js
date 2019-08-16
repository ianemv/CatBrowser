import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'


const initialState = {
    cats:[],
    currentPage:1,
    currentBreed:''
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREASE_PAGE':
        //return state.currentPage = state.currentPage + 1
        return {...state,currentPage:state.currentPage + 1}
      case 'RESET_PAGE':
        //return state.currentPage = 1
        return {...state,currentPage:1}
      case 'SET_CURRENT_BREED':
        //return state.currentPage = 1
        return {...state,currentBreed:action.payload}
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }

const rootReducer = (history) => combineReducers({
  appState: appReducer,
  router: connectRouter(history)
})

export default rootReducer
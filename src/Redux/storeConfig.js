import { applyMiddleware, combineReducers, createStore } from "redux";
import projectReducer from "./reducers/projectReducer"
import reduxThunk from "redux-thunk"
const rootReducer = combineReducers({
    projectReducer: projectReducer
})
const store = createStore(rootReducer, applyMiddleware(reduxThunk));
export default store
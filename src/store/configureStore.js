import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import reduxThunk from "redux-thunk";
// import logger from "redux-logger";
import rootReducer from "../reducers";

const enhancer = compose(applyMiddleware(reduxThunk));
const configureStore = createStore(rootReducer, {}, enhancer)
export default configureStore;
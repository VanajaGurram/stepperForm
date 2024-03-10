import { combineReducers, createStore } from "redux";
import { dataReducer, postReducer, stepReducer, tableReducer, userReducer } from "./reducer";


export const rootReducer=combineReducers({
    user:userReducer,
    tableReducer:tableReducer,
    postReducer:postReducer,
    data:dataReducer,
    stepper:stepReducer
})
export const store= createStore(rootReducer)
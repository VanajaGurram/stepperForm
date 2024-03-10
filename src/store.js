import { createStore } from 'redux'
import { combineReducers } from 'redux';

const initialState1 = {
    balance: 0,
    fullName: "",
    mobile: null,
    counter: 0
}
const initialState2 = {
    id: 0,
    status: false,
    firstName: "",
    lastName: "",
    age: "",
    gender: ""
}
const initialState3 = {
    todo: [],
    nextId: 1
}
function todoReducer(state = initialState3, action) {
    switch (action.type) {
        case "ADD_TODO":
            const newTodo = { id: state.nextId, title: action.payload.title }
            return { ...state, todo: [...state.todo, newTodo], nextId: state.nextId + 1 }
        case "EDIT_TODO":
            return {
                ...state,
                todos: state.todos.map(
                    (todo) => todo.id === action.payload.id
                        ? { ...todo, title: action.payload.title }
                        : todo)
            }
        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload.id)
            }
        default: return state
    }
}
const initialState4 = {
    name: "",
    age: "",
    state: "",
    distric: "",
    city: "",
    searchItem: "",
    users: [],
    serchItems:[],
    id: 1
}
// function userReducer(state = initialState4, action) {
//     switch (action.type) {
//         case "initialObj":
//             return {
//                 ...state, [action.field]: action.payload
//             }
//         case "submit":
//             return {
//                 ...state,
//                 users: [...state.users,
//                 {
//                     name: state.name,
//                     age: state.age,
//                     state: state.state.label,
//                     distric: state.distric.label,
//                     city: state.city.label
//                 }],
//                 serchItems:[...state.serchItems,state.name]
//             }
//         case "empty":
//             return {
//                 ...state, name: "", age: "", state: "", distric: "", city: ""
//             }
//         case "delete":
//             return {
//                 ...state, users: state.users.filter((val, i) => i !== action.payload)
//             }
//         case "edit":
//             return {
//                 ...state, name: action.payload.name, age: action.payload.age
//             }
//         case "stateData":
//             return {
//                 ...state, state: action.payload, distric: "", city: ""
//             }
//         case "districData":
//             return {
//                 ...state, distric: action.payload, city: ""
//             }
//         case "citiesData":
//             return {
//                 ...state, city: action.payload
//             }
//         case "search":
//             return {
//                 ...state,searchItem:action.payload
//             }
//             case "searchData":
//             return {
//                 ...state,searchItems:state.searchItem ? state.serchItems.filter((val)=>Object.values(val).find((i)=>i.toString().toLowerCase().includes(state.searchItem.toLowerCase()))):state.users
//             }

//         default: return state
//     }
// }
function accountReducer(state = initialState1, action) {
    switch (action.type) {
        case "deposit":
            return { ...state, balance: state.balance + +action.payload };
        case "withdraw":
            return { ...state, balance: state.balance - +action.payload };
        case "mobileUpdate":
            return { ...state, mobile: action.payload };
        case "nameUpdate":
            return { ...state, fullName: action.payload };
        case "counterUpdate":
            return { ...state, counter: state.counter + +action.payload }
        case "counterDesc":
            return { ...state, counter: state.counter - +action.payload }
        case "reset":
            return initialState1;
        default:
            return state
    }
}
function detailsReducer(state = initialState2, action) {
    switch (action.type) {
        case "inputtype":
            return { ...state, [action.field]: action.payload };
        case "gendertype":
            return { ...state, [action.nextName]: action.nextValue };
        default:
            return state
    }
}
const valid = {

}
function validReducer(state = valid, action) {
    switch (action.type) {
        case "submit":
            return {
                ...state, state: action.payload
            }

        default: return state
    }
}
const initialState5 = {
    users: [],
    xyz: {},
    isEdit: false,
 
}
function userReducer(state = initialState5, action) {
 
    switch (action.type) {
        case "submit":
            const { values, index, isEdit } = action.payload;
            if (!isEdit)
                return {
                    // ...state, users: [...state.users, action.payload.values,]
                    ...state, 
                    users: [...state?.users,{...values,id:state?.users?.length+1}]
                }
            else {
                const updatedUsers = [...state.users]
                const findIndex=updatedUsers.findIndex((val,i)=>val.id===values.id)
                updatedUsers.splice(findIndex,1,values)
                return {
                    ...state, users: updatedUsers, isEdit: false, xyz: {}
                }
            }
        case "delete":
            return {
                ...state, users: state.users.filter((val, i) => i !== action.payload)
            }
        case "edit":
            return {
                ...state, xyz:action.payload, isEdit: true
            }
        default: return state
    }
}
const rootReducer = combineReducers({
    account: accountReducer,
    personaldetails: detailsReducer,
    // user: userReducer,
    array: todoReducer,
    validValues: validReducer,
    userdetails: userReducer

    // array: todoReducer
})
export const store = createStore(rootReducer)
// export const store=createStore(accountReducer)
// console.log(store.getState())
// store.dispatch({type:"deposit",payload:1000})
// store.dispatch({type:"withdraw",payload:20})
// store.dispatch({type:"mobileUpdate",payload:7997794933})
// store.dispatch({type:"nameUpdate",payload:"vanaja"})
console.log(store.getState())
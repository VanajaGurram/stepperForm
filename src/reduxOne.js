const redux=require('redux')
const createStore=redux.createStore
const combineReducers=redux.combineReducers

const BUY_CAKE='BUY_CAKE'
const BUY_ICECREAM='BUY_ICECREAM'
 
function buyCake(){
    return{
        type:BUY_CAKE,
        info:'first redux action'
    }
}
function buyIceCream(){
    return{
        type:BUY_ICECREAM,
    
    }
}
 
// const initialState={
//     numOfCakes:10,
//     numOfIcecreams:20
// }
const initialCakeState={
numOfCakes:10
}
const initialIceCreamState={
numOfIcecreams:20
}
// const reducer=(state=initialState,action)=>{
//     switch(action.type){
//         case BUY_CAKE:return{
//             ...state,
//             numOfCakes:state.numOfCakes-1
//         }
//         case BUY_ICECREAM:return{
//             ...state,
//             numOfIcecreams:state.numOfIcecreams-1
//         }
//         default:return state
//     }
// }
const cakeReducer=(state=initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE:return{
            ...state,
            numOfCakes:state.numOfCakes-1
        }
        default :
        return state
    }
}
const iceCreamReducer=(state=initialIceCreamState,action)=>{
switch(action.type){
    case BUY_ICECREAM:return{
        ...state,numOfIcecreams:state.numOfIcecreams-1
    }
    default:
        return state
}
}
const rootReducer=combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})
const store=createStore(rootReducer)
console.log("initial state",store.getState())
const unsubscribe=store.subscribe(()=>console.log('update state',store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
unsubscribe()
 
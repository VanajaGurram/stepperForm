

import {
    DELETE, EDIT, SUBMIT, SEARCH, STATUS, DELETEMANY, STEPSUBMIT, STEPEDIT,
    GET_USER_DATA, SET_EDIT_DATA_AND_ACTION_TYPE, GET_POST_DATA, SET_POST_DATA_ADD,
    SET_EDIT_DATA_ADD, GET_RENDER_DATA, DELETE_RENDER_DATA, EDIT_RENDER_DATA, STATUS_RENDER_DATA,
    DELETE_MANY_RENDER_DATA, DELETE_MULTY_RENDER_DATA, GET_UID_POST_DATA, STEP_GET_DATA, STEP_DELETE_DATA, STEP_EDIT_DATA, STEP_STATUS_DATA, STEP_SELECT_MANY_DATA, STEP_DELETE_MULTI_DATA
} from "./actionTypes";
import uuid4 from "uuid4";

const initialState = {
    users: [],
    user: {},
    isEdit: false,
    searchItem: ""

}
export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SUBMIT:
            const { values, isEdit } = action.payload
            if (!isEdit) {
                return {
                    ...state, users: [...state.users, { ...values, id: state.users.length + 1, status: false }]
                }
            }
            else {
                const updatable = [...state.users]
                const index = updatable.findIndex((val, i) => val.id === values.id)
                updatable.splice(index, 1, values)
                return {
                    ...state, users: updatable, isEdit: false, user: {}
                }
            }
        case DELETE:
            return {
                ...state, users: state.users.filter((val, i) => i !== action.payload)
            }
        case EDIT:
            return {
                ...state, user: action.payload, isEdit: true
            }
        case SEARCH:
            return {
                // ...state,searchItems:action.payload?state.users.filter((item)=>Object.values(item)
                // .some((value)=>value.toString().toLowerCase().includes(action.payload.toLowerCase()))):state.users
                ...state, searchItem: action.payload
            }
        case STATUS:
            const userArray = [...state.users]
            const index = userArray.findIndex((val) => val.id === action.payload.id)
            userArray.splice(index, 1, { ...action.payload, status: !action.payload.status })
            return {
                ...state, users: userArray
            }
        case DELETEMANY:
            const userFil = state.users.filter((obj) => !action.payload.includes(obj.id))
            return {
                ...state, users: userFil
            }

        default: return state
    }
}


const initialState1 = {
    dataList: [],
    editData: {},
    isEdit: false,
    actionType: 1
}
export function tableReducer(state = initialState1, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return {
                ...state, dataList: [...state.dataList, { ...action.payload, id: state.dataList.length + 1 }]
            }
        case SET_EDIT_DATA_AND_ACTION_TYPE:
            return {
                ...state,
                editData: action.payload.editData,
                actionType: action.payload.actionType
            }
        default: return state
    }
}

const initialState2 = {
    posts: [],
    post: {},
    isEdit: false
}
export function postReducer(state = initialState2, action) {
    // console.log("isEDit",isEdit)
    switch (action.type) {
        case GET_POST_DATA:
            return {
                ...state, posts: action.payload
            }
        case GET_UID_POST_DATA:
            return {
                ...state, posts: state.posts.map((val) => ({ ...val, uid: uuid4() }))
            }

        // if(!state.isEdit){
        //     return {
        //         ...state, posts: action.payload
        //     }
        // }
        // else{
        //     const editData=[...state.posts]
        //     const index=editData.findIndex((item)=>item.id===action.payload.id);
        //     console.log("index",index)
        //     state.posts.splice(index,1,action.payload)
        //     return{
        //         ...state,posts:editData,isEdit:false
        //     }

        // }
        case SET_POST_DATA_ADD:
            const newData = {
                userId: 20,
                id: state.posts[state.posts.length - 1].id + 1,
                title: action.payload.title,
                body: action.payload.body
            }
            if (!state.isEdit) {
                return {
                    ...state, posts: [...state.posts, newData]
                }
            }
            else {

                const editData = [...state.posts]
                const index = editData.findIndex((item) => item.id === state.post.id);
                console.log("index", index)
                editData.splice(index, 1, { ...editData[index], ...action.payload })
                return {
                    ...state, posts: editData, post: {}, isEdit: false
                }

            }
        case SET_EDIT_DATA_ADD:
            return {
                ...state,
                post: action.payload,
                isEdit: true
            }
        default: return state
    }

}


const initialState3 = {
    data: [],
    dataObj: {},
    deleteItem: [],
    isEdit: false
}
export function dataReducer(state = initialState3, action) {
    switch (action.type) {
        case GET_RENDER_DATA:
            if (!state.isEdit) {
                return {
                    ...state, data: [...state.data, { ...action.payload, uid: uuid4(), status: true }]
                }
            }
            else {
                // const editData = [...state.data]
                const editData = state.data
                const index = editData.findIndex((value, i) => value.uid === state.dataObj.uid)
                // editData.splice(index, 1, { ...action.payload })
                editData.splice(index, 1, { ...editData[index], ...action.payload }
                    //     {
                    //     ...state.dataObj,
                    //     firstName: action.payload.firstName,
                    //     lastName: action.payload.lastName,
                    //     age: action.payload.age
                    // }
                )
                return {
                    ...state, data: editData, isEdit: false, status: false, dataObj: {}
                }
            }

        case DELETE_RENDER_DATA:
            return {
                ...state, data: state.data.filter((val, i) => i !== action.payload)
            }
        case EDIT_RENDER_DATA:
            return {
                ...state, dataObj: action.payload, isEdit: true
            }
        case STATUS_RENDER_DATA:
            //    console.log("status",action.payload.status)
            const index = state.data.findIndex((val) => val.uid === action.payload.uid)

            if (action.payload.status) {
                state.data[index] = { ...state.data[index], status: true }
            }
            else {
                state.data[index] = { ...state.data[index], status: false }
            }
            return {
                ...state, data: state.data
            }
        // const userArray = [...state.data]
        // const index = userArray.findIndex((val) => val.id === action.payload.uid)
        // // userArray[index].status=action.payload.status
        // userArray.splice(index, 1, { ...userArray[index], status: !action.payload.status })
        // return {
        //     ...state, data: userArray
        // }

        case DELETE_MANY_RENDER_DATA:
            console.log("arrayayay", state.deleteItem)
            if (!state.deleteItem.includes(action.payload)) {
                return {
                    ...state, deleteItem: [...state.deleteItem, action.payload]
                }
            }
            else {
                return {
                    ...state, deleteItem: state.deleteItem.filter((val) => val !== action.payload)
                }
            }
        case DELETE_MULTY_RENDER_DATA:
            const dlt = state.data.filter((obj) => !state.deleteItem.includes(obj.uid))
            return {
                ...state, data: dlt
            }
        
        default: return state
    }
}


const initialState4 = {
    stepData: [],
    stepObj: {},
    isEdit:false,
    deleteItem:[]
}
export function stepReducer(state = initialState4, action) {
    switch (action.type) {
        case STEP_GET_DATA:
           if(!state.isEdit){
            return {
                ...state, stepData: [...state.stepData, { ...action.payload, uid: uuid4() ,status:true}]
            }
           }
           else{
            const editData=state.stepData
            const index=editData.findIndex((val,i)=>val.uid===state.stepObj.uid)
            editData.splice(index,1,{...editData[index],...action.payload})
            return{
                ...state,stepData:editData,isEdit:false,stepObj:{}
            }
           }
        case STEP_DELETE_DATA:
            return {
                ...state, stepData: state.stepData.filter((val, i) => i !== action.payload)
            }               
        case STEP_EDIT_DATA:
            return {
           ...state,stepObj:action.payload,isEdit:true
            }
            case STEP_STATUS_DATA:
                const index=state.stepData.findIndex((val)=>val.uid===action.payload.uid)
                state.stepData[index]={...action.payload,status:!action.payload.status,uid:action.payload.uid}
                return{
                    ...state,stepData:state.stepData
                }
                case STEP_SELECT_MANY_DATA:
                    if(!state.deleteItem.includes(action.payload)){
                        return{
                            ...state,deleteItem:[...state.deleteItem,action.payload]
                        }
                    }
                    else{
                        return{
                            ...state,deleteItem:state.deleteItem.filter((val)=>val!==action.payload)
                        }
                    }
                    case STEP_DELETE_MULTI_DATA:
                        const dlt=state.stepData.filter((obj)=>!state.deleteItem.includes(obj.uid))
                        return{
                            ...state,stepData:dlt,deleteItem:[]
                        }

    
        default: return state
    }
}
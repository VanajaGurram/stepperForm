import { DELETE, DELETEMANY, EDIT, SEARCH, SET_EDIT_DATA_AND_ACTION_TYPE, STATUS, STEPEDIT, STEPSUBMIT, SUBMIT,GET_USER_DATA, GET_POST_DATA, SET_POST_DATA_ADD, SET_EDIT_DATA_ADD, GET_RENDER_DATA, DELETE_RENDER_DATA, EDIT_RENDER_DATA, STATUS_RENDER_DATA, DELETE_MANY_RENDER_DATA, DELETE_MULTY_RENDER_DATA, GET_UID_POST_DATA, STEP_GET_DATA, STEP_DELETE_DATA, STEP_EDIT_DATA, STEP_STATUS_DATA, STEP_SELECT_MANY_DATA, STEP_DELETE_MULTI_DATA } from "./actionTypes"


export const submitAction=(values,isEdit)=>{
    return{
        type:SUBMIT,
        payload:{values,isEdit}
    }
}
export const deleteAction=(index)=>{
  return{
    type:DELETE,
    payload:index
  }
}
export const editAction=(row)=>{
    return{
        type:EDIT,
        payload:row
    }
}
export const searchAction=(val)=>{
    return{
        type:SEARCH,
        payload:val
    }
}
export const statusAction=(check)=>{
    return{
        type:STATUS,
        payload:check
    }
}
export const deleteManyAction=(deleteItems)=>{
    return{
        type:DELETEMANY,
        payload:deleteItems
    }
}




export const getUserData=(values)=>{
    return{
          type:GET_USER_DATA,
          payload:values
    }
}
export const setActionDataAndActionType=(actionType,editData)=>{
    return{
        type:SET_EDIT_DATA_AND_ACTION_TYPE,
        payload:{actionType,editData}
    }
}


export const getPostData=(posts)=>{
    return{
        type:GET_POST_DATA,
        payload:posts
    }
}
export const addUidData=(posts)=>{
return{
    type:GET_UID_POST_DATA,
    payload:posts
}
}
export const addPostData=(posts)=>{
    return{
   type:SET_POST_DATA_ADD,
   payload:posts
    }
}
export const editPostData=(post)=>{
return{
    type:SET_EDIT_DATA_ADD,
    payload:post
}
}




export const submitRenderData=(data)=>{
    return{
        type:GET_RENDER_DATA,
        payload:data
    }
}
export const deleteRenderData=(index)=>{
    return{
        type:DELETE_RENDER_DATA,
        payload:index
    }
}
export const editRenderData=(row)=>{
    return{
        type:EDIT_RENDER_DATA,
        payload:row
    }
}
export const statusRenderData=(row)=>{
    return{
        type:STATUS_RENDER_DATA,
        payload:row
    }
}
export const deleteManyData=(value)=>{
    return{
        type:DELETE_MANY_RENDER_DATA,
        payload:value
    }
}
export const  deleteData=()=>{
    return{
        type:DELETE_MULTY_RENDER_DATA
    }
}



export const stepSubmit=(data)=>{
    return{
        type:STEP_GET_DATA,
        payload:data
    }
}
export const stepDelete=(index)=>{
    return{
        type:STEP_DELETE_DATA,
        payload:index
    }
}
export const stepEdit=(data)=>{
    return{
        type:STEP_EDIT_DATA,
        payload:data
    }
}
export const stepStatus=(status)=>{
    return{
        type:STEP_STATUS_DATA,
        payload:status
    }
}
export const stepSelectMany=(uid)=>{
    return{
        type:STEP_SELECT_MANY_DATA,
        payload:uid
    }
}
export const stepDeleteMany=()=>{
    return{
        type:STEP_DELETE_MULTI_DATA
    }
}
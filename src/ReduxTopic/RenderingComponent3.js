import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteManyData, deleteRenderData, editRenderData, statusRenderData } from './Store/actions'

function RenderingComponent3({ row, index }) {
    // const [deleteItems,setDeleteItems]=useState([])
    const dispatch = useDispatch()
    const data = useSelector((state) => (state.data.data).find((val) => val.uid === row))
    // const status=useSelector((state)=>state.data?.data)
    const deleteItem=useSelector((state)=>(state.data.deleteItem).find((uid)=>uid===data.uid))


    
    const statusEdit=(e,uid)=>{
        if(e.target.checked){
            dispatch(statusRenderData({uid,status:true}))
        }
        else{
            dispatch(statusRenderData({uid,status:false}))
        }
    }

    return (
        <>
    
            <td><input type='checkbox' value={data.uid} checked={deleteItem} onChange={(e)=>dispatch(deleteManyData(e.target.value))}></input></td>
            <td>{data.firstName}</td>
            <td>{data.lastName}</td>
            <td>{data.age}</td>
            <td>
                <button type='button' disabled={!data.status} onClick={() => dispatch(deleteRenderData(index))}>Delete</button>
                <button type='button' disabled={!data.status} onClick={() => dispatch(editRenderData(data))}>Edit</button>
                <input type='checkbox'checked={data.status} name='status' onClick={(e) =>statusEdit(e,data.uid)}></input>
            </td>
        </>
    )
}

export default React.memo(RenderingComponent3)
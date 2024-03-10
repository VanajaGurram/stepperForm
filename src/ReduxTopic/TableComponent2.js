import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stepDelete, stepDeleteMany, stepEdit, stepSelectMany, stepStatus } from './Store/actions'

function TableComponent2({ uid, index }) {
    const dispatch = useDispatch()
    const data = useSelector((state) => {
        //    console.log("dataaaa", state.stepper.stepData.find((val)=>val.uid===uid))
        return state.stepper.stepData.find((val) => val.uid === uid)
    })
    const deleteItem=useSelector((state)=>{
        console.log("deleteeeItemss",state.stepper.deleteItem)
        return (state.stepper.deleteItem).find((val)=>val===data.uid)
    })
    // const steperStatus=(e,uid)=>{
    //     if(e.target.checked){
    //         dispatch(stepStatus({uid,status:true}))
    //     }
    //     else{
    //         dispatch(stepStatus({uid,status:false}))
    //     }

    // }
    return (
        <>
            <td><input type='checkbox' checked={deleteItem} value={data.uid} onClick={(e)=>dispatch(stepSelectMany(e.target.value))}></input></td>
            <td>{data?.firstName}</td>
            <td>{data?.lastName}</td>
            <td>{data?.age}</td>
            <td>{data?.state?.label}</td>
            <td>{data?.distric?.label}</td>
            <td>{data?.village?.label}</td>
            <td>{data?.contact}</td>
            <td>
                <button disabled={!data.status} onClick={() => dispatch(stepDelete(index))}>Delete</button>
                <button disabled={!data.status} onClick={() => dispatch(stepEdit(data))}>Edit</button>
                <input type='checkbox' checked={data.status} onClick={() => dispatch(stepStatus(data))}></input>
            </td>
        </>
    )
}

export default React.memo(TableComponent2)
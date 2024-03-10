import { useDispatch, useSelector } from 'react-redux'
import { Field, FieldArray, Form, Formik } from 'formik'
import { deleteAction, deleteManyAction, editAction, searchAction, statusAction, submitAction} from './Store/actions'
import React, { useState } from 'react'

function Component() {
    const dispatch = useDispatch()
    const [deleteItems,setDeleteItems]=useState([])
    const users = useSelector((state) => {
        console.log("userssss", state.user.users)
        return state.user.users
    })
    const user = useSelector((state) => {
        console.log("userrrrr1",state.user.user)
        return state.user.user
    })
    const isEdit=useSelector((state)=>{
        console.log("isEditttt",state.user.isEdit)
        return state.user.isEdit
    })
    const searchItem=useSelector((state)=>{
        // console.log("searchItemm",state.searchItem)
        return state.user.searchItem})

        

    const searchData=searchItem?users.filter((items)=>Object.values(items)
    .some((value)=>value.toString().toLowerCase().includes(searchItem.toString().toLowerCase()))):users
    const initialValues = {
        id: user?.id||0,
        firstName: user?.firstName||"",
        lastName: user?.lastName||"",
        age: user?.age||"",
        tech:user?.tech||[""]
    }
    const onDeleteHandler=(e,id)=>{
       if(e.target.checked){
        setDeleteItems([...deleteItems,id])
       }
       else {
        const remaining=deleteItems.filter((did)=>did!==id)
        setDeleteItems(remaining)
       }
    }
    const deletMany=()=>{
       alert("confirm to delete")
       dispatch(deleteManyAction(deleteItems))
    }

    console.log("deleteeeearray",deleteItems)
    return (
        <div>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    dispatch(submitAction(values,isEdit))
                    resetForm()
                }}>
                {
                    ({ values }) =>
                        <Form>
                            FirstName: <Field name='firstName'></Field><br />
                            LastName: <Field name='lastName'></Field><br />
                            Age: <Field name='age'></Field><br />
                            Technologies :<FieldArray name='tech'>
                                {
                                   (fprops)=>{
                                    const { remove, push, form } = fprops
                                    const { values } = form
                                    const { tech } = values
                                    return(
                                        <>
                                        {
                                        tech?.map((techh,index)=>(
                                            <div key={index}>
                                                <Field type='text' name={`tech[${index}]`}></Field>
                                                {
                                                  index > 0 &&  <button type='button' onClick={()=>remove(index)}> - </button>
                                                }
                                               
                                            </div>))
                                            
                                   }
                                    <button type='button' onClick={()=>push("")}> + </button>
                                            </>
                                    )
                                   }
                                   }
                                
                            </FieldArray>
                            <button type='submit'>update</button>
                        </Form>
                }
            </Formik>
            <div>
                <input type='search' placeholder='search here...' onChange={(e)=>dispatch(searchAction(e.target.value))}></input>
                <button type='button'  onClick={deletMany}>Delete</button>
                <table>
                    <thead>
                        <th>Delete</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Age</th>
                        <th>Technologies</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {
                            searchData?.map((row, index) =>
                                <tr key={index}>
                                    <td><input type='checkbox' checked={deleteItems.includes(row.id)} onClick={(e)=>onDeleteHandler(e,row.id)} ></input></td>
                                    <td>{row.firstName}</td>
                                    <td>{row.lastName}</td>
                                    <td>{row.age}</td>
                                    <td>{row?.tech?.map((val)=>val)?.join(",")}</td>
                                    <td>
                                        <button type='button' disabled={!row?.status}  onClick={() => dispatch(deleteAction(index))}>Delete</button>
                                        <button type='button' disabled={!row?.status}  onClick={() => dispatch(editAction(row))}>Edit</button>
                                        <input type='checkbox' onChange={(e)=>dispatch(statusAction(row))}></input>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Component
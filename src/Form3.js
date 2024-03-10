import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { useDispatch,useSelector } from 'react-redux'
 
function Form3() {
    const dispatch=useDispatch()
    const details=useSelector((state)=>state?.userdetails.users)
    const xyz = useSelector((state) => state?.userdetails.xyz);
    const isEdit = useSelector((state) => state?.userdetails.isEdit);
    const initialValues = {
        id:xyz.id||0,
        firstName: xyz?.firstName || "",
        lastName: xyz?.lastName || "",
        age: xyz?.age || "",
        state: xyz.state || "",
        distric: xyz?.distric || "",
        city: xyz?.city || ""
    }
    return (
       
        <div>
            { console.log(details)}
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(values,{resetForm})=>{
                    //console.log(values)
                    dispatch({type:"submit",payload:{values, isEdit }})
                    resetForm()
                }}>
                {
                    ({ values, setFieldValues }) =>
                        <Form>
                            {/* {//console.log("detailllll",details)} */}
                         FirstName: <Field name='firstName'></Field><br/>
                         LastName: <Field name='lastName'></Field><br/>
                         Age: <Field name='age'></Field><br/>
                         State: <Field name='state'></Field><br/>
                         distric: <Field name='distric'></Field><br/>
                         city: <Field name='city'></Field><br/>
                         <button type='submit'>{isEdit ? "Update" : "Submit"}</button>
 
 
                        </Form>
                }
             
         
            </Formik>
            <table>
                <thead>
                    <tr>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Age</th>
                    <th>State</th>
                    <th>Distric</th>
                    <th>City</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                   details?.map((row,index)=>
                   <tr key={index}>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.age}</td>
                    <td>{row.state}</td>
                    <td>{row.distric}</td>
                    <td>{row.city}</td>
                    <td>
                        <button type='button' onClick={()=>dispatch({type:"delete",payload:index})}>delete</button>
                        <button type='button' onClick={()=>dispatch({type:"edit",payload:row})}>Edit</button>
                    </td>
                   </tr>)
                }
                </tbody>
              </table>
        </div>
    )
}
 
export default Form3
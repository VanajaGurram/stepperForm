import { Field, Formik,Form } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitRenderData } from './Store/actions'
import RenderingComponent2 from './RenderingComponent2'

function RenderingComponent1() {
    const dispatch= useDispatch()
    // const data=useSelector((state)=>{
    //     console.log(state.data.data)
    // })
    const dataObj=useSelector((state)=>{
        console.log(state.data.dataObj)
        return state.data.dataObj
    })
    const initialValues={
    
        firstName:dataObj.firstName||"",
        lastName:dataObj.lastName||"",
        age:dataObj.age||""
    }
  return (
    <div>
   <Formik 
   initialValues={initialValues}
   enableReinitialize
   onSubmit={(values,{resetForm})=>{
    console.log(values)
    resetForm()
    dispatch(submitRenderData(values))
   }}>
       {
        ({values})=>
        <Form>
            FirstName: <Field name="firstName"></Field><br/>
            LastName: <Field name="lastName"></Field><br/>
            Age: <Field name="age"></Field><br/>
            <button type='submit'>Save</button>
            
        </Form>
       }

   </Formik>
   <RenderingComponent2/>
    </div>
  )
}

export default React.memo(RenderingComponent1)
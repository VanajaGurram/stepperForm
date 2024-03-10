import { Formik ,Form,Field,ErrorMessage} from 'formik'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import * as Yup from 'yup'

function ValidForm() {
    const dispatch=useDispatch()
    const valid=useSelector((state)=>state.validValues)
  return (
    <div>
        <Formik
        initialValues={{
            firstName:"",
            lastName:"",
            age:""
        }}
        onSubmit={(values,{resetForm})=>{
            console.log(values)
            dispatch({type:"submit",payload:values})
            resetForm()
        }}
        validationSchema={Yup.object().shape({
            firstName:Yup.string().required("required"),
            lastName:Yup.string().min(4,"minimum 4 charecters required").max(10,"maximum 10 charecters required").required("required"),
            age:Yup.string().required("required")
        })}>
            {
                ({values})=>
                <Form>
                   FirstName: <Field name='firstName'></Field>
                   <ErrorMessage name='firstName'></ErrorMessage><br/>
                    lastName: <Field name='lastName'></Field>
                    <ErrorMessage name='lastName'></ErrorMessage><br/>
                    Age: <Field name='age'></Field>
                    <ErrorMessage name='age'></ErrorMessage><br/>
                    <button type='submit'>Submit</button>
                </Form>
            }
        
        </Formik>
    </div>
  )
}

export default ValidForm
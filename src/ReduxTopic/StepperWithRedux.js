import { Field, Form, Formik } from 'formik'
import React from 'react'
import { editStep, setActionDataAndActionType, getUserData } from './Store/actions'
import { useDispatch, useSelector } from 'react-redux'

function StepperWithRedux() {
    const dispatch = useDispatch()
    const dataList = useSelector((state) => {
        console.log("stateeee", state.tableReducer.dataList)
        return state.tableReducer.dataList
    })
    const editData=useSelector((state)=>{
        console.log("dataObjjj",state.tableReducer.editData)
        return state.tableReducer.editData
    })
    const actionType=useSelector((state)=>{
        console.log("dataObjjj",state.tableReducer.actionType)
        return state.tableReducer.actionType
    })

    const initialValues = {
        id:editData?.id||0,
        // step: 1,
        firstName: editData?.firstName||"",
        lastName: editData?.lastName||"",
        age: editData?.age||"",
        state: editData?.state||"",
        distric: editData?.distric|| "",
        village: editData?.village|| ""
    }
    // const handleSetEdit=(row)=>{
        // dispatch(editStep(row));
        // setFieldValue("step",2);
    // };
    return (
        <div>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(values, { setFieldValue,resetForm }) => {
                    dispatch(getUserData(values))
                    // setFieldValue("step", 1)
                    resetForm();
                dispatch(setActionDataAndActionType(1))
                }}>
                {
                    ({ values, setFieldValue }) =>
                        <Form>
                            {console.log("initial",values)}
                            {
                                actionType===2&& <div>
                                    FirstName: <Field name='firstName'></Field><br />
                                    LastName: <Field name='lastName'></Field><br />
                                    Age: <Field name='age'></Field><br />
                                    State: <Field name='state'></Field><br />
                                    Distric: <Field name='distric'></Field><br />
                                    Village: <Field name='village'></Field><br />
                                    <button type='submit'>Save</button>
                                </div>
                            }
                            {
                              actionType===1 &&
                                <div>
                                    <button type='button' onClick={() => dispatch(setActionDataAndActionType(2,undefined))}>Add</button>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>FirstName</th>
                                                <th>LastName</th>
                                                <th>Age</th>
                                                <th>State</th>
                                                <th>Distric</th>
                                                <th>Village</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataList.map((row, index) =>
                                                    <tr key={index}>
                                                        <td>{row.firstName}</td>
                                                        <td>{row.lastName}</td>
                                                        <td>{row.age}</td>
                                                        <td>{row.state}</td>
                                                        <td>{row.distric}</td>
                                                        <td>{row.village}</td>
                                                        <td>
                                                            <button type='button'
                                                             onClick={()=>dispatch(setActionDataAndActionType(2,row))} >Edit</button>
                                                        </td>
                                                    </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }

                        </Form>
                }

            </Formik>
        </div>
    )
}

export default StepperWithRedux
import { Field, Form, Formik, ErrorMessage } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stepSubmit } from './Store/actions'
import TableComponent from './TableComponent'
import * as Yup from 'yup'
import Select from 'react-select'

function StepperForm() {
    const dispatch = useDispatch()
    const list = useSelector((state) => {
        console.log("list", state.stepper.stepData)
        return state.stepper.stepData
    })
    const stepObj = useSelector((state) => {
        console.log("stepObj", state.stepper.stepObj)
        return state.stepper.stepObj
    })
    const stateData = [
        {
            label: "telangana",
            value: 1,
            districtData: [
                {
                    label: "mulugu",
                    value: 1,
                    citiesData: [
                        { label: "pasra", value: 1 },
                        // { label: "govindaropet", value: 2 },
                        // { label: "chalvai", value: 3 }
                    ]
                },
                {
                    label: "suryapet",
                    value: 2,
                    citiesData: [
                        { label: "nimmikal", value: 1 },
                        { label: "yelkaram", value: 2 },
                        { label: "encharla", value: 3 }
                    ]
                },
                {
                    label: "warangal",
                    value: 3,
                    citiesData: [
                        // { label: "kazipet", value: 1 },
                        // { label: "subedhari", value: 2 },
                        { label: "hanamkonda", value: 3 }
                    ]
                }
            ]
        },
        {
            label: "andrapradesh",
            value: 2,
            districtData: [
                {
                    label: "kakinada",
                    value: 1,
                    citiesData: [
                        { label: "kakinada1", value: 1 },
                        // { label: "kakinada2", value: 2 },
                        // { label: "kakinada3", value: 3 }
                    ]
                },
                {
                    label: "vijayawada",
                    value: 2,
                    citiesData: [
                        { label: "vijayawada1", value: 1 },
                        { label: "vijayawada2", value: 2 },
                        { label: "vijayawada3", value: 3 }
                    ]
                },
                // {
                //     label: "gunturu",
                //     value: 3,
                //     citiesData: [
                //         { label: "gunturu2", value: 2 },
                //         { label: "gunturu1", value: 1 },
                //         { label: "gunturu3", value: 3 }
                //     ]
                // }
            ]
        }
    ]

    const initialValues = {
        isStep: 1,
        step: true,
        firstName: stepObj.firstName || "",
        lastName: stepObj.lastName || "",
        age: stepObj.age || "",
        state: stepObj.state || "",
        distric: stepObj.distric || "",
        village: stepObj.village || "",
        contact: stepObj.contact || ""
    }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                // onSubmit={(values)=>{

                //     values.isStep=values.isStep+1}}
                onSubmit={(values, { setFieldValue }) => {
                    console.log(values)
                    setFieldValue("isStep", values.isStep + 1)
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().required("Required firstname"),
                    lastName: Yup.string().when("firstName", {
                        is: (val) => val?.length > 0,
                        then: (val) => val?.required("lastName is Required")
                    }),
                    age: Yup.string().matches(/^[0-9]+$/, "Age must be a number").required("Required")


                })}
            >
                {
                    ({ values, setFieldValue, resetForm }) =>
                        <Form>
                            {console.log("fddfdsfkdjskjds__=>", values)}
                            {
                                values.isStep === 1 && <div>
                                    FirstName: <Field name="firstName"></Field>
                                    <ErrorMessage name='firstName'></ErrorMessage><br />
                                    LastName: <Field name="lastName"></Field>
                                    <ErrorMessage name='lastName'></ErrorMessage><br />
                                    Age: <Field name="age"></Field>
                                    <ErrorMessage name='age'></ErrorMessage><br />

                                    <button type='submit'>Next</button>
                                </div>
                            }
                            {
                                values.isStep === 2 &&
                                <div>


                                    <Select name='state' value={values.state}
                                        onChange={(opn) => {
                                            console.log("staeeeeopnnnn", opn)
                                            let x = stateData?.find((state) => state?.value === opn?.value) //2
                                            let y = stateData?.find((state) => state?.value === opn?.value)?.districtData?.find((dist) => dist?.value === opn?.value) //1
                                            // console.log("district data"+y)
                                            let z= x?.districtData?.[0];
                                            setFieldValue('state', opn);
                                            setFieldValue('distric', { value: z?.value, label:z?.label });
                                            setFieldValue('village', { value: z.citiesData?.[0]?.value, label: z.citiesData?.[0]?.label })
                                        }}
                                        options={stateData}>
                                    </Select>
                                    <Select name="distric" value={values?.distric}
                                        onChange={(opn) => {

                                            let x = stateData?.find((state) => state?.value === values?.state?.value)?.districtData?.find((dist) => dist?.value === opn?.value)
                                            console.log("distttttttt", { opn, x })
                                            setFieldValue('distric', opn);
                                            setFieldValue('village', { value: x?.citiesData?.[0]?.value, label: x?.citiesData?.[0]?.label })

                                        }}
                                        options={values?.state ?
                                            stateData?.find((state) => state?.value === values?.state?.value)
                                                ?.districtData : ""}>
                                    </Select>
                                    <Select name="village" value={values.village}
                                        onChange={(opn) => { setFieldValue('village', opn) }}
                                        options={values?.distric ?
                                            stateData?.find((state) => state?.value === values?.state?.value)
                                                ?.districtData?.find((dist) => dist?.value === values?.distric?.value)
                                                ?.citiesData : ""}>
                                    </Select>

                                    {/* <Select name='state' value={values.state}
                                        onChange={(opn) => {
                                            console.log("staeeeeopnnnn", opn)
                                            let x = stateData?.find((state) => state?.value === opn?.value)
                                            let y = stateData?.find((state) => state?.value === opn?.value)?.districtData?.find((dist) => dist?.value === opn?.value)
                                            setFieldValue('state', opn);
                                            if (x.districtData.length === 1) {

                                                setFieldValue('distric', { value: x?.districtData?.[0]?.value, label: x?.districtData?.[0]?.label });
                                            }
                                            else {
                                                setFieldValue("distric", "")
                                            }
                                            setFieldValue("village", "")
                                            // if(y.citiesData.length===1){
                                            //     setFieldValue('village',{value:y.citiesData?.[0]?.value , label:y?.citiesData?.[0]?.label})
                                            // }
                                            // else{

                                            //     setFieldValue('village', "")
                                            // }
                                        }}
                                        options={stateData}>
                                    </Select>
                                    <Select name="distric" value={values?.distric}
                                        onChange={(opn) => {

                                            let x = stateData.find((state) => state?.value === values.state?.value)?.districtData?.find((dist) => dist?.value === opn?.value)
                                            console.log("distttttttt", { opn, x })
                                            setFieldValue('distric', opn);
                                            if (x.citiesData.length === 1) {

                                                setFieldValue('village', { value: x?.citiesData?.[0]?.value, label: x?.citiesData?.[0]?.label })
                                            }
                                            else {
                                                setFieldValue("village", "")
                                            }

                                        }}
                                        options={values.state ?
                                            stateData?.find((state) => state?.value === values?.state?.value)
                                                ?.districtData : ""}>
                                    </Select>
                                    <Select name="village" value={values.village}
                                        onChange={(opn) => { setFieldValue('village', opn) }}
                                        options={values?.distric ?
                                            stateData?.find((state) => state?.value === values?.state?.value)
                                                ?.districtData?.find((dist) => dist?.value === values?.distric?.value)
                                                ?.citiesData : ""}>
                                    </Select> */}


                                    <button type='button' onClick={() => setFieldValue("isStep", 1)}>Back</button>
                                    <button type='submit'>Next</button>
                                </div>
                            }
                            {
                                values.isStep === 3 &&
                                <div>
                                    contact: <Field name="contact"></Field><br />
                                    <button type='button' onClick={() => setFieldValue("isStep", 2)}>Back</button>
                                    <button type='submit' onClick={() => {
                                        setFieldValue("isStep", 1);
                                        dispatch(stepSubmit(values));
                                        resetForm();
                                    }}>submit</button>
                                </div>
                            }
                        </Form>
                }

            </Formik>
            <TableComponent />
        </div>
    )
}

export default React.memo(StepperForm)
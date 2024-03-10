import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
function Form2() {
    let dispatch = useDispatch()
    const [list, setList] = useState([])
    const [data, setData] = useState({})
    const [check, setCheck] = useState(false)
    const initialValues1 = {
        balance: 0,
        fullName: "",
        mobile: "",
    }
    const initialValues2 = {
        status: false,
        id: data?.id || 0,
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        age: data?.age || "",
        gender: data?.gender || ""
    }
    const onChangehandler = (e) => {
        dispatch({
            type: "inputtype",
            field: e.target.name,
            payload: e.target.value

        })
    }
    const onGenderhandler = (e) => {
        dispatch({
            type: "gendertype",
            nextName: e.target.name,
            nextValue: e.target.value
        })
    }
    console.log("listttt", list)
    // console.log("edittttt",list)
    console.log("dataaaa", data)

    return (
        <div>
            <Formik
                initialValues={initialValues1}
            >
                {
                    ({ values, setFieldValue }) =>
                        <Form>
                            balance : <Field name="balance"></Field>
                            <button onClick={() => { dispatch({ type: "deposit", payload: values.balance }) }}>deposite</button>
                            <button onClick={() => { dispatch({ type: "withdraw", payload: values.balance }) }}>withdraw</button><br />
                            FullName : <Field name="fullName"></Field>
                            <button onClick={() => { dispatch({ type: "nameUpdate", payload: values.fullName }) }}>Update</button><br />
                            Mobile : <Field name="mobile"></Field>
                            <button onClick={() => dispatch({ type: "mobileUpdate", payload: values.mobile })}>Update</button>
                        </Form>
                }
            </Formik>
            <Formik
                initialValues={initialValues2}
                enableReinitialize
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    if (!check) {
                        setList([...(list || []), { ...values, id: list.length + 1, status: true }])
                    }
                    else {
                        const index = list.findIndex((val, i) => val.id === values.id)
                        list.splice(index, 1, values)
                        setList(list)
                        console.log("edittt", list)
                    }
                    resetForm()

                }}>
                {
                    ({ values, setFieldValue }) => {
                        return <Form>
                            FirstName : <Field name="firstName" value={values.firstName} onChange={(e) => { onChangehandler(e); setFieldValue("firstName", e.target.value) }}></Field><br />
                            LastName : <Field name="lastName" value={values.lastName} onChange={(e) => { onChangehandler(e); setFieldValue("lastName", e.target.value) }}></Field><br />
                            Age : <Field name='age' value={values.age} onChange={(e) => { onChangehandler(e); setFieldValue("age", e.target.value) }}></Field><br />
                            Gender : <Field type='radio' name="gender" value='male' onChange={(e) => { onGenderhandler(e); setFieldValue("gender", e.target.value) }}></Field>Male
                            <Field type='radio' name="gender" value='female' onChange={(e) => { onGenderhandler(e); setFieldValue("gender", e.target.value) }}></Field>Female
                            <Field type='radio' name="gender" value='other' onChange={(e) => { onGenderhandler(e); setFieldValue("gender", e.target.value) }} ></Field>Other<br />
                            <button type="submit">submit</button>
                            <div>
                <p>list of objects</p>
                <table>
                    <thead>
                        <tr>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((row, index) =>
                                <tr key={index}>
                                    <td>{row.firstName}</td>
                                    <td>{row.lastName}</td>
                                    <td>{row.age}</td>
                                    <td>{row.gender}</td>
                                    <td>
                                        <Field type='checkbox' name='status'
                                            checked={row?.status}
                                            onClick={() => {
                                                list?.splice(index, 1, { ...row, status: !row?.status });
                                                setList(list);
                                            }}></Field>

                                    {/* <Field></Field> */}
                                        <button type="button" disabled={!row?.status} onClick={() => setList(list.filter((val, i) => i !== index))}>Delete</button>
                                        <button type="button" disabled={!row?.status} onClick={() => { setData(row); setCheck(!check); }}>Edit</button>
                            
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

                        </Form>
                    }
                }

            </Formik>
           
        </div>
    )
}
export default Form2;
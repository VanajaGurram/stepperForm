import { Field, Formik, Form } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

function UserForm() {
  let dispatch = useDispatch()
  let userDetails = useSelector((state) => {
    console.log(state.user)
    return state.user
  })
  const nameChange = (e) => {
    dispatch({
      type: "initialObj",
      field: e.target.name,
      payload: e.target.value
    })
  }
  const clickSubmit = (e) => {
    dispatch({
      type: "submit"
    })
    dispatch({
      type: "empty"
    })
  }
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
                    { label: "govindaropet", value: 2 },
                    { label: "chalvai", value: 3 }
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
                    { label: "kazipet", value: 1 },
                    { label: "subedhari", value: 2 },
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
                    { label: "kakinada2", value: 2 },
                    { label: "kakinada3", value: 3 }
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
            {
                label: "gunturu",
                value: 3,
                citiesData: [
                    { label: "gunturu2", value: 1 },
                    { label: "gunturu1", value: 2 },
                    { label: "gunturu3", value: 3 }
                ]
            }
        ]
    }
]
  return (
    <div>
      {/* Name:<input type='text' name='name' value={userDetails.name} onChange={nameChange}></input><br/>
      Age:<input type='text'name='age' value={userDetails.age} onChange={nameChange}></input><br/>
      <button type='submit' onClick={clickSubmit}>Submit</button> */}
      <Formik
        initialValues={{
          name: "",
          age: ""
        }}>
        <Form>
          Name : <Field type='text' name='name' value={userDetails.name} onChange={nameChange}></Field><br />
          Age : <Field type='number' name='age' value={userDetails.age} onChange={nameChange}></Field><br />
          <Select name='state'
          value={userDetails.state}
            options={stateData}
            onChange={(i) => { dispatch({ type: "stateData", payload: i }) }} >
          </Select>
          <Select name='distric'
          value={userDetails.distric}
            options={userDetails.state ?
              stateData?.find((state) => state?.value === userDetails?.state?.value)
                ?.districtData : ""}
            onChange={(i) => { dispatch({ type: "districData", payload: i }) }}
          ></Select>
          <Select name='city'
          value={userDetails.city}
            options={userDetails.distric ?
              stateData.find((state) => state?.value === userDetails?.state?.value)
                ?.districtData?.find((dist) => dist?.value === userDetails?.distric?.value)
                ?.citiesData : ""}
            onChange={(i) => { dispatch({ type: "citiesData", payload: i }) }}></Select>
          <button type='submit' onClick={clickSubmit}>Submit</button>
        </Form>
      </Formik>
      <div>
        <h4>users details</h4>
        <input type='search' onChange={(e)=>dispatch({type:"search",payload:e.target.value})} ></input>
        <table>
          {}
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>State</th>
              <th>Distric</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              (userDetails.users.map((row, index) =>
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.age}</td>
                  <td>{row.state}</td>
                  <td>{row.distric}</td>
                  <td>{row.city}</td>
                  <td>
                    <button type='button' onClick={() => dispatch({ type: "delete", payload: index })}>Delete</button>
                    <button type='button' onClick={() => dispatch({ type: "edit", payload: row })}>Edit</button>
                  </td>
                </tr>))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserForm
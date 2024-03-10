import React from 'react'
import Select from 'react-select'
import { Formik,Form,Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

function DropdownForm() {
    let dispatch=useDispatch()
    let dropDown=useSelector((state)=>state.user)
                                                    
    
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
        {console.log("dropdownnnn",dropDown)}
        <Formik >

                <Form>
                 <Select name='state' 
                 options={stateData} 
                 onChange={(i)=>{dispatch({type:"stateData",payload:i})}} >
                 </Select>
                 <Select name='distric' 
                 options={dropDown.state ?
                    stateData?.find((state) => state?.value === dropDown?.state?.value)
                        ?.districtData : ""}
                 onChange={(i)=>{dispatch({type:"districData",payload:i})}}       
                        ></Select>
                 <Select name='city' 
                 options={dropDown.distric ?
                    stateData.find((state) => state?.value === dropDown?.state?.value)
                        ?.districtData?.find((dist) => dist?.value === dropDown?.distric?.value)
                        ?.citiesData : ""}
                        onChange={(i)=>{dispatch({type:"citiesData",payload:i})}}></Select>
                </Form>
            
        </Formik>
    </div>
  )
}

export default DropdownForm
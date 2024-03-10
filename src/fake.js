import React from 'react';
import {createStore} from 'redux'
import { combineReducers } from 'redux';
 
 
const initial ={
    count:1,
    name:"",
    no:"",
    address:"",
    array:[]
   
 
}
 
const reducer2initial={
    FirstName:"",
    Class:"",
 
}
 
 
function ReduxStore(state=initial,action) {
    switch(action.type){
        case "Add":{
            return {
                ...state,count:state.count + action.payload
            }
        }
        case "Del":{
            return {
                ...state,count:state.count-1
            }
 
        }
        case "form":{
            return {
                ...state,[action.fieldname]:action.payload
            }
 
        }
        case "array":{
            return {
               ...state, array:[...state.array,{name:state.name, no:state.no, address:state.address}]
            }
 
        }
 
        case "delete":{
            return {
               ...state, array: state.array.filter((val,i)=>i !== action.payload)
            }
 
        }
        case "edit":{
            return {
                ...state,
                name:action.payload.name , no:action.payload.no , address:action.payload.address
             }
 
        }
        case "clear":{
            return {
               ...state, name:"" , no:"",address:""
            }
 
        }
       
        default : return state
    }
   
}
//reducer 2
 
function Reducer2(state=reducer2initial,action){
    switch(action.type){
        case "FirstName":{
            return {
                ...state,FirstName:action.payload
            }
 
 
        }
        case "Class":{
            return {
                ...state,Class:action.payload
            }
 
 
        }
        default : return state
    }
 
}
 
 
const Combaine=combineReducers({Reducer1: ReduxStore , Reducer2: Reducer2})
 
 
export const Store =createStore(Combaine)

import { click } from '@testing-library/user-event/dist/click';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { array } from 'yup';
import { Formik,Form,Field } from 'formik';
 
 
function ForminRedux(props) {
    const [input, setInput] = useState(false)
 
    let Dis = useDispatch()
    let display = useSelector((val) => val.Reducer1)
    let display2 = useSelector((val)=>console.log("vv",val))
    console.log("dd", display.array)
 
    const inputs = (e) => {
        Dis({
            type: 'form',
            fieldname: e.target.name,
            payload: e.target.value
 
        })
    }
    const Clicks = (e) => {
        e.preventDefault();
        Dis({
            type: "array"
 
        })
        Dis({
            type: "clear"
        })
 
    }
 
 
 
 
    return (
        <div>
            <form>
 
                <input name="name" value={display.name} onChange={inputs} />
                <br />
 
                <br />
                <input name='no' value={display.no} onChange={inputs} />
                <br />
 
                <br />
                <input name="address" value={display.address} onChange={inputs} />
                <br />
                <br />
                <br />
                <br />
                <button type='submit' onClick={(e) => Clicks(e)}>Send</button>
            </form>
            <br />
            <br />
 
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>No</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
 
                    {display.array.map((i, index) => (
                        <>
                            {console.log("map", i)}
                            <tr key={index}>
                                <td>{i.name}</td>
                                <td>{i.no}</td>
                                <td>
                                    {i.address}
                                </td>
                                <td>
                                    <button type='button' onClick={()=>{Dis({type:"delete" ,payload:index})}}>Delete</button>
                                    <button type='button' onClick={()=>{Dis({type:"edit", payload:i})}}>Edit</button>
                                   
                                </td>
                               
                            </tr>
 
                        </>
 
 
                    ))}
 
                </tbody>
            </table>
            <h1>Reducer2 using Formik</h1>
            <Formik>
                <Form>
                    <Field name="name" onChange={(e)=>Dis({type:"FirstName" , payload:e.target.value})}/>
                    <br/>
                    <br/>
                    <Field name="name" onChange={(e)=>Dis({type:"Class" , payload:e.target.value})}/>
                </Form>
            </Formik>
 
 
 
 
 
 
        </div>
    );
}
 
export default ForminRedux;
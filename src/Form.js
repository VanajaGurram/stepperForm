import { useState } from "react";
import { useDispatch } from "react-redux";
import { counterDesc, countrtIncrese, deposite, mobileUpdate, nameUpdate, withdraw } from "./Action";
function Form() {
    let dispatch = useDispatch();
    const [amount, setAmount] = useState("");
    const [fullName, setFullName] = useState("");
    const [mobile, setMobile] = useState("")
    const [counter, setCounter] = useState(0)
    const [check,setCheck]=useState()
    const [list,setList]=useState([])
    const [edit,setEdit]=useState({})
    const [data, setData] = useState({
        id:edit?.id||0,
        status:false,
        firstName: edit?.firstName||"",
        lastName: edit?.lastName||"",
        age: edit?.age||"",
        gender:edit?.gender|| ""
    })
    
    const onChangehandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        dispatch({
            type: "inputtype",
            field: e.target.name,
            payload: e.target.value

        })
        console.log("targetttt", e.target.value)
    }
    const onGenderhandler = (e) => {
        setData({ ...data, gender: e.target.value })
        dispatch({
            type: "gendertype",
            nextName: e.target.name,
            nextValue: e.target.value
        })
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // dispatch({
        //     type:"empty"
        // })
        console.log("dataaaa", data)
        if(!check){
            setList([...list,{...data,id:list.length+1,status:true}])
        }
        else{
            let index=list.findIndex((val,i)=>val.id===data.id)
            list.splice(index,1,data)
            console.log("editttttttttlisttt", list)
            setList(list)
        }
        
       
        setData({
            firstName:"",
            lastName:"",
            age:"",
            gender:""
        })
    }
    console.log("listtttt",list)

    return (
        <>
            <input type="number"
                value={amount}
                placeholder="Enter Amount.."
                onChange={(e) => setAmount(e.target.value)}>
            </input>
            <button type="button"
                onClick={() => {
                    // dispatch({ type: "deposit", payload: amount });
                    dispatch(deposite(amount))
                    setAmount("")
                }}>Deposit</button>
            <button type="button"
                onClick={() => {
                    // dispatch({ type: "withdraw", payload: amount });
                    dispatch(withdraw(amount))
                    setAmount("")
                }}>Withdraw</button><br />
            <input type="text"
                value={fullName}
                placeholder="Enter name.."
                onChange={(e) => setFullName(e.target.value)}>
            </input>
            <button type="button"
                onClick={() => {
                    // dispatch({ type: "nameUpdate", payload: fullName });
                    dispatch(nameUpdate(fullName))
                    setFullName("")
                }}>update</button><br />
            <input type="text"
                value={mobile}
                placeholder="Enter number.."
                onChange={(e) => setMobile(e.target.value)}>
            </input>
            <button type="button"
                onClick={() => {
                    // dispatch({ type: "mobileUpdate", payload: mobile });
                    dispatch(mobileUpdate(mobile))
                    setMobile("")
                }}>update</button><br />
            {/* <h1>count-{counter}</h1> */}
            <button type="button" value={counter} onClick={(e) => { dispatch(countrtIncrese()); setCounter(e.target.value) }}>increase</button>
            <button type="button" value={counter} onClick={(e) => { dispatch(counterDesc()); setCounter(e.target.value) }}>decrease</button><br />
            <button type="reset"
                onClick={() => { dispatch({ type: "reset" }) }}>Reset</button>

            <form onSubmit={onSubmitHandler}>
                <label>FirstName : </label>
                <input type="text" value={data.firstName} name="firstName" onChange={onChangehandler}></input><br />
                <label>LastName : </label>
                <input type="text" value={data.lastName} name="lastName" onChange={onChangehandler}></input><br />
                <label>Age : </label>
                <input type="text" value={data.age} name="age" onChange={onChangehandler}></input ><br />
                <label>Gender : </label>
                <input type="radio" value='male' name="gender" onChange={onGenderhandler} checked={data.gender==='male'}></input><label>Male </label>
                <input type="radio" value='female' name="gender" onChange={onGenderhandler} checked={data.gender==='female'}></input><label>Female </label>
                <input type="radio" value='other' name="gender" onChange={onGenderhandler} checked={data.gender==='other'}></input><label>Others</label>
                <button type="submit">Submit</button>
            </form>
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
                        list.map((row,index)=>
                        <tr key={index}>
                            <td>{row.firstName}</td>
                            <td>{row.lastName}</td>
                            <td>{row.age}</td>
                            <td>{row.gender}</td>
                            <td>
                                <input type="checkbox" checked={row.status} onChange={()=>{
                                    list.splice(index,1,{...row,status:!row.status})
                                    setList(list)}}></input>
                                <button type="button" disabled={!row.status} onClick={()=>{setList(list.filter((val,i)=>i!==index))}}>Delete</button>
                                <button type="button" disabled={!row.status} onClick={()=>{setEdit(row);setCheck(!check)}}>Edit</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>

        </>
    )
}
export default Form;
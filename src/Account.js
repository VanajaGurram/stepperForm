import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
function Account(){
    let dispatch=useDispatch()
    let data1=useSelector((state)=>{
        console.log("stateeee",state)
        // console.log("userrrr",state.user)
        return state.account;
    });
    // let userDetails=useSelector((state)=>{
    //     console.log("userrrrr",state.user)
    //     return state.user.users
    // })
    return(
        <>
        <h1>Account detailss</h1>``
        <h1>count-{data1.counter}</h1>
        <table>
            <thead>
                <tr>
                    <th>Balance</th>
                    <th>User Name</th>
                    <th>mobile</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{data1.balance}</td>
                    <td>{data1.fullName}</td>
                    <td>{data1.mobile}</td>
                </tr>
            </tbody>
        </table>
        {/* <h4>User details</h4>
        <table>
            <thead>
                <th>Name</th>
                <th>Age</th>
                <th>Action</th>
            </thead>
            <tbody>
                {
                    userDetails.map((row,index)=>
                    <tr key={index}>
                        <td>{row.name}</td>
                        <td>{row.age}</td>
                        <td>
                            <button type="button" onClick={()=>dispatch({type:"delete",payload:index})}>Delete</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table> */}

        </>
    )
}
export default Account;
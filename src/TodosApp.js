import { useState } from "react";
import { useDispatch } from "react-redux";

function TodosApp(){
    const dispatch=useDispatch()
    const [todoTitle,setTodoTitle]=useState()
    const handleTodo=()=>{
        if(todoTitle.trim()){
            const newTodo={
                title:todoTitle
            }
            dispatch({type:payload})
        }
    }
        return(
        <div>
            <input type="text"></input>
            <button>Add</button>
        </div>
    )
}
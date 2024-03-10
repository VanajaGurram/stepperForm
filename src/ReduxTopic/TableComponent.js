import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableComponent2 from './TableComponent2'
import { stepDeleteMany } from './Store/actions'

function TableComponent() {
    const dispatch=useDispatch()
    const list=useSelector((state)=>state.stepper.stepData)
  return (
    <div>
        <button onClick={()=>dispatch(stepDeleteMany())}>Delete</button>
           <table>
            <thead>
                <th>Delete</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Age</th>
                <th>State</th>
                <th>Distric</th>
                <th>Village</th>
                <th>Contact</th>
                <th>Action</th>
            </thead>
            <tbody>
                {
                    list.map((row,index)=>
                    <tr key={index}>
                        <TableComponent2 uid={row.uid} index={index}/>
                    </tr>)
                }
            </tbody>
           </table>
    </div>
  )
}

export default React.memo(TableComponent)
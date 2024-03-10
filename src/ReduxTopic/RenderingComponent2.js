import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderingComponent3 from './RenderingComponent3'
import { deleteData } from './Store/actions'

function RenderingComponent2() {
    const [searchItem, setSearchItem] = useState()
    const [pagination, setPagination] = useState(1)
    const [sortItem, setSortItem] = useState(false)
    const dispatch = useDispatch()
    const data = useSelector((state) => {
        console.log(state.data.data)
        return state.data.data
    })




    const searchData = searchItem ? data.filter((item) => Object.values(item)
        .some((value) => value.toString().toLowerCase().includes(searchItem.toLocaleLowerCase()))) : data
    const lastIndex = pagination * 9
    const firstIndex = lastIndex - 9
    const pageCount = Math.ceil(data.length / 9)
    const currentItem = searchData.slice(firstIndex, lastIndex)

    const Sortt = (item) => {
        if (!sortItem) {
            const sort = data.sort((a, b) => a[item]?.localeCompare(b[item]))
        }
        else {
            const sort = data.sort((a, b) => b[item]?.localeCompare(a[item]))
        }
    }
    const sorttNumber=(item)=>{
        if(!sortItem){
            const sort=data.sort((a,b) => +a[item]- (+b[item]))
        }
        else{
            const sort=data.sort((a,b) => +b[item]- (+a[item]))
        }
    }
    return (
        <>
            <button type='button' onClick={() => dispatch(deleteData())}>Delete</button>
            <input type='search' placeholder='searching...' onChange={(e) => setSearchItem(e.target.value)} ></input>
            <div>

                <table>
                    <thead>
                        <th>Delete</th>
                        <th><button onClick={() => { setSortItem(!sortItem); Sortt("firstName") }}>FirstName</button></th>
                        <th><button onClick={() => { setSortItem(!sortItem); Sortt("lastName") }}>LastName</button></th>
                        <th><button onClick={()=>{setPagination(!sortItem);sorttNumber("age")}}>Age</button></th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {
                            currentItem.map((row, index) => (
                                <tr key={index}>
                                    <RenderingComponent3 row={row.uid} index={index} />
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
            <button onClick={() => setPagination(1)}>FirstPage</button>
            <button disabled={pagination === 1} onClick={() => setPagination((val) => val - 1)}> - </button>
            <button onClick={() => setPagination((val) => val + 1)}> + </button>
            <button onClick={() => setPagination(pageCount)}>LastPage</button>
        </>
    )
}

export default React.memo(RenderingComponent2)
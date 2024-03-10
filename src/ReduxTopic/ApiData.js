import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { addPostData, addUidData, editPostData, getPostData } from './Store/actions'
import { Field, Formik ,Form} from 'formik'

function ApiData() {
    const dispatch=useDispatch()
    const posts=useSelector((state)=>{
        console.log("state",state.postReducer.posts)
        return state.postReducer.posts
    })
    // ?.filter((obj)=>obj.id<10)
    const post=useSelector((state)=>{
        console.log("stateObjectt",state.postReducer.post)
        return state.postReducer.post
    })
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then((res)=>{
            console.log(res.data)
            dispatch(getPostData(res.data))
            dispatch(addUidData(res.posts))
        })
    },[])
    const initialValues={
        title:post.title||"",
        body:post.body||""
    }
  return (
    <>
    <div>
        <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values)=>{
            console.log(values)
            dispatch(addPostData(values))
        }}
        >
{
    ({values})=>
    <Form>
        Title: <Field name='title'></Field><br/>
        Body: <Field name='body'></Field><br/>
        <button type='submit' >save</button>
    </Form>
}
        </Formik>
    </div>
    <div>
           <table>
            <thead>
                <th>UserId</th>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
                <th>Action</th>
            </thead>
            <tbody>
                {
                 posts.map((row,index)=>
                 <tr key={index}>
                    <td>{row.userId}</td>
                    <td>{row.id}</td>
                    <td>{row.title}</td>
                    <td>{row.body}</td>
                    <td>
                        <button type='button' onClick={()=>dispatch(editPostData(row))}>Edit</button>
                    </td>
                 </tr>)
                }
            </tbody>
           </table>
    </div>
    </>
  )
}

export default ApiData
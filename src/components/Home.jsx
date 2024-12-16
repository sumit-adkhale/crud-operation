import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    let [users,setUsers] =useState([])
    let [render,setRender]=useState(false)
    let [input,setInput]=useState({
        name:'',
        email:''
    })
    console.log(users);
    
    useEffect(()=>{
        try{
            const getAllData= async()=>{
                const res =await axios.get('http://localhost:8000/users')
                setUsers(res.data)
                setRender(false)
            };
            getAllData();
        }catch(error){
            console.log(error);
        }
    },[render])
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await axios.post('http://localhost:8000/users',input)
        setRender(true)
    }
    const handleDelete=async(id)=>{
        console.log(id);
        
        await axios.delete(`http://localhost:8000/users/${id}`)
        const getNewUser = users.filter((users)=>{
            return users.id != id
        })
        setUsers(getNewUser)
    }
  return (
    <>
      <div className="text-center bg-blue-600 mx-24 py-3 text-xl font-medium">
        React JS CRUD API
      </div>
      <div className="w-full flex">
        <div className="w-1/2">
          <form 
          onSubmit={handleSubmit}
          className="flex flex-col px-10 mt-10">
            <label htmlFor="" className="mt-3">
              Name
            </label>
            <input 
            name='name'
            onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} 
            value={input.name}
            type="text" className="text-black"/>
            <label htmlFor="" className="mt-3">
              Email
            </label>
            <input
            name="email"
            onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
            value={input.email}
            type="text" className="text-black"/>
            <button className="mt-3 bg-emerald-600 w-24 text-center rounded py-1">
              Sumbit
            </button>
          </form>
        </div>
        <div className="w-1/2">
          <div className="flex justify-between items-center px-10 mt-14">
            <div className="flex justify-between w-[40%] items-center">
              <h1>ID</h1>
              <h1>Name</h1>
              <h1>Email</h1>
            </div>
            <div className="flex justify-between w-[30%]">
              <h1>Update</h1>
              <h1>Delete</h1>
            </div>
          </div>
          <hr />
          {users.map((data,i)=>{
               return <div key={i} className="flex justify-between px-10 my-3">
                <div className="flex justify-between w-[60%] items-center">
                  <h1>{i+1}</h1>
                  <h1>{data.name}</h1>
                  <h1>{data.email}</h1>
                </div>
                <div className="flex justify-between w-[30%] items-center">
                  <Link to={`/edit/${data.id}`}><button className="bg-blue-600 px-2 rounded">{"Edit"}</button></Link>
                  <button 
                  onClick={()=>handleDelete(data.id)}
                  className="bg-red-600 px-2 rounded ml-14">Remove</button>
                </div>
              </div>
          })}
          <hr />
        </div>
      </div>
    </>
  );
}

export default Home;

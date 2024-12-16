import axios from "axios";
import React,{useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";

const Edit = () => {
    const {id}=useParams()
    const navigate=useNavigate()

    let [input,setInput]=useState({
      name:'',
      email:''
  })

    useEffect(()=>{
      try{
        const getSingleRecord=async()=>{
          const res= await axios.get(`http://localhost:8000/users/${id}`)
          setInput(res.data)
        }
        getSingleRecord()
      }catch(error){
        console.log(error);
      }
    },[])

    const handleSubmit=async(e)=>{
      e.preventDefault()
      await axios.put(`http://localhost:8000/users/${id}`,input)
      navigate('/')
  }
  return (
    <>
      <div className="text-center bg-blue-600 mx-24 py-3 text-xl font-medium">
        React JS CRUD API
      </div>
      <div className="w-1/2">
        <form onSubmit={handleSubmit} className="flex flex-col px-10 mt-10">
          <label htmlFor="" className="mt-3">
            Name
          </label>
          <input
            name="name"
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
            value={input.name}
            type="text"
            className="text-black"
          />
          <label htmlFor="" className="mt-3">
            Email
          </label>
          <input
            name="email"
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
            value={input.email}
            type="text"
            className="text-black"
          />
          <button className="mt-3 bg-emerald-600 w-24 text-center rounded py-1">
            Update
          </button>
          <button onClick={()=>navigate('/')} className="mt-3 bg-red-600 w-24 text-center rounded py-1">
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default Edit;

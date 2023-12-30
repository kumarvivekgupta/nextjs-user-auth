"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage() {
    const router=useRouter();
    const[user,setUser]=React.useState({
        email:"",
        password:"",
        username:""
    });

    const [buttonDisabled, setButtonDisabled]=React.useState(true);
    const [loading,setLoading]=React.useState(false);

    const onSignup = async ()=>{

    try {
            setLoading(true);
          const response=await  axios.post("/api/users/signup",user);
          console.log('singup success',response.data);
          router.push("/login");


    } catch (error:any) {
        setLoading(false);
        toast.error(error.message);
    }finally{
        setLoading(false);
    }

    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }else {
            setButtonDisabled(true);
        }
    },[user]);

    return (
       <div className="flex flex-col items-center">

        <h1>{loading?"Processing":"Signup"}</h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input   className="text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e)=>{setUser({...user,username:e.target.value})}}
        placeholder="username"
         />

        <label htmlFor="email">Email</label>
        <input  className="text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e)=>{setUser({...user,email:e.target.value})}}
        placeholder="email"
         />

        <label htmlFor="password">Password</label>
        <input   className="text-black"
        id="password"
        type="text"
        value={user.password}
        onChange={(e)=>{setUser({...user,password:e.target.value})}}
        placeholder="password"
         />

         <button className="p-2"
         onClick={onSignup}
         >{buttonDisabled?"No SignUp":"Signup here"}</button>
         <Link href="/login">Visit login page</Link>



       </div>
    )
}
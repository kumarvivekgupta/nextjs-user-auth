"use client";
import  axios  from "axios";
import { set } from "mongoose";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";

export default function ForgotPasswordPage(){

    const router=useRouter();

    const [token,setToken]=React.useState("");

    const[password,setPassword]=React.useState({
        password:"",
        cpassword:""
    });

  //  const [verified, setVerified]=React.useState(false);
    const [error,setError]=React.useState(false);

    const resetPassword=async()=>{
        try {
            if(password.password===password.cpassword){

                const resetPassword={
                    password:password.password,
                    token:token
                };
    
                await axios.post("/api/users/forgotpassword",{password:password.password,token:token});
                router.push("/login");

            }else {
                setError(true);
               
            }
           
           // setVerified(true);

            
        } catch (error:any) {
            setError(true);
            
        }
    }

    useEffect(()=>{
       const token=window.location.search.split("=")[1];
       setToken(token||"");
    },[]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Reset Password</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            <label htmlFor="email">Password</label>
        <input  className="text-black"
        id="password"
        type="text"
        value={password.password}
        onChange={(e)=>{setPassword({...password,password:e.target.value})}}
        placeholder="password"
         />

        <label htmlFor="password">Confirm Password</label>
        <input  className="text-black"
        id="cpassword"
        type="text"
        value={password.cpassword}
        onChange={(e)=>{setPassword({...password,cpassword:e.target.value})}}
        placeholder="cpassword"
         />

        <button onClick={resetPassword}
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Submit</button>

            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error Resetting Password</h2>
                    
                </div>
            )}
        </div>
    )
}

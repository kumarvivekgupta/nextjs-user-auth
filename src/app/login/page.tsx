"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { sendMail } from "@/helpers/mailer";


export default function LoginPage() {
    const router=useRouter();
    const[user,setUser]=React.useState({
        email:"",
        password:""
    });

    const [buttonDisabled ,setButtonDisabled]=React.useState(false);

    const [loading,setLoading]=React.useState(false);

    const onLogin = async ()=>{

        try {
            setLoading(true);
            const response =await axios.post("/api/users/login",user);

            console.log("login successfull",response);
            router.push("/profile");

            
        } catch (error:any) {
            console.log("login failed",error.message);
        }finally{
            setLoading(false);
        }

    }

    const onForgotPassword=async ()=>{
        try {

           await axios.post("/api/users/resetpassword",{email:user.email})
            setLoading(true);
        
        } catch (error:any) {
        console.log("please click again",error.message);
        }finally{
            setLoading(false);
        }
    }

    return (
       <div className="flex flex-col items-center">

        <h1>{loading?"Processing":"Login"}</h1>
        <hr />
       

        <label htmlFor="email">Email</label>
        <input  className="text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e)=>{setUser({...user,email:e.target.value})}}
        placeholder="email"
         />

        <label htmlFor="password">Password</label>
        <input  className="text-black"
        id="password"
        type="text"
        value={user.password}
        onChange={(e)=>{setUser({...user,password:e.target.value})}}
        placeholder="password"
         />

         <button className="p-2"
         onClick={onLogin}
         >Login here</button>
         <Link href="/signup">Visit Signup page</Link>

         <button className="p-2"
         onClick={onForgotPassword}
         >Forgot Password</button>





       </div>
    )
}
"use client"
import axios from "axios";
import React from "react";

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfilePage() { 
    const router=useRouter();

    const [data,setData]=React.useState("nothing");

    const logout = async ()=>{
        try {

           await axios.get("/api/users/logout");
           console.log('logout successfull');
           router.push("/login");

            
        } catch (error:any) {
            console.log("error",error.message);
        }
    }

    const getUserDetails =async ()=>{
        const res=await axios.get("/api/users/me");

        setData(res.data.data._id);

        console.log(res.data);
    }
    return (
        <div>
        <h1>Profile</h1>
        <hr />
        <p>Profile Page</p>
        <h2 className="padding rounded bg-green-500">{data==='nothing'?"NOthing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr />
        <button onClick={logout}
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Logout</button>

        <button onClick={getUserDetails}
         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">Get User Details</button>
        </div>

    )
};
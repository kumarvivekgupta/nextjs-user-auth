"use client";
import  axios  from "axios";
import Link from "next/link";
import React, { useEffect } from "react";

export default function VerifyEmailPage(){

    const [token,setToken]=React.useState("");

    const [verified, setVerified]=React.useState(false);
    const [error,setError]=React.useState(false);

    const verifyEmail=async()=>{
        try {

            await axios.post("/api/users/verifyemail",{token});
            setVerified(true);

            
        } catch (error:any) {
            setError(true);
            
        }
    }

    useEffect(()=>{
        if(token.length>0){
            verifyEmail();
        }
    },[token]);
    useEffect(()=>{
       const token=window.location.search.split("=")[1];
       setToken(token||"");
    },[]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
                </div>
            )}
        </div>
    )
}

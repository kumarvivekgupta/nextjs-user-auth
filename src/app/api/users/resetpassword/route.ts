import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"
import { sendMail } from "@/helpers/mailer";


connect();

export async function POST(request:NextRequest){

    try {

        const reqBody=await request.json();
        const {email}=reqBody;
       const user=await  User.findOne({email:email});

       if(!user){
        return NextResponse.json({message:"no user found"},{status:400});
       }
       console.log('reset',user);
       
       await sendMail({email,emailType:"RESET",userID:user._id});


       

       return NextResponse.json({message:"Password Reset Email Sent"},{status:200});
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }

}

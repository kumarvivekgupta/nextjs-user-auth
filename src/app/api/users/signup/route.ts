import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";




connect();

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json();
        const {username,email,password}=reqBody;

        console.log(reqBody);

        //check user exists
      const user= await  User.findOne({email});

      if(user){
        return NextResponse.json({error:""},{status:400});
      }

      //hash password
      const salt=await bcryptjs.genSalt(10);
      const hashedPassword=await bcryptjs.hash(password,salt);

      const newUser=new User({
        username,
        email,
        password:hashedPassword
      });
      const savedUser=await newUser.save();
      console.log(savedUser);

      //send Email
      await sendMail({email,emailType:"VERIFY",userID:savedUser._id});

      return NextResponse.json({message:"User created successfully",success:true,savedUser},{status:200});

    } catch (error:any) {
       return NextResponse.json({error:error.message},{status:500}); 
    }
}
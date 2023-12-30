import  nodemailer  from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';


export const sendMail =async ({email, emailType,userID}:any)=>{

    try {

        const hashedToken=await bcryptjs.hash(userID.toString(),10);

        if(emailType==='VERIFY'){
            await User.findByIdAndUpdate(userID,{verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+3600000});
        }else if(emailType === 'RESET'){

            await User.findByIdAndUpdate(userID,{forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now()+3600000});
        }

       const transporter= nodemailer.createTransport({
       
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "d00f23230f4b03",
              pass: "f12b24d6d0fa09"
            }
            //TODO add these to env files
        
       });
       const mailOptions={
        from:'abc@gmail.com',
        to:email,
        subject:emailType==='VERIFY'?"Verify your email":"Reset Your password",
        html :`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`
       };
       const mailresponse=await transporter.sendMail(mailOptions);

       return mailresponse;

       
        
    } catch (error:any) {
       throw new Error(error.message); 
    }
}

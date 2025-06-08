import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const mailSender = async(email : string , title : string , body : string) =>{
    try{
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASSWORD
            }
        });
       
        const info = await transporter.sendMail({
            from : `UrbanRyde | Shashwat <${process.env.MAIL_USER}>`,
            to : email , 
            subject : title,
            html : body
        });
        console.log("Message sent : " , info.messageId)
    }catch(err){
        console.log('Error while sending mail ' , err)
    }
}

export {mailSender}
import nodemailer from "nodemailer";
import { Request,Response } from "express";
import "dotenv/config";

export async function mailer(mailTo: string, name: string) {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 2525,
      secure: false,
      auth: {
        user: process.env.USER,

        pass: process.env.PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: "kopiras609@3dinews.com",
      to: mailTo,
      subject: "Message Received ✔",
      text: `Received your message at ${new Date().toDateString()}. 
    Thank you ${name} for showing your interest on me. I will look through your message and contact you back as soon as possible.
    sincerely,
    Nabin Dhital`,
      html: `Received your message at <b>${new Date().toDateString()}.</b><br/><br />
    Thank you <b>${name}</b> for showing your interest on me. <br/><br/>I will look through your message and contact you back as soon as possible.<br/><br />
    <i>Sincerely</i>,<br/>
    <i>Nabin Dhital</i><br/>`,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
export async function mailerAdmin({name,email,message}:{name:string,email:string,message:string}) {
  console.log(name,email,message)
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 2525,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: "kopiras609@3dinews.com",
      to: process.env.EMAIL,
      subject: "Message Received ✔",
      text: `Received message at ${new Date().toDateString()}.
        Sender Name: ${name} , email Address: ${email} ,[ ${message} ]`,
      html: `Received message at <b>${new Date().toDateString()}.</b><br/><br />
      Sender Name: ${name} ,<br/> email Address: ${email} <br/> ,[ ${message} ] `,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

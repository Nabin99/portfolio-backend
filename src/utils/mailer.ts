import nodemailer from "nodemailer";

export async function mailer(mailTo: string, name: string) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: "b3ec3b642b334c",
        pass: "e27dc421b1d704",
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

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

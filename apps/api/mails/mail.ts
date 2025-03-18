import { secret } from "encore.dev/config";

import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: secret("MAIL_TOKEN")(),
});

const sentFrom = new Sender("fixoy95918@isorax.com", "Shelters Support");

const recipients = [new Recipient("alfabravo9@gmail.com", "Bohdan")];

const htmlContent = `
  <p>Hey there!</p>
  <p>Welcome to Your Business, we're happy to have you here!</p>
  <p>You'll be happy to know that your free trial awaits, all you need to do is head to your account, log in and start playing.</p>
  <p>Remember to check out our guides and contact support if you need anything.</p>
  <br>
  <p>Regards,</p>
  <p>The Your Business Team</p>
`;

const emailParams = new EmailParams()
  .setFrom(sentFrom)
  .setTo(recipients)
  .setReplyTo(sentFrom)
  .setSubject("Welcome! Your free trial is ready.")
  .setHtml(htmlContent)
  .setText(
    "Hey there! Welcome to Your Business, we're happy to have you here! You'll be happy to know that your free trial awaits, all you need to do is head to your account, log in and start playing. Remember to check out our guides and contact support if you need anything. Regards, The Your Business Team"
  );

mailerSend.email
  .send(emailParams)
  .then((response) => {
    console.log("Email sent successfully:", response);
  })
  .catch((error) => {
    console.error("Error sending email:", error);
  });

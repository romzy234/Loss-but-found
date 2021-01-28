const nodemailer = require('nodemailer');
const { config } = require('../config.config');
const fs = require('fs');

const verify = async (email, keys) =>{
      let posterman = {
        user : config.mail.user,
        pass : config.mail.pass
      }

     var transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      secure: config.mail.secure,
      auth: {
          user: posterman.user,
          pass: posterman.pass
      }
  });

  { 
      console.log('from nodemailer');
      const mailOptions = {
          from:`Cyril` + posterman.user,
          to:  email,
          subject: 'Verify Email ',
          html: ` <p>Please Verify Your Email Address Please Follow this URl 'https://loaclhost:3000/verification/${keys}/'</p>`
};
return transporter.sendMail(mailOptions, (error, data) => {
  if(data){
    fs.appendFile("../logs/sentMail.log", data.response + ', -- HIGH --' + ' - ' + ',' + email + ' this was inital by the user To Verify His Mail' + ',' + '\n', (err) => { 
        if (err) 
          console.log(err);  
      });
      return
}
if (error) {
    fs.appendFile("../logs/failMail.log", error + ',' + ' -- HIGH --' + ',' + email + ',' + '\n', (err) => { 
        if (err) 
          console.log(err);  
      });
    return
}
});
};
    }

    // verify('cyrilogoh@gmail.com', 'iclcbjs7ujbs787sus8si');
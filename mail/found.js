const nodemailer = require('nodemailer');
const { config } = require('../config.config');
const fs = require('fs');

const customMail = async (email, subject,header,name,ms1,ms2,sendermail,perview,authkey) =>{
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
          subject: subject,
          html: ` `
};
return transporter.sendMail(mailOptions, (error, data) => {
  if(data){
    fs.appendFile("./logs/sentMail.log", data.response + ',' + ' - ' + ',' + email + ' this was inital by the user' + ',' + '\n', (err) => { 
        if (err) 
          console.log(err);  
      });
      return
}
if (error) {
    fs.appendFile("./logs/failMail.log", error + ',' + ' - ' + ',' + email + ',' + '\n', (err) => { 
        if (err) 
          console.log(err);  
      });
    return
}
});
};
    }

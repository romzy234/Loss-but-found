const nodemailer = require('nodemailer');
const { config } = require('../config.config');
const fs = require('fs');

exports.Welcome = async (email) =>{
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
          from:`Cyril From Test  ` + posterman.user,
          to:  email,
          subject: 'Welcome To Our Application ',
          html: ` <p>Thanks For Signing up </p>`
};
return transporter.sendMail(mailOptions, (error, data) => {
  if(data){
    fs.appendFile("./logs/sentMail.log", data.response + ', -- LOW --' + ' - ' + ',' + email + ' this was inital by the user To Verify His Mail' + ',' + '\n', (err) => { 
        if (err) 
          console.log(err);  
      });
      return
}
if (error) {
    fs.appendFile("./logs/failMail.log", error + ',' + ' -- HIGH --' + ',' + email + ',' + '\n', (err) => { 
        if (err) 
          console.log(err);  
      });
    return
}
});
};

}

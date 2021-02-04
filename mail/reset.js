const nodemailer = require('nodemailer');
const { config } = require('../config.config');
const fs = require('fs');

exports.resetP = async (email, id, salt, time, hash) =>{
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
      const mailOptions = {
          from:`Cyril` + posterman.user,
          to:  email,
          subject: 'Reset Password ',
          html: ` <p>Please Follow this URl 'https://${config.siteName}/reset/${id}/${salt}/${time}/${hash}' to reset your password </p>`
};
return transporter.sendMail(mailOptions, (error, data) => {
  if(data){
    fs.appendFile("./logs/sentMail.log", data.response + ', -- HIGH --' + ' - ' + ',' + email + ' this was inital by the user To Reset His Mail' + ',' + '\n', (err) => { 
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

// console.log(`test work ID = ${keys} and ${email}`);
}

    // verify('cyrilogoh@gmail.com', 'iclcbjs7ujbs787sus8si');
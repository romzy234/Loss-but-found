const nodemailer = require('nodemailer');
const { config } = require('../config.config');

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
  if (error) {
      console.log(error + email + 'custom')
      return
  }
});
};
    }

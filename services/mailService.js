const nodemailer = require('nodemailer')

class MailingService{
    constructor(){
        this.transport = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth:{
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD
            }
        })
        
    }
    async sendmail(mail){
        const result = await this.transport.sendMail(mail)
        return result
    }


}


module.exports = MailingService
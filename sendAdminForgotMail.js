const MailGen = require('mailgen')
const sgMail = require('@sendgrid/mail')
const { sendGridKey } = require('./config/keys')

require('dotenv').config()

const mailGenerator = new MailGen({
    theme: 'salted',
    product: {
        name: 'Acadatrends',
        link: 'http://www.acadatrends.com/',
        logo: 'https://res.cloudinary.com/chukwuma/image/upload/v1588814642/logo-acada-black.5300322f.jpg'
    },
})


const sendMail = async (mail, name, tokenUrl) => {
    const email = {
        body: {
            name: name,
            intro: `Forgot your password? No worries, we've got you fully covered <br />
             Please kindly click on the <b>Reset password</b> link below to reset your password.`,
            action: {
                // instructions: 'Please click the button below to perform an action',
                button: {
                    color: '#007bff',
                    text: 'Reset Password',
                    link: tokenUrl,
                },
            },
        },
    }

    const emailTemplate = mailGenerator.generate(email)
    require('fs').writeFileSync('sendAdminForgotMail.html', emailTemplate, 'utf8')
    const msg = {
        to: mail,
        from: 'acadatrendstech@gmail.com',
        subject: 'Forget Password',
        html: emailTemplate,
    }
    try {
        sgMail.setApiKey(sendGridKey)
        sgMail.send(msg).then(() => {
            console.log('Message sent')
        }).catch((error) => {
            console.log(error.response.body)
        })

    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = sendMail
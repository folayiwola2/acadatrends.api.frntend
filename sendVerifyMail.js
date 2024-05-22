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


const sendVerifyMail = async (mail, name, tokenUrl) => {
    const email = {
        body: {
            name: name,
            intro: `<p> Thank you for creating an Account on <b>Acadatrends</b>. <br />
            You're receiving this e-mail because your account has not been verified.
            Kindly click the <b>Verify button to verify your account.</b>
            </p>.`,
            action: {
                // instructions: 'Please click the button below to perform an action',
                button: {
                    color: '#007bff',
                    text: 'Verify Account',
                    link: tokenUrl,
                },
            },
        },
    }

    const emailTemplate = mailGenerator.generate(email)
    require('fs').writeFileSync('verify.html', emailTemplate, 'utf8')
    const msg = {
        to: mail,
        from: 'acadatrendstech@gmail.com',
        subject: 'Account Verification',
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


module.exports = sendVerifyMail
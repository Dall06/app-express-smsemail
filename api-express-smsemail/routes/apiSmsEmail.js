const express = require('express');//Manda llamar modulo de express
const router = express.Router();//Se instancia la libreria de router

/*-----------------------------SMS------------------------------------*/
router.post('/SendSms', (req, res, next) =>{
    var sms = req.body;
    
    const Nexmo = require('nexmo')

    const nexmo = new Nexmo({
        apiKey: "",
        apiSecret: ""
    })

    const from = "11111"
    const to = "52" + sms.To;
    const text = sms.Body;

    nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if(err){
            console.log(err);
            res.send(JSON.stringify(err));
        }
        else{
            if(responseData.messages[0]['status'] === "0"){
                res.send(JSON.stringify("Message sent successfully."))
                console.log("Message sent successfully.");
            }
            else{
                res.send(JSON.stringify(`Message failed with error: ${responseData.messages[0]['error-text']}`))
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
})

/*-----------------------------EMAIL------------------------------------*/
router.post('/SendMail', (req, res, next) => {
    var mail = req.body;

    var nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: 'Outlook365', // https://nodemailer.com/smtp/well-known/
        auth: {
            user: '', //cuenta de correo electronico
            pass: ''
        }
    });

    transporter.sendMail({
        to: mail.To, 
        subject: mail.Subject, 
        text: mail.Body, 
        html: mail.Body

    }).then((result) => {
        console.log(result);
        res.send(JSON.stringify("Message sent successfully."));

    }).catch((err) => {
        console.log(err);
        res.send(JSON.stringify(err));
    })
})

module.exports = router;
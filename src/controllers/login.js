
const twilio = require('twilio');
const accountSid = 'ACffd704d837094070829e396cf42ee3e2';
const authToken = '31a3226d0ce2394fdbcd4051fd8fed2b';


const config = require("../config/authConfig");
var jwt = require("jsonwebtoken");

const client = twilio(accountSid, authToken);
const otpController = require("./otp")
const customerController = require("./customer")
const driverController = require("./driver")

const sendVerificationCode = (phone, code) => {
    return client.messages
        .create({
            body: `Your verification code is ${code}`,
            from: '+12542562304',
            to: phone
        });
}


const verificationCode = Math.floor(100000 + Math.random() * 900000)

module.exports = {
    custoemrlogin: async (req, res) => {
        try {
            const phone = req.body.phone_no;
            if (req.body.hasOwnProperty('otp')) {
                const otp = req.body.otp;
                let otpres = await otpController.getOTP(phone)
                if (otp === otpres?.otp) {
                    let singn = await customerController.singup(req.body)
                    console.log(singn)
                    var token = jwt.sign({ phone_no: phone, flag: "Customer" }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });
                    return res.status(200).send({
                        status: true,
                        phone_no: phone,
                        type: "Customer",
                        accessToken: token
                    });
                } else {
                    return res.status(400).send({
                        message: "Error",
                        status: false,
                        data: "Please Enter Valid OTP"
                    })
                }
            } else {
                await otpController.sendOTP(phone, verificationCode)
                sendVerificationCode(phone, verificationCode)
                    .then(message => {
                        return res.status(200).send({
                            message: "OTP SEND",
                            status: true
                        });
                    })
                    .catch(error => {
                        return res.status(400).send({
                            message: "Error",
                            status: false,
                            data: error
                        })
                    })
            }

        }
        catch (error) {
            return res.status(400).send({
                message: "Error",
                status: false,
                data: error
            })

        }
    },
    driverLogin: async (req, res) => {
        try {
            const phone = req.body.phone_no;
            if (req.body.hasOwnProperty('otp')) {
                const otp = req?.body?.otp;
                let otpres = await otpController.getOTP(phone)
                console.log(otpres?.otp)
                if (otp === otpres?.otp) {
                    let singn = await driverController.singup(req.body)
                    console.log(singn)
                    var token = jwt.sign({ phone_no: phone, flag: "Driver" }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });
                    return res.status(200).send({
                        status: true,
                        phone_no: phone,
                        type: "Driver",
                        accessToken: token
                    });
                } else {
                    return res.status(400).send({
                        message: "Error",
                        status: false,
                        data: "Please Enter Valid OTP"
                    })
                }
            } else {
                await otpController.sendOTP(phone, verificationCode)
                sendVerificationCode(phone, verificationCode)
                    .then(message => {
                        return res.status(200).send({
                            message: "OTP SEND",
                            status: true
                        });
                    })
                    .catch(error => {
                        return res.status(400).send({
                            message: "Error",
                            status: false,
                            data: error
                        })
                    })
            }

        }
        catch (error) {
            return res.status(400).send({
                message: "Error",
                status: false,
                data: error
            })

        }
    }
}




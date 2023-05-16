
const twilio = require('twilio');
const accountSid = 'AC71d7398f42377b4797486bc2ab50a98b';
const authToken = 'a54a057a8379a46f6df6e4f498218efc';
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
            from: '+12705181163',
            to: phone
        });
}

const verificationCode = Math.floor(1000 + Math.random() * 9000);

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
            const type = "Driver"
            if (req.body.hasOwnProperty('otp')) {
                const otp = req.body.otp;
                let otpres = await otpController.getOTP(phone)
                if (otp === otpres?.otp) {
                    let singn = await driverController.singup(req.body)
                    console.log(singn)
                    var token = jwt.sign({ phone_no: phone, flag: type }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });
                    return res.status(200).send({
                        status: true,
                        phone_no: phone,
                        type: type,
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




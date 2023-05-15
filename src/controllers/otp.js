
const OTPTable = require("../models/otp")

module.exports = {
    sendOTP(phone_no, otp) {
        return new Promise(async (resolve, reject) => {
            try {
                const filter = { phone_no: phone_no }; 
                const update = { $set: { otp: otp } }; 
                const options = { upsert: true }; 
                const result = await OTPTable.updateOne(filter, update,options);
                resolve("success")
            }
            catch (error) {
                reject(error)
            }
        })
    },
    getOTP(phone_no) {
        return new Promise(async (resolve, reject) => {
            try {
                let otp = await OTPTable.findOne({ phone_no: phone_no });
                if (!otp) {
                    resolve({
                        message: "No Record Found",
                        status: false,
                    });
                } else {
                    resolve(otp);
                }
            } catch (error) {
                reject({
                    message: "Something Went Wrong",
                    status: false,
                    error: error,
                });
            }
        })
    }

}




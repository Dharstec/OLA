
const Customer = require("../models/customer")

module.exports = {
  singupMobile: async (req, res) => {
    try {
      const filter = { phone_no: req.body.phone_no };
      const update = { $set: { email: req?.body?.email, name: req?.body?.name } };
      const options = { upsert: true };
      let response = await Customer.updateOne(filter, update, options);
      return res.status(200).send({
        message: "Customer Update Successfully",
        status: true,
        data: response
      })
    }
    catch (error) {
      return res.status(400).send({
        message: "Error",
        status: false,
        data: error
      })

    }
  },
  singup: async (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const filter = { phone_no: body.phone_no };
        const update = { $set: { name: body?.name } };
        const options = { upsert: true };
        await Customer.updateOne(filter, update, options);
        resolve("Customer Created")
      }
      catch (error) {
        return res.status(400).send({
          message: "Error",
          status: false,
          data: error
        })

      }
    })

  },
  getProfile: async (req, res) => {
    console.log(req.phone_no)
    try {
      let datas = await Customer.find({ phone_no: req.phone_no })
      res.status(200).send({
        message: "Success",
        data: datas
      })

    } catch (error) {
      res.status(500).send({
        message: "Failed",
        data: `${error.message || error}`
      })
    }
  }
}




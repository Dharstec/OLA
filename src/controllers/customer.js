
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
  singup:async (body) =>{
      try {
        const filter = { phone_no: body.phone_no };
        const update = { $set: { name: body?.name } };
        const options = { upsert: true };
        await Customer.updateOne(filter, update, options);
        resolve("Customer Upsert")
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




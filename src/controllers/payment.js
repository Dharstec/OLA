
const Payment = require("../models/payment")
const axios = require('axios')
const fetchLocationName = async (lat,lng) => {
    await axios(
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyCBliCFrIdE6IVCUnfOFfZ9vAe3SEZANcM&result_type=administrative_area_level_3&sensor=true',
    )
      .then((response) => 
      console.log(JSON.stringify(response.data.results))
      )
      .then((responseJson) => {
        console.log(
          'ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson),
        );
      });
  };
module.exports = {
    getPayment: async (req, res) => {
        try {
            let datas = await Payment.find({ phone_no: req.phone_no })
            // fetchLocationName(11.023985739320594, 76.94840226134046)
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
    },
    postPayment: async (req, res) => {
        try {
            
            let payment_cr = new Payment(req.body);
            let response = await payment_cr.save();

            return res.status(200).send({
                message: "Payment Added",
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
    }
}




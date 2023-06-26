const Ride_Create = require("../models/ride_create")
const Rating = require("../models/rating")
//import stringify from 'json-stringify-safe';
//onst stringify = require("json-stringify-safe")

module.exports = {
    rating_for_driver: async (req, res) => {
        try{
        let rating = new Rating({
        ride_id:req.body.rade_id,
        star: req.body.star,
        rating_for: "Driver",
        driver_no:req.body.driver_no,
        customer_no: req.body.customer_no,
        feed_back:req.body.feed_back,
        points:req.body.points
        });
        let response = await rating.save();
        return res.status(200).send({
            message: "Rating Created",
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

    rating_for_customer: async (req, res) => {
        try{
            let rating = new Rating({
            ride_id:req.body.rade_id,
            star: req.body.star,
            rating_for: "Customer",
            driver_no:req.body.driver_no,
            customer_no: req.body.customer_no,
            feed_back:req.body.feed_back,
            points:req.body.points
            });
            let response = await rating.save();
            return res.status(200).send({
                message: "Rating Created",
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

    driver_cumulative: async(req, res) => {
        a = req.query.phone_no

        Rating.aggregate([
           {
               $match: { rating_for: "Driver", customer_no: a } // Filter based on the category field
             },
           {
             $group: {
               _id: null,
               averageRating: { $avg: '$star' }
             }
           }
         ]).exec(function(err, result) {
           if (err) {
               console.error(err);
               return;
             }
           console.log('Average rating:', result[0].averageRating);
           //res.send(result[0].averageRating)
           res.send('Average rating: ' + result[0].averageRating);
         })

    },

    customer_cumulative: async(req, res) => {
        //r1 = await Rating.find({rating_for: "Driver"})
        a = req.query.phone_no

         Rating.aggregate([
            {
                $match: { rating_for: "Customer", customer_no: a } // Filter based on the category field
              },
            {
              $group: {
                _id: null,
                averageRating: { $avg: '$star' }
              }
            }
          ]).exec(function(err, result) {
            if (err) {
                console.error(err);
                return;
              }
            console.log('Average rating:', result[0].averageRating);
            //res.send(result[0].averageRating)
            res.send('Average rating: ' + result[0].averageRating);
          })
    }

}
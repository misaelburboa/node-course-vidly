const express = require('express');
const mongoose = require('mongoose');
const Fawn = require('fawn');

const { Movie } = require('../model/Movie');
const { Rental, validate } = require('../model/Rental');
const { Customer } = require('../model/Customer');
const auth = require('../middleware/auth');

const router = express.Router();
Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');
  
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');
  
    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');
  
    let rental = new Rental({ 
      customer: {
        _id: customer._id,
        name: customer.name, 
        phone: customer.phone
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      }
    });
  

    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id: movie._id}, {
                $inc: { numberInStock: -1 }
            })
            .run();

        res.send(rental);
    } catch (ex) {
        console.log(ex);
        res.status(500).send('Something failed.');
    }
});

module.exports = router;
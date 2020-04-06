const Joi = require('joi');
const { movieSchema } = require('./Movie');
const { genreSchema } = require('./Genre');
const mongoose = require('mongoose');

const rentalSchema = {
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255
            },
            numberInStock: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            },
            dailyRentalRate: Number,
            genre: {
                type: genreSchema,
                required: true
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
};

function validateRental(rental) {
    const schema = {
      customerId: Joi.objectId().required(),
      movieId: Joi.objectId().required()
    };
  
    return Joi.validate(rental, schema);
  }
  
const Rental = mongoose.model('Rental', new mongoose.Schema(rentalSchema));

module.exports.Rental = Rental;
module.exports.rentalSchema = rentalSchema;
module.exports.validate = validateRental;
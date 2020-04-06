const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = {
    id: { type: mongoose.SchemaTypes.ObjectId },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
};

const Genre = mongoose.model('Genre', new mongoose.Schema(genreSchema));

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    
    return Joi.validate(genre, schema);
}

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
module.exports.validate = validateGenre;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.error('Could not connect to mongo', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({ isPublished: true})
        .or([
            { price: {$gte : 15} },
            { name: /.*by.*/ }
        ])
        .sort('-price')
        .select('name price');
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();
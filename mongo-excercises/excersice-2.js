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

async function getCourses2() {
    return await Course
        .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] }})
        .sort('-price')
        .select('name author price tags isPublished');
}

async function run() {
    const courses = await getCourses2();
    console.log (courses);
}

run();

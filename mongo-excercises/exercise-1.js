// Step 1
const mongoose = require('mongoose');

// Step 2
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.error('Could not connect to mongo', err));

// Step 3
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});

// Step 4
const Course = mongoose.model('Course', courseSchema);

// Step 5
async function getCourses() {
    return await Course
    .find({isPublished: true, tags: 'backend'})
    .sort({name: 1})
    .select({name: 1, author: 1});

}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();


// Notes:
// step 1: Import the mongoose dependency
// step 2: Create the connection to mongodb
// step 3: Create the Schema (this is something such the Entity in doctrin as I understand)
// step 4: Create the Model
// step 5: Create the async function to retrieve the data




const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost/playground'; 
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.error('Could not connect to mongo', err));
 
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'monbile', 'network'],
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                // Do some async work
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});
 
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'Web',
        author: 'Mosh',
        tags: ['frontend'],
        isPublished: false,
        price: 15.8
    });

    try {
        await course.validate();
        const result = await course.save();
        console.log(result, "result");
    } catch(ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
}

createCourse();
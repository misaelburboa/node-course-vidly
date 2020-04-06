const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.error('Could not connect to mongo', err));

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    try {
        await course.validate(err => {
            if (err) {
                console.log(err);
            }
        });
        const result = await course.save();
        console.log(result, "result");
    } catch(ex) {
        console.log(ex.message);
    }
}

createCourse();

// async function getCourses() {
//     const courses = await Course
//         //.find({ price: { $gte: 10, $lte: 20 } })
//         //.find({price: {$in: [10, 15, 20]}})
//         //.find({author: 'Mosh', isPublished: true})
//         .find()
//         .or([{ author: 'Mosh' }, { isPublished: true }])
//         .and([{name: 'NodeJs Course'}])
//         .limit(10)
//         .sort({ name: 1 })
//         .select({ name: 1, tags: 1});
//     console.log(courses);
// }

async function getCoursesWithRegExp() {
    const courses = await Course
        //.find({ price: { $gte: 10, $lte: 20 } })
        //.find({price: {$in: [10, 15, 20]}})
        //.find({author: 'Mosh', isPublished: true})
        //Starts with Mosh
        // .find({ author: /^Mosh/ })
        //Ends with Mosh
        // .find({ author: /Burboa $/i })
        //Contains Mosh
        .find({ author: /.*Mosh.*/i})

        .limit(10)
        .sort({ name: 1 })
        .count();
        // .select({ name: 1, tags: 1, author: 1});
    console.log(courses);
}

async function getCoursesPagination() {
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses/?pageNumber=2&pageSize=10


    const courses = await Course
        .find({ author: /.*Mosh.*/i})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .count();
        // .select({ name: 1, tags: 1, author: 1});
    console.log(courses);
}
// getCoursesPagination();

async function updateCourseQueryFirst(id) {
    const course = await Course.findById(id);
    if (!course) return;

    course.set({
        isPublished: false,
        author: 'Another Author'
    });

    const result = await course.save();
    console.log(result);
}

// updateCourseQueryFirst('5e2058cc9e4d08add6d8c5e9');

async function updateCourseUpdateFirst(id) {
    // const result = await Course.update({ _id: id }, {
    //     $set: {
    //         author: 'Misael',
    //         isPublished: false
    //     }
    // });
    // console.log(result);

    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Caleb',
            isPublished: true
        }
    }, { new: true });
    console.log(course);
}

// updateCourseUpdateFirst('5e2058cc9e4d08add6d8c5e9');

async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id });
    // console.log(result);

    // const result = await Course.deleteMany({ _id: id });
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

// removeCourse('5e2059384b09989a8273d147');
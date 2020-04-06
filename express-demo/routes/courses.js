const Joi = require('joi');
const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
];

router.get('/', (req, res) => {
    console.log(courses);
    res.send(courses);
});

// /api/courses/1
router.get('/:id', (req, res) => {
    // res.send(req.params);
    // res.send(req.query);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given ID was not found');
    }

    res.send(course);
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given ID was not found');
    }

    const { error } = validateCourse(req.body);
    if (error) {
        // 400 Bad request
        return res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

router.delete('/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    console.log(course);
    if (!course) {
        return res.status(404).send('The course with the given ID was not found');
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

module.exports = router;
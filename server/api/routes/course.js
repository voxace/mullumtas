const Course = require('../../models/course');

module.exports = function (router) {
  // Get course by ID
  router.get('/course/:id', (req, res) => {
    Course.findById(req.params.id)
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err => res.status(500).json({
        message: 'Error finding course',
        error: err,
      }));
  });

  // Get course by title
  router.get('/course/title/:title', (req, res) => {
    Course.findOne({ title: req.params.title })
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err => res.status(500).json({
        message: 'Error finding course',
        error: err,
      }));
  });

  // Get course by short title
  router.get('/course/short/:title', (req, res) => {
    Course.findOne({ short: req.params.title })
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err => res.status(500).json({
        message: 'Error finding course',
        error: err,
      }));
  });

  // Get all courses
  router.get('/courses', (req, res) => {
    Course.find()
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err => res.status(500).json({
        message: 'Error finding courses',
        error: err,
      }));
  });

  // Get all units in a course
  router.get('/course/short/:title/units', (req, res) => {
    Course.findOne({ short: req.params.title })
      .populate('units')
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err => res.status(500).json({
        message: 'Error finding course',
        error: err,
      }));
  });

  // Create new course
  router.post('/course', (req, res) => {
    const course = new Course(req.body);
    course.save((err, user) => {
      if (err) return console.log(err);
      res.status(200).json(user);
    });
  });
};

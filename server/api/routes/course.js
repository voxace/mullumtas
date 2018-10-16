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
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({
        message: 'Error finding course',
        error: err,
      }));
  });

  // Get course by short title
  router.get('/course/short/:title', (req, res) => {
    Course.findOne({ short: req.params.title })
      .exec()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({
        message: 'Error finding course',
        error: err,
      }));
  });

  // Get all courses
  router.get('/courses', (req, res) => {
    Course.find()
      .sort('grade')
      .exec()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({
        message: 'Error finding courses',
        error: err,
      }));
  });

  // Get all units in a course
  router.get('/course/short/:title/units', (req, res) => {
    Course.findOne({ short: req.params.title })
      .populate({
        path: 'units',
        options: { sort: { order: 1 } },
        populate: {
          path: 'sections',
          options: { sort: { order: 1 } },
          populate: {
            path: 'resources',
            options: { sort: { order: 1 } },
          },
        },
      })
      .exec()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({
        message: 'Error finding course',
        error: err,
      }));
  });

  // Create new course
  router.post('/course/', (req, res) => {
    const course = new Course(req.body);
    course.save((err, data) => {
      if (err) {
        console.log(err.message);
        res.status(500).send({ error: 'Something went wrong!' });
      } else {
        res.status(200).json(data);
      }
    });
  });

  // Update course
  router.put('/course/:id', (req, res) => {
    const qry = { _id: req.params.id };
    const course = req.body;
    Course.update(qry, course, (err, response) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: 'Something went wrong!' });
      } else {
        res.status(200).json(response);
      }
    });
  });

  // Add unit to course
  router.patch('/course/:courseID/unit/:unitID', (req, res) => {
    Course.update(
      { _id: req.params.courseID },
      { $push: { units: req.params.unitID } },
      (err, response) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: 'Something went wrong!' });
        } else {
          res.status(200).json(response);
        }
      },
    );
  });

  // Toggle protected status
  router.patch('/course/:courseID/protected/:isProtected', (req, res) => {
    Course.update(
      { _id: req.params.courseID },
      { protected: req.params.isProtected },
      (err, response) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: 'Something went wrong!' });
        } else {
          res.status(200).json(response);
        }
      },
    );
  });
};

const Unit = require('../../models/unit');

module.exports = function (router) {
  // Get course by ID
  router.get('/unit/:id', (req, res) => {
    Unit.findById(req.params.id)
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err => res.status(500).json({
        message: 'Error finding course',
        error: err,
      }));
  });

  // Get course by title
  router.get('/unit/title/:title', (req, res) => {
    Unit.findOne({ title: req.params.title })
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err => res.status(500).json({
        message: 'Error finding unit',
        error: err,
      }));
  });

  // Create new course
  router.post('/unit', (req, res) => {
    const unit = new Unit(req.body);
    unit.save((err, user) => {
      if (err) return console.log(err);
      res.status(200).json(user);
    });
  });
};

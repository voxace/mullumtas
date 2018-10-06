const Unit = require('../../models/unit');

module.exports = function (router) {
  // Get course by ID
  router.get('/unit/:id', (req, res) => {
    Unit.findById(req.params.id)
      .exec()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({
        message: 'Error finding unit',
        error: err,
      }));
  });

  // Get course by title
  router.get('/unit/title/:title', (req, res) => {
    Unit.findOne({ title: req.params.title })
      .exec()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({
        message: 'Error finding unit',
        error: err,
      }));
  });

  // Get all sections in a unit
  router.get('/unit/:id/sections', (req, res) => {
    Unit.findById(req.params.id)
      .populate('sections')
      .exec()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({
        message: 'Error finding unit',
        error: err,
      }));
  });

  // Create new course
  router.post('/unit', (req, res) => {
    const unit = new Unit(req.body);
    unit.save((err, data) => {
      if (err) return console.log(err);
      res.status(200).json(data);
    });
  });
};

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
      .populate({ path: 'sections', options: { sort: { order: 1 } } })
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

  // Update course
  router.put('/unit/:id', (req, res) => {
    const qry = { _id: req.params.id };
    const unit = req.body;
    Unit.update(qry, unit, (err, response) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: 'Something went wrong!' });
      } else {
        res.status(200).json(response);
      }
    });
  });

  // Delete course
  router.delete('/unit/:id', (req, res) => {
    Unit.findById(req.params.id)
      .populate({
        path: 'sections',
        populate: {
          path: 'resources',
        },
      })
      .exec()
      .then((unit) => {
        unit.sections.forEach((section) => {
          section.resources.forEach((resource) => {
            Resource.deleteOne({ _id: resource._id }, (err) => {
              if (err) return handleError(err);
              console.log(`Deleted: ${resource.title}`);
            });
          });
          Section.deleteOne({ _id: section._id }, (err) => {
            if (err) return handleError(err);
            console.log(`Deleted: ${section.title}`);
          });
        });
        Unit.deleteOne({ _id: unit._id }, (err) => {
          if (err) return handleError(err);
          console.log(`Deleted: ${unit.title}`);
        });
        res.status(200).json('success');
      })
      .catch(err => res.status(500).json({
        message: 'Error deleting unit',
        error: err,
      }));
  });
};

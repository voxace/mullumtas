const Unit = require('../../models/unit');

module.exports = function (router) {
  // Get unit by ID
  router.get('/unit/:id', (req, res) => {
    Unit.findById(req.params.id)
      .populate({
        path: 'sections',
        options: { sort: { order: 1 } },
        populate: {
          path: 'resources',
          options: { sort: { order: 1 } },
        },
      })
      .exec()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({
        message: 'Error finding unit',
        error: err,
      }));
  });

  // Get unit by title
  router.get('/unit/title/:title', (req, res) => {
    Unit.findOne({ title: req.params.title })
      .populate({
        path: 'sections',
        options: { sort: { order: 1 } },
        populate: {
          path: 'resources',
          options: { sort: { order: 1 } },
        },
      })
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

  // Create new unit
  router.post('/unit', (req, res) => {
    const unit = new Unit(req.body);
    unit.save((err, data) => {
      if (err) return console.log(err);
      res.status(200).json(data);
    });
  });

  // Update unit
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

  // Add section to unit
  router.patch('/unit/:unitID/section/:sectionID', (req, res) => {
    Unit.update(
      { _id: req.params.unitID },
      { $push: { sections: req.params.sectionID } },
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

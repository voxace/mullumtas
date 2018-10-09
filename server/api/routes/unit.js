const Course = require('../../models/course');
const Unit = require('../../models/unit');
const Section = require('../../models/section');
const Resource = require('../../models/resource');

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

  // Delete unit
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
              console.log(`Deleted Resource: ${resource.title}`);
            });
          });
          Section.deleteOne({ _id: section._id }, (err) => {
            if (err) return handleError(err);
            console.log(`Deleted Section: ${section.title}`);
          });
        });
        Unit.deleteOne({ _id: unit._id }, (err) => {
          if (err) return handleError(err);
          console.log(`Deleted Unit: ${unit.title}`);
        });
        res.status(200).json('success');
      })
      .catch(err => res.status(500).json({
        message: 'Error deleting unit',
        error: err,
      }));
  });
};

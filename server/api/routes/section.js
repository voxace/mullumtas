const Course = require('../../models/course');
const Unit = require('../../models/unit');
const Section = require('../../models/section');
const Resource = require('../../models/resource');

module.exports = function (router) {
  // Get course by ID
  router.get('/section/:id', (req, res) => {
    Section.findById(req.params.id)
      .exec()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({
        message: 'Error finding section',
        error: err,
      }));
  });

  // Get all resources in a section
  router.get('/section/:id/resources', (req, res) => {
    Section.findById(req.params.id)
      .populate({ path: 'resources', options: { sort: { order: 1 } } })
      .exec()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({
        message: 'Error finding resources',
        error: err,
      }));
  });

  // Create new section
  router.post('/section', (req, res) => {
    const section = new Section(req.body);
    section.save((err, data) => {
      if (err) {
        console.log(err.message);
        res.status(500).send({ error: 'Something went wrong!' });
      } else {
        res.status(200).json(data);
      }
    });
  });

  // Update section
  router.put('/section/:id', (req, res) => {
    const qry = { _id: req.params.id };
    const section = req.body;
    Section.update(qry, section, (err, response) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: 'Something went wrong!' });
      } else {
        res.status(200).json(response);
      }
    });
  });

  // Add resource to section
  router.patch('/section/:sectionID/resource/:resourceID', (req, res) => {
    Section.update(
      { _id: req.params.sectionID },
      { $push: { resources: req.params.resourceID } },
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

  // Delete section
  router.delete('/section/:id', (req, res) => {
    Section.findById(req.params.id)
      .populate({ path: 'resources' })
      .exec()
      .then((section) => {
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
        res.status(200).json('success');
      })
      .catch(err => res.status(500).json({
        message: 'Error deleting section',
        error: err,
      }));
  });
};

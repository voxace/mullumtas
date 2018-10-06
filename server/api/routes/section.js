const Section = require('../../models/section');

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
      .populate('resources')
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
      if (err) return console.log(err);
      res.status(200).json(data);
    });
  });
};

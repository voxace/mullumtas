const Resource = require('../../models/resource');

module.exports = function (router) {
  // Get resource by ID
  router.get('/resource/:id', (req, res) => {
    Resource.findById(req.params.id)
      .exec()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({
        message: 'Error finding resource',
        error: err,
      }));
  });

  // Create new resource
  router.post('/resource', (req, res) => {
    const resource = new Resource(req.body);
    resource.save((err, data) => {
      if (err) {
        console.log(err.message);
        res.status(500).send({ error: 'Something went wrong!' });
      } else {
        res.status(200).json(data);
      }
    });
  });

  // Update resource
  router.put('/resource/:id', (req, res) => {
    const qry = { _id: req.params.id };
    const resource = req.body;
    Resource.update(qry, resource, (err, response) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: 'Something went wrong!' });
      } else {
        res.status(200).json(response);
      }
    });
  });
};

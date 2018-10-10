const request = require('request');
const Resource = require('../../models/resource');

function renderDoc(req, res, id) {
  request(
    `https://www.googleapis.com/drive/v3/files/${id}/export?mimeType=text%2Fhtml&key=AIzaSyD0_1oqZt3z5VQjlaPDJDbj1pG-O_yZeNc`,
    (error, response, body) => {
      console.log(body);
      if (!error && response.statusCode == 200) {
        res
          .set('Content-Type', 'text/html')
          .status(200)
          .send(body);
      }
    },
  );
}

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

  // Render resource
  router.get('/resource/:id/link', (req, res) => {
    Resource.findById(req.params.id)
      .exec()
      .then((data) => {
        renderDoc(req, res, data.link);
      })
      .catch(err => res.status(500).json({
        message: 'Error finding resource',
        error: err,
      }));
  });

  // Get all types
  router.get('/types', (req, res) => {
    res.status(200).json({
      doc: {
        title: 'Google Docs',
        icon: 'mdi-file-document-box',
        color: ['blue', 'white--text'],
      },
      slide: {
        title: 'Google Slides',
        icon: 'mdi-file-presentation-box',
        color: ['orange', 'lighten-1', 'white--text'],
      },
      quiz: {
        title: 'Google Forms',
        icon: 'mdi-file-question',
        color: ['blue', 'darken-2', 'white--text'],
      },
      url: {
        title: 'Link',
        icon: 'mdi-link',
        color: ['green', 'white--text'],
      },
    });
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

  // Delete resource
  router.delete('/resource/:id', (req, res) => {
    Resource.findById(req.params.id)
      .exec()
      .then((resource) => {
        Resource.deleteOne({ _id: resource._id }, (err) => {
          if (err) return handleError(err);
          console.log(`Deleted Resource: ${resource.title}`);
        });
        res.status(200).json('success');
      })
      .catch(err => res.status(500).json({
        message: 'Error deleting resource',
        error: err,
      }));
  });
};

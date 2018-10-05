const User = require('../../models/user');

module.exports = function (router) {
  // Get user by ID
  router.get('/user/:id', (req, res) => {
    User.findById(req.params.id)
      .exec()
      .then(docs => res.status(200).json(docs)) // pass docs back into response as json
      .catch(err => res.status(500).json({
        message: 'Error finding user',
        error: err,
      }));
  });

  // Get user by email
  router.get('/user/email/:email', (req, res) => {
    User.find({ email: req.params.email })
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err => res.status(500).json({
        message: 'Error finding user',
        error: err,
      }));
  });

  // Create new user
  router.post('/user', (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) return console.log(err);
      res.status(200).json(user);
    });
  });

  // Update user by ID
  router.put('/user/:id', (req, res) => {
    console.log(req.body);
    const qry = { _id: req.params.id };
    const doc = {
      // first: req.body.firstName,
      // last: req.body.lastName,
      // email: req.body.email,
      // password: req.body.password,
      isActive: req.body.isActive,
    };
    console.log(doc);
    User.update(qry, doc, (err, response) => {
      if (err) return console.log(err);
      res.status(200).json(response);
    });
  });
};

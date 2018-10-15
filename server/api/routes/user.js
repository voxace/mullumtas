const FormData = require('form-data');
const User = require('../../models/user');

module.exports = function (router) {
  router.post('/login', (req, res) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    console.log(req.body);

    const form = new FormData();
    form.append('username', username);
    form.append('password', password);

    form.submit(
      'https://web2.mullumbimb-h.schools.nsw.edu.au/portal/login/login',
      (err, response) => {
        if (err) {
          res.status(500).json({ message: 'Invalid username or password' });
        } else if (response.headers.location == '/portal/dashboard') {
          User.findOne({ detId: username })
            .exec()
            .then((user) => {
              console.log(`${user.detId} logged in`);
              res.header('Access-Control-Allow-Origin', '*');
              res.header('Access-Control-Allow-Headers', 'X-Requested-With');
              res.status(200).json(user);
            })
            .catch((err) => {
              res.status(500).json({ message: 'Error finding user' });
            });
        } else {
          res.status(500).json({ message: 'Invalid username or password' });
        }
      },
    );
  });

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

  // Get user by course
  router.get('/user/course/:detId', (req, res) => {
    User.find({ courses: req.params.detId })
      .sort('detId')
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

  // Create new user add to course
  router.post('/user/course', (req, res) => {
    User.findOne({ detId: req.body.detId })
      .exec()
      .then((user) => {
        if (user) {
          if (user.courses.indexOf(req.body.courses[0]) === -1) {
            user.courses.push(req.body.courses[0]);
          }
        } else {
          user = new User(req.body);
        }
        user.save((err, user) => {
          if (err) return console.log(err);
          console.log(user);
          res.status(200).json(user);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: 'Error finding user',
          error: err,
        });
      });
  });

  // Update user by ID
  router.put('/user/:id', (req, res) => {
    console.log(req.body);
    const qry = { _id: req.params.id };
    const doc = {
      isActive: req.body.isActive,
    };
    console.log(doc);
    User.update(qry, doc, (err, response) => {
      if (err) return console.log(err);
      res.status(200).json(response);
    });
  });

  // Remove user from course
  router.delete('/user/:detId/course/:courseId', (req, res) => {
    User.findOne({ detId: req.params.detId })
      .exec()
      .then((user) => {
        console.log(user);
        const index = user.courses.indexOf(req.params.courseId);
        if (index > -1) {
          user.courses.splice(index, 1);
        }
        if (user.courses.length > 0) {
          const qry = { _id: req.params.id };
          const doc = {
            isActive: req.body.isActive,
          };
          console.log(doc);
          user.save((err, user) => {
            if (err) return console.log(err);
            console.log(`removed course from${user}`);
            res.status(200).json(user);
          });
        } else {
          user.delete((err, user) => {
            if (err) return console.log(err);
            console.log(`deleted${user}`);
            res.status(200).json(user);
          });
        }
      })
      .catch(err => res.status(500).json({
        message: 'Error deleting resource',
        error: err,
      }));
  });
};

const Course = require('../../models/course');
const Unit = require('../../models/unit');
const Section = require('../../models/section');
const Resource = require('../../models/resource');

module.exports = function (router) {
  // Delete course
  router.delete('/course/:id', (req, res) => {
    Course.findById(req.params.id)
      .populate({
        path: 'units',
        populate: {
          path: 'sections',
          populate: {
            path: 'resources',
          },
        },
      })
      .exec()
      .then((course) => {
        course.units.forEach((unit) => {
          unit.sections.forEach((section) => {
            section.resources.forEach((resource) => {
              Resource.deleteOne({ _id: resource._id }, (err) => {
                if (err) return handleError(err);
                console.log(`Deleted Resource: ${resource.title}`);
              });
            });
            Section.deleteOne({ _id: section._id }, (err) => {
              if (err) return handleError(err);
              console.log(`Deleted Title: ${section.title}`);
            });
          });
          Unit.deleteOne({ _id: unit._id }, (err) => {
            if (err) return handleError(err);
            console.log(`Deleted Unit: ${unit.title}`);
          });
        });
        Course.deleteOne({ _id: course._id }, (err) => {
          if (err) return handleError(err);
          console.log(`Deleted Course: ${course.title}`);
        });
        res.status(200).json('success');
      })
      .catch(err => res.status(500).json({
        message: 'Error deleting course',
        error: err,
      }));
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

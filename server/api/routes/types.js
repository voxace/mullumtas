module.exports = function (router) {
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
      video: {
        title: 'Video',
        icon: 'mdi-video',
        color: ['purple', 'white--text'],
      },
    });
  });

  router.get('/types/list', (req, res) => {
    res.status(200).json([
      {
        title: 'Google Docs',
        type: 'doc',
      },
      {
        title: 'Google Slides',
        type: 'slide',
      },
      {
        title: 'Google Forms',
        type: 'quiz',
      },
      {
        title: 'Link',
        type: 'url',
      },
      {
        title: 'Video',
        type: 'video',
      },
    ]);
  });
};

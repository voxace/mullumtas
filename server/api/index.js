const express = require('express');

const router = express.Router();

require('./routes/user')(router);
require('./routes/course')(router);
require('./routes/unit')(router);

module.exports = router;

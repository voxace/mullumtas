const express = require('express');

const router = express.Router();

require('./routes/user')(router);
require('./routes/course')(router);
require('./routes/unit')(router);
require('./routes/section')(router);
require('./routes/resource')(router);
require('./routes/delete')(router);
require('./routes/types')(router);

module.exports = router;

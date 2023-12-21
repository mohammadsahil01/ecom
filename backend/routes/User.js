const express = require('express');
;
const { updateUser, fetchUserById } = require('../controller/User');


const router = express.Router();

router.get('/own',fetchUserById)
      .patch('/',updateUser)

exports.router = router;
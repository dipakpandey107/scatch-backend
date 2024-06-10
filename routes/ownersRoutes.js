const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send(' Hey its a Owners route');
});

module.exports = router;

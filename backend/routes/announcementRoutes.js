const express = require("express");
const { saveAnnouncement } = require("../controllers/announcementController");
const router = express.Router();

router.post("/", saveAnnouncement);

module.exports = router;

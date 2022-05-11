const router = require("express").Router();
const User = require("../models/User");
const Track = require("../models/Track");
const imageUploader = require("../config/cloudinary.images.config");
const trackUploader = require("../config/cloudinary.tracks.config");

router.get("/tracks/:id", (req, res, next) => {
  const id = req.params.id;

  if (id === "") {
    res.status(400).json({ message: "Provide id" });
    return;
  }

  Track.findById(id)
    .then((track) => {
      if (!track) {
        res.status(400).json({ message: "Track not found" });
        return;
      }

      res.status(200).json(track);
    })
    .catch((err) => next(err));
});

// Image upload on cloudinary
router.post("/imageUpload", imageUploader.single("fileUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ fileUrl: req.file.path });
});

// Track upload on cloudinary
router.post("/trackUpload", trackUploader.single("fileUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ fileUrl: req.file.path });
});

module.exports = router;

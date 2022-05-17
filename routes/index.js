const router = require("express").Router();
const User = require("../models/User");
const Track = require("../models/Track");
const { isAuthenticated } = require("../middleware/jwt");
const imageUploader = require("../config/cloudinary.images.config");
const trackUploader = require("../config/cloudinary.tracks.config");

// Get user by ID
router.get("/users/:id", isAuthenticated, (req, res, next) => {
    const id = req.params.id;

    if (id === "") {
        res.status(400).json({ message: "Please provide id" });
        return;
    }

    User.findById(id)
        .populate("tracks")
        .populate("likes")
        .populate("following")
        .populate("followers")
        .then((user) => {
            if (!user) {
                res.status(400).json({ message: "User not found." });
                return;
            }

            res.status(200).json(user);
        })
        .catch((err) => next(err));
});

// Get user by name
router.get("/users", (req, res, next) => {
    const name = req.query.name;

    if (name === "") {
        res.status(400).json({ message: "Please provide name" });
        return;
    }

    User.findOne({name: name})
        .populate("tracks")
        .populate("likes")
        .populate("following")
        .populate("followers")
        .then((user) => {
            if (!user) {
                res.status(400).json({ message: "User not found." });
                return;
            }

            res.status(200).json(user);
        })
        .catch((err) => next(err));
});

// Update user tracks
router.patch("/users/:id/tracks", (req, res, next) => {
    console.log("Update user tracks called", req.body);
    const id = req.params.id;
    const { tracks } = req.body;

    if (id === "" || tracks === undefined) {
        res.status(400).json({
            message: "Please provide id and tracks to update."
        });

        return;
    }

    User.findByIdAndUpdate(id, { tracks })
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    })
})

// Get track by ID
router.get("/tracks/:id", (req, res, next) => {
  const id = req.params.id;

  if (id === "") {
    res.status(400).json({ message: "Provide id" });
    return;
  }

  Track.findById(id)
    .then(track => {
      if (!track) {
        res.status(400).json({ message: "Track not found" });
        return;
      }

      res.status(200).json(track);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    })
});

// Create track
router.post("/tracks", (req, res, next) => {
    console.log("Create track called", req.body);
    const { name, tag, description, imageUrl, trackUrl } = req.body;

    if (name === "" || trackUrl === "") {
        res.status(400).json({
            message: "Please provide name and track to upload.",
        });

        return;
    };

    return Track.create({
        name,
        tag,
        description,
        imageUrl,
        trackUrl,
    })
    .then((createdTrack) => {
        const { name, tag, description, imageUrl, trackUrl, _id } = createdTrack;
        const track = { name, tag, description, imageUrl, trackUrl, _id };
        res.status(201).json({ track: track });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    });
});

// Image upload on cloudinary
router.post("/imageUpload", imageUploader.single("imageUrl"), (req, res, next) => {
    console.log("Upload image called", req.body);
    if (!req.file) {
        next(new Error("Image upload failed."));
        return;
    }

    res.json({ imageUrl: req.file.path });
});

// Track upload on cloudinary
router.post("/trackUpload", trackUploader.single("trackUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("Track upload failed."));
    return;
  }

  res.json({ trackUrl: req.file.path });
});

module.exports = router;

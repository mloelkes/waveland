const router = require("express").Router();
const User = require("../models/User");
const Track = require("../models/Track");

router.get("/users/:id", (req, res, next) => {
  const id = req.params.id;

  if (id === "") {
    res.status(400).json({ message: "Provide id" });
    return;
  }

  User.findById(id).then(user => {
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  })
});

router.get("/tracks/:id", (req, res, next) => {
  const id = req.params.id;

  if (id === "") {
    res.status(400).json({ message: "Provide id" });
    return;
  }

  Track.findById(id).then(track => {
    if (!track) {
      res.status(400).json({ message: "Track not found" });
      return;
    }
  })

  res.status(200).json(track);
});

module.exports = router;

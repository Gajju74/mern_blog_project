const express = require("express");
const router = express.Router();
const UserBlog = require("../models/UserBlog");

// POST endpoint for creating a new UserBlog entry
router.post("/createblog", async (req, res) => {
  try {
    await UserBlog.create({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.image,
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

// GET endpoint for fetching all UserBlog entries
router.get("/post", async (req, res) => {
  try {
    const data = await UserBlog.find({}).lean();
    const reversedData = data.reverse();
    res.json(reversedData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/post/:postId", async (req, res) => { // Add :postId parameter in the route
    try {
      const postId = req.params.postId; // Get postId from request parameters
      const data = await UserBlog.findById(postId).lean(); // Fetch data for the specific postId
      if (!data) {
        return res.status(404).json({ message: 'Post not found' }); // Handle case when post is not found
      }
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  });
  

// PUT endpoint for updating a UserBlog entry
router.put("/updateblog/:id", async (req, res) => {
  try {
    const updatedBlog = await UserBlog.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.image,
      },
      { new: true }
    ).lean();
    res.json(updatedBlog);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// DELETE endpoint for deleting a UserBlog entry
router.delete("/deleteblog/:id", async (req, res) => {
  try {
    await UserBlog.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

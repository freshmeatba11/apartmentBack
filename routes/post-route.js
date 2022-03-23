const router = require("express").Router();
const Post = require("../models").postModel;
const postValidation = require("../validation").postValidation;

router.use((req, res, next) => {
  console.log("A request is coming into api...");
  next();
});

router.get("/", (req, res) => {
  Post.find({})
    .populate("author", ["username", "email"])
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      res.status(500).send("Error!! Cannot get post!!");
    });
});

router.get("/:_id", (req, res) => {
  let { _id } = req.params;
  Post.findOne({ _id })
    .populate("author", ["username", "email"])
    .then((post) => {
      res.send(post);
    })
    .catch((e) => {
      res.send(e);
    });
});

router.post("/", async (req, res) => {
  // validate the inputs before making a new post
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { title, content, important } = req.body;
  if (req.user.isRoommate()) {
    return res.status(400).send("Only manager can write a new post.");
  }

  let newPost = new Post({
    title,
    content,
    important,
    author: req.user._id,
  });

  try {
    await newPost.save();
    res.status(200).send("New post has been saved.");
  } catch (err) {
    res.status(400).send("Cannot save post.");
  }
});

router.patch("/:_id", async (req, res) => {
  // validate the inputs before making a new post
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  let post = await Post.findOne({ _id });
  if (!post) {
    res.status(404);
    return res.json({
      success: false,
      message: "Post not found.",
    });
  }

  if (
    req.user.isAdmin() ||
    (post.author.equals(req.user._id) && req.user.isManager())
  ) {
    Post.findByIdAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then(() => {
        res.send("Post updated.");
      })
      .catch((e) => {
        res.send({
          success: false,
          message: e,
        });
      });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message: "Only the author of this post or web admin can edit this post.",
    });
  }
});

router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  let post = await Post.findOne({ _id });
  if (!post) {
    res.status(404);
    return res.json({
      success: false,
      message: "Post not found.",
    });
  }

  if (
    req.user.isAdmin() ||
    (post.author.equals(req.user._id) && req.user.isManager())
  ) {
    Post.deleteOne({ _id })
      .then(() => {
        res.send("Post deleted.");
      })
      .catch((e) => {
        res.send({
          success: false,
          message: e,
        });
      });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message:
        "Only the author of this post or web admin can delete this post.",
    });
  }
});

module.exports = router;

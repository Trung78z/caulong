const express = require("express");
const router = express.Router();
const { Joins, Posts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  try {
    const { PostId } = req.body;
    const UserId = req.user.id;
    if (!PostId) {
      res.json({ PostId: "undefine" });
    }
    if (!UserId) {
      res.json({ UserId: "undefine" });
    }
    const found = await Joins.findOne({
      where: { PostId: PostId, UserId: UserId },
    });
    if (!found) {
      await Joins.create({ PostId: PostId, UserId: UserId });
      res.json({ active: true });
    } else {
      await Joins.destroy({
        where: { PostId: PostId, UserId: UserId },
      });
      res.json({ active: false });
    }
  } catch (error) {
    res.json({ error: error });
  }
});
router.post("/accept", validateToken, async (req, res) => {
  const { PostId, JoinID } = req.body;

  const UserId = req.user.id;

  const post = await Posts.findOne({ where: { id: PostId } });
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  if (post.UserId !== UserId) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  try {
    await Joins.update(
      { active: true },
      {
        where: { id: JoinID },
      }
    );
    res.json({ active: true });
  } catch (error) {
    console.error("Error accepting user join request:", error);
    res.status(500).json({ error: "Internal server error", active: false });
  }
});
module.exports = router;

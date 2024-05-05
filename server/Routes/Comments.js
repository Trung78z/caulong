const express = require("express");
const router = express.Router();
const { Comments, Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({
    where: { PostId: postId },
    include: [
      {
        model: Users,
        attributes: ["firstname", "lastname"],
      },
    ],
  });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  try {
    const comment = req.body;
    const id = req.user.id;
    comment.UserId = id;
    await Comments.create(comment);
    const User = await Users.findByPk(id, {
      attributes: ["firstname", "lastname"],
    });
    res.json({ comment, User });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;

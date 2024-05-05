const Sequelize = require("sequelize");
const router = require("express").Router();
const { datablog } = require("../lib/data");
const { Posts, Joins, Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const post = await Posts.findAll({
    order: [["id", "DESC"]],
    limit: 10,
    include: [{ model: Joins }],
  });

  res.json(post);
});

router.get("/joined", validateToken, async (req, res) => {
  const likedPosts = await Joins.findAll({ where: { UserId: req.user.id } });
  res.json(likedPosts);
});

router.post("/", validateToken, async (req, res) => {
  try {
    const post = req.body;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.status(201).json({ body: "Post created" });
  } catch (error) {
    res.status(403).json({ error: "Error creating post" });
  }
});

router.get("/post", validateToken, async (req, res) => {
  try {
    const posts = datablog.map((post) => ({ ...post, UserId: req.user.id }));
    await Posts.bulkCreate(posts);
    res.status(201).json({ message: "Posts created" });
  } catch (error) {
    console.error("Error creating posts:", error);
    res.status(500).json({ error: "Error creating posts" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.findOne({
      where: { url: id },
      include: [
        {
          model: Joins,

          include: [
            {
              model: Users,
              attributes: ["firstname", "lastname"],
            },
          ],
        },
        {
          model: Users,
          attributes: ["firstname", "lastname"],
        },
      ],
    });
    res.json(post);
  } catch (error) {
    console.error("Error fetching post_id", error);
    res.status(500).json({ error: "Error fetching post post_id" });
  }
});

module.exports = router;

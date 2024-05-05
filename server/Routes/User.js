const router = require("express").Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user)
    return res.status(403).json({ error: "Username is not available" });
  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) return res.status(402).json({ error: "Password incorrect" });
    const accessToken = sign(
      { username: user.username, id: user.id },
      process.env.access_token_secert,
      { expiresIn: "20h" }
    );
    res
      .status(203)
      .json({ token: accessToken, username: username, id: user.id });
  });
});
router.post("/register", async (req, res) => {
  try {
    const { email, username, password, lastname, firstname } = req.body;
    const user = await Users.findOne({ where: { username: username } });
    if (user)
      return res
        .status(400)
        .json({ error: "Wrong Username And Password Combination" });
    await bcrypt.hash(password, 10).then(async (data) => {
      await Users.create({
        email: email,
        username: username,
        password: data,
        lastname: lastname,
        firstname: firstname,
      });
    });
    return res.status(202).json({ Data: "Register is corrected" });
  } catch (error) {
    res.json({ error: "User and password incorrect" });
  }
});
router.get("/auth", validateToken, (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.json(error);
  }
});
router.post("/logout", async (req, res) => {
  try {
    res.status(202).json({ Data: "Login is corrected" });
  } catch (error) {
    res.json({ error: "User and password incorrect" });
  }
});
module.exports = router;

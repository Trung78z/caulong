const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./views/image");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    // Gửi tên tệp đã được tải lên
    res.status(200).send(req.file.filename);
  } catch (error) {
    // Trả về một phản hồi lỗi với thông điệp hoặc đối tượng lỗi
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

import multer from "multer";
import path from "path";

const storageFile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-";
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storageFile });

export default upload;

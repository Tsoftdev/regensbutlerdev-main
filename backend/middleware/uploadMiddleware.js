import multer from "multer";

const csvFilter = (req, file, cb) => {
  console.log("in csvFilter");
  console.log(file);
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./regensbutler-frontend/public/uploads/tomysql/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-productdata-${file.originalname}`);
  },
});

const uploadFile = multer({ storage: storage, fileFilter: csvFilter });

export { uploadFile };

import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'image/pjpeg' || file.mimetype === 'image/svd+xml' || file.mimetype === 'image/tiff') {
      cb(null, 'uploads/image');
    } else {
      cb(null, 'uploads/file');
    }
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4()+'_'+file.originalname);
  },
});

const uploads = multer({ storage: storage });

export default uploads;

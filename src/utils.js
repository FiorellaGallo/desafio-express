import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let destinationPath = '';

      if(file.fieldname === 'products'){
        destinationPath = './public/products';
      } else if (file.fieldname === 'profiles'){
        destinationPath = './public/profiles';
      }else if (file.fieldname === 'documents'){
        destinationPath = './public/documents';
      }else{
        destinationPath = './public/img';
      }
      cb(null,destinationPath);
      
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
export const uploader = multer({ storage });


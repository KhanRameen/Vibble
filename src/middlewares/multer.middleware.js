import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
  
  export const upload = multer({ 
          storage, 
          
    })
  
//file filter to allow only specific file types
const allowVideoMime=["video/mp4","video/mov","video/mpeg","video/mpg","video/flv","video/mxf","video/webm","video/avi","video/3gp"]
const allowImageMime=["image/jpeg", "image/png", "image/jpg"]


const uploadVideo=multer({
    storage,
    fileFilter:(req,file, cb)=>{
      if(allowVideoMime.includes(file.mimetype)){
        cb(null,true);
        console.log('VIDEO FILE RECIEVED');
        // req.videoFile = req.file;
      } else{
        cb(
          new ApiError(415,"Unsupported Media type. Only MP4, MPEG, MPG, FLV, MXF, WEBM, AVI, 3GP, and MOV video files are allowed!"), 
          false)
        }

    }
    
  })

const uploadImage=multer({
    storage,
    fileFilter:(req,file, cb)=>{
      if(allowImageMime.includes(file.mimetype)){
        cb(null,true);
        console.log('IMAGE FILE RECIEVED');
        
        // req.imageFile = req.file;

      } else{
        cb(
          new ApiError(415,"Unsupported Media type. Only JPEG, JPG and PNG is allowed"), 
          false)
        }

    }
    
  })
const uploadMedia=multer({
    storage,
    fileFilter:(req,file, cb)=>{
      if(allowImageMime.includes(file.mimetype)){
        cb(null,true);
        console.log('IMAGE FILE RECIEVED');
        
        req.imageFile = req.files;

      } 
      else if(allowVideoMime.includes(file.mimetype)){
        cb(null,true);
        console.log('VIDEO FILE RECIEVED');
        req.videoFile = req.files;
      }
      else{
        cb(
          new ApiError(415,"Unsupported Media type. Only JPEG, JPG and PNG is allowed"), 
          false)
        }

    }
    
  })


  
//   const uploadMedia = (req, res, next) => {
//     uploadImage(req, res, (err) => {
//         if (err) return res.status(400).json({ error: "Image upload failed!" });

//         req.imageFile = req.file; // Store image separately ✅

//         uploadVideo(req, res, (err) => {
//             if (err) return res.status(400).json({ error: "Video upload failed!" });

//             req.videoFile = req.file; // Store video separately ✅

//             next(); // ✅ Move to the controller
//         });
//     });
// };




    
export {uploadMedia}
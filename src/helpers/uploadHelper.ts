import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    const uuid: string = uuidv4()
    cb(null, `${uuid}${path.extname(file.originalname)}`)
  }
})

const fileFilter = (req: any, file: any, cb: any): any => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png'
  ]
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    return cb(new Error('Invalid file type.'), false)
  }
}
const maxSize = 5 * 1024 * 1024

const limits = {
  fileSize: maxSize,
  files: 4
}
const upload = multer({ storage, fileFilter, limits })
export default upload

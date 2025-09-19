import express from 'express';
import { addPhoto, deletePhoto, getServicePhotos, updatePhoto } from '../controllers/servicePhotoController';
import { upload } from '../middleware/multerUpload';

const router = express.Router();

router.post('/photos', upload.array('files', 5), addPhoto);
router.get('/photos', getServicePhotos);
router.delete('/photos/:photoId', deletePhoto);
router.put('/photos/:photoId', updatePhoto);

export default router;
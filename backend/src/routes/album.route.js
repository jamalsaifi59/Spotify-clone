import { addAlbum, listAlbum, removeAlbum, getAlbums} from "../controllers/album.controller.js";
import express from "express";
import upload from "../middleware/multer.middleware.js";

const albumRouter = express.Router();

albumRouter.post('/add', upload.single('image'), addAlbum);
albumRouter.get('/list', listAlbum);
albumRouter.get('/get', getAlbums);
albumRouter.delete('/remove/:id', removeAlbum)


export default albumRouter;
import {
  addSong,
  listSong,
  removeSong,
} from "../controllers/songs.controller.js";
import { Router } from "express";
import upload from "../middleware/multer.middleware.js";

const songRouter = Router();

songRouter.route("/add").post(
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  addSong,
);
// songRouter.post(
//   '/add',
//   upload.any(),
//   (req, res) => {
//     console.log("files : ",req.files);
//     console.log("body : ", req.body);
//     res.json({ success: true });
//   }
// );
songRouter.route("/list").get(listSong);
songRouter.route("/remove/:id").delete(removeSong);
export default songRouter;

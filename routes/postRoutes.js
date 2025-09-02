import express from 'express'
import { createPost, getAllPosts } from '../controller/postController.js'
import { CheckUser } from '../middleware/auth.js'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({storage})

const postRouter = express.Router()

postRouter.post('/create',CheckUser,upload.single("content"),createPost)
postRouter.get('/data',CheckUser,getAllPosts)


export default postRouter
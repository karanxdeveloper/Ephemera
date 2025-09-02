import cloudinary from "../config/cloudinary.js";
import Post from "../models/postModels.js";


export const createPost = async (req, res) => {

    try {
        if (!req.file) {
            return res.json({ success: false, message: "no file found" })
        }
        const { title, userId, expiresIn } = req.body;


        let imageURL;

        const uploadResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => { if (error) reject(error); else { resolve(result) } }).end(req.file.buffer)
        })

        imageURL = uploadResponse.secure_url
        
        const expiresAt = new Date(Date.now() + expiresIn * 1000)

        const newPost = new Post({
            title,
            content: imageURL,
            user: userId,
            expiresAt
        })

        await newPost.save()

        return res.json({ success: true, message: "post created successfully" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}



export const getAllPosts = async (req,res)=>{
    try {
        const posts = await Post.find()
        return res.json({success:true,message:"post fetched successfull", posts})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}
import { Request, Response } from "express";
import { Blog, BlogInput, Comment, CommentInput } from "../models/blog.model";

const getBlogs = async (req: Request, res: Response) => {
  const search = req.query.search as string;
  try {
    let blogs;
    if (search) {
      blogs = await Blog.find({ title: { $regex: search } }).populate("author");
    } else {
      blogs = await Blog.find({}).populate("author");
    }
    return res.status(200).send({ blogs });
  } catch (e) {
    console.log("Error", e);
    return res
      .status(500)
      .send({ message: "Error occurred while getting blogs" });
  }
};

const getBlog = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId)
      .populate("comments")
      .populate("author");
    return res.status(200).send({ blog });
  } catch (e) {
    console.log("Error", e);
    return res
      .status(500)
      .send({ message: "Error occurred while getting blog" });
  }
};

const createBlog = async (req: Request, res: Response) => {
  const { title, body } = req.body;
  if (!title) {
    return res.status(400).send({ message: "Title is Required" });
  }
  if (!body) {
    return res.status(400).send({ message: "body is Required" });
  }
  // @ts-ignore
  const { id } = req.user;

  const newBlog: BlogInput = {
    title,
    body,
    author: id,
  };
  try {
    const blog = await Blog.create(newBlog);
    return res.status(201).send({ blog });
  } catch (e) {
    console.log("Error", e);
    return res
      .status(500)
      .send({ message: "Error occurred while creating blog" });
  }
};

const likeBlog = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  // @ts-ignore
  const { id } = req.user;
  try {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: {
          likes: id,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).send(blog);
  } catch (e) {
    console.log("Error", e);
    return res
      .status(500)
      .send({ message: "Error occurred while liking blog" });
  }
};
const createComment = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const { body } = req.body;
  if (!body) {
    return res.status(400).send({ message: "Body is Required" });
  }

  // @ts-ignore
  const { id } = req.user;

  const newComment: CommentInput = {
    author: id,
    body,
  };

  try {
    const comment = await Comment.create(newComment);
    const blog = await Blog.findByIdAndUpdate(blogId, {
      $push: {
        comments: comment._id,
      },
    });
    return res.status(201).send({ comment });
  } catch (e) {
    console.log("Error", e);
    return res.status(500).send("Error occurred while creating comment");
  }
};

export { createBlog, createComment, getBlog, getBlogs, likeBlog };

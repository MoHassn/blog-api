import { Router } from "express";
import {
  createBlog,
  createComment,
  getBlog,
  getBlogs,
  likeBlog,
} from "../controllers/blog.controller";
import { requiresAuth } from "../middlewares/auth.middleware";

const blogRouter = Router();

blogRouter.get("/blogs", getBlogs);
blogRouter.get("/blogs/:blogId", getBlog);
blogRouter.post("/blogs", requiresAuth, createBlog);
blogRouter.post("/blogs/:blogId/comments", requiresAuth, createComment);
blogRouter.post("/blogs/:blogId/likes", requiresAuth, likeBlog); // todo

export { blogRouter };

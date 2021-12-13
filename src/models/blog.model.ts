import mongoose, { Schema, Model, Document } from "mongoose";

type BlogInput = {
  title: string;
  body: string;
  author: string;
};

type BlogDocument = Document & {
  title: BlogInput["title"];
  body: BlogInput["body"];
  author: BlogInput["author"];
  comments: [string];
  likes: [string];
};

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// comment types and schema

type CommentInput = {
  author: string;
  body: string;
};

type CommentDocument = Document & {
  author: CommentInput["author"];
  body: CommentInput["body"];
};

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  body: {
    type: String,
    required: true,
  },
});

const Blog: Model<BlogDocument> = mongoose.model("Blog", blogSchema);
const Comment: Model<CommentDocument> = mongoose.model(
  "Comment",
  commentSchema
);

export {
  Blog,
  BlogInput,
  BlogDocument,
  Comment,
  CommentInput,
  CommentDocument,
};

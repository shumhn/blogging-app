import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [50, "Title should not exceed 50 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"],
      
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: [150, "Short description should not exceed 150 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    tags: 
      {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: [25, "Each tag should not exceed 25 characters"],
      },
    // image: {
    //   url: {
    //     type: String,
    //     default: "",
    //     required:false
    //   },
    //   alt: {
    //     type: String,
    //     default: "",
    //     maxlength: [200, "Alt text should not exceed 200 characters"],
    //   },
    // },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
      index: true,
    },

    publishedAt: {
      type: Date,
      default: null,
      index: true,
    },
    // Metrics
    views: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },
    likesCount: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);



// Add performance indexes for common query patterns
blogSchema.index({ publishedAt: -1, views: -1 }); // For sorting by date and popularity
blogSchema.index({ author: 1, publishedAt: -1 }); // For author-specific queries
blogSchema.index({ tags: 1, publishedAt: -1 }); // For tag filtering
blogSchema.index({ createdAt: -1 }); // For general sorting by creation date

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
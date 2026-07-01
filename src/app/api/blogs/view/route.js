import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongodb";
import Blog from "@/models/Blog";
import View from "@/models/View";
import {getUserFromCookies} from '@/lib/auth/cookies'
import User from "@/models/User";
import { unstable_cache } from 'next/cache';

/**
 * Optimized blog view endpoint
 * - Uses caching for individual blog posts
 * - Implements field selection for better performance
 * - Handles both single blog and full blog list requests
 */

// Cache for individual blog posts (longer cache time for individual posts)
const getCachedBlog = unstable_cache(
  async (id) => {
    await dbConnect();
    return await Blog.findById(id)
      .select('title slug shortDescription content tags author publishedAt views likesCount createdAt')
      .populate('author', 'username');
  },
  ['blog-detail'],
  { 
    revalidate: 600, // Cache for 10 minutes
    tags: ['blogs', 'blog-detail']
  }
);

// Cache for full blog list (shorter cache time for list updates)
const getCachedAllBlogs = unstable_cache(
  async () => {
    await dbConnect();
    return await Blog.find()
      .select('title slug shortDescription content tags author publishedAt views likesCount createdAt')
      .populate('author', 'username')
      .sort({ publishedAt: -1 }); // Sort by most recent first
  },
  ['blogs-all'],
  { 
    revalidate: 300, // Cache for 5 minutes
    tags: ['blogs', 'blogs-all']
  }
);

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        await dbConnect();

        if (id) {
            // Get individual blog with caching
            const blog = await getCachedBlog(id);
            
            if (!blog) {
                return NextResponse.json(
                    { error: true, message: "Blog not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                error: false,
                data: blog
            }, { status: 200 });
        } else {
            // Get all blogs with caching and optimized query
            const allBlogs = await getCachedAllBlogs();
            
            return NextResponse.json({
                error: false,
                data: allBlogs,
                count: allBlogs.length
            }, { status: 200 });
        }
    } catch (error) {
        console.error('Blog fetch error:', error);

        if (!id) {
            return NextResponse.json(
                {
                    error: false,
                    data: [],
                    count: 0,
                    warning: 'Blogs are temporarily unavailable.',
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { error: true, message: 'An error occurred while fetching blogs.' },
            { status: 500 }
        );
    }
}

// Increment view count for a blog
export async function POST(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: true, message: 'Missing blog id' }, { status: 400 });
        }
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.ip || '0.0.0.0';
        const userAgent = request.headers.get('user-agent') || '';

        // Check if this IP viewed recently (e.g., last 24h) to avoid multiple counts
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const already = await View.findOne({ blog: id, ip, createdAt: { $gte: since } }).select('_id');
        let updated;
        if (!already) {
            await View.create({ blog: id, ip, userAgent });
            updated = await Blog.findByIdAndUpdate(
                id,
                { $inc: { views: 1 } },
                { new: true, runValidators: true }
            ).select('views');
        } else {
            updated = await Blog.findById(id).select('views');
        }
        if (!updated) {
            return NextResponse.json({ error: true, message: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json({ error: false, views: updated.views }, { status: 200 });
    } catch (error) {
        console.error('Increment view error:', error);
        return NextResponse.json({ error: true, message: 'Failed to increment views' }, { status: 500 });
    }
}

// app/api/blog/posts/route.ts
// Blog posts API

import { NextRequest, NextResponse } from 'next/server';
import { Prisma, PostStatus } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';

const POSTS_PER_PAGE = 10;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get('status') || 'PUBLISHED';
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || String(POSTS_PER_PAGE));
    const skip = (page - 1) * limit;

    const where: Prisma.BlogPostWhereInput = {
      status: statusParam as PostStatus
    };

    if (category) {
      where.categories = {
        some: {
          category: {
            slug: category
          }
        }
      };
    }

    if (tag) {
      where.tags = {
        some: {
          tag: {
            slug: tag
          }
        }
      };
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          author: {
            select: {
              name: true,
              avatar: true
            }
          },
          categories: {
            include: {
              category: true
            }
          },
          tags: {
            include: {
              tag: true
            }
          },
          _count: {
            select: {
              comments: true
            }
          }
        },
        orderBy: {
          publishedAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.blogPost.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      authorId,
      status,
      categories,
      tags,
      publishedAt
    } = body;

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        authorId,
        status: status || PostStatus.DRAFT,
        publishedAt: status === 'PUBLISHED' ? new Date(publishedAt || Date.now()) : null,
        readTime: Math.ceil(content.split(' ').length / 200), // Estimate read time
        categories: {
          create: categories?.map((categoryId: string) => ({
            categoryId
          })) || []
        },
        tags: {
          create: tags?.map((tagId: string) => ({
            tagId
          })) || []
        }
      },
      include: {
        author: true,
        categories: {
          include: {
            category: true
          }
        },
        tags: {
          include: {
            tag: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: post,
      message: 'Blog post created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

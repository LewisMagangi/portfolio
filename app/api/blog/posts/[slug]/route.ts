// app/api/blog/posts/[slug]/route.ts
// Single blog post operations

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
      include: {
        author: {
          select: {
            name: true,
            avatar: true,
            bio: true
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
        comments: {
          where: {
            status: 'APPROVED',
            parentId: null
          },
          include: {
            replies: {
              include: {
                user: {
                  select: {
                    name: true,
                    avatar: true
                  }
                }
              }
            },
            user: {
              select: {
                name: true,
                avatar: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.blogPost.update({
      where: { slug: params.slug },
      data: { views: { increment: 1 } }
    });

    return NextResponse.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const {
      title,
      slug: newSlug,
      excerpt,
      content,
      coverImage,
      status,
      categories,
      tags,
      publishedAt
    } = body;

    // Delete existing categories and tags
    await prisma.blogPostCategory.deleteMany({
      where: { post: { slug: params.slug } }
    });
    await prisma.blogPostTag.deleteMany({
      where: { post: { slug: params.slug } }
    });

    const post = await prisma.blogPost.update({
      where: { slug: params.slug },
      data: {
        title,
        slug: newSlug || params.slug,
        excerpt,
        content,
        coverImage,
        status,
        publishedAt: status === 'PUBLISHED' && publishedAt ? new Date(publishedAt) : undefined,
        readTime: content ? Math.ceil(content.split(' ').length / 200) : undefined,
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
      message: 'Blog post updated successfully'
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.blogPost.delete({
      where: { slug: params.slug }
    });

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type BlogPostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // 'DRAFT', 'PUBLISHED', 'ARCHIVED'
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where = status ? { status: status as BlogPostStatus } : {}

    const posts = await prisma.blogPost.findMany({
      where,
      include: {
        author: {
          select: {
            name: true,
            email: true,
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
        comments: {
          where: { status: 'APPROVED' },
          select: {
            id: true,
            createdAt: true
          }
        }
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: limit,
      skip: offset
    })

    const total = await prisma.blogPost.count({ where })

    return NextResponse.json({
      posts,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, excerpt, content, authorId, status, publishedAt, categories, tags, ...otherData } = body

    // Validate required fields
    if (!title || !slug || !excerpt || !content || !authorId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug }
    })

    if (existingPost) {
      return NextResponse.json({ error: 'Blog post with this slug already exists' }, { status: 400 })
    }

    // Verify author exists
    const author = await prisma.user.findUnique({
      where: { id: authorId }
    })

    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 400 })
    }

    // Create blog post with categories and tags
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        authorId,
        status: status || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? (publishedAt ? new Date(publishedAt) : new Date()) : null,
        ...otherData,
        categories: categories ? {
          create: categories.map((categoryName: string) => ({
            category: {
              connectOrCreate: {
                where: { name: categoryName },
                create: { name: categoryName, slug: categoryName.toLowerCase().replace(/\s+/g, '-') }
              }
            }
          }))
        } : undefined,
        tags: tags ? {
          create: tags.map((tagName: string) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName, slug: tagName.toLowerCase().replace(/\s+/g, '-') }
              }
            }
          }))
        } : undefined
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
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
        }
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}
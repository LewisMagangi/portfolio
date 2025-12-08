// lib/analytics.ts
import { prisma } from './prisma'

export async function trackPageView(
  pagePath: string,
  options?: {
    referrer?: string
    userAgent?: string
    ipAddress?: string
    sessionId?: string
  }
) {
  try {
    await prisma.pageView.create({
      data: {
        pagePath,
        referrer: options?.referrer,
        userAgent: options?.userAgent,
        ipAddress: options?.ipAddress,
        sessionId: options?.sessionId,
        visitedAt: new Date()
      }
    })
  } catch (error) {
    console.error('Error tracking page view:', error)
    // Don't throw error to avoid breaking the app
  }
}

export async function trackDownload(
  fileType: 'RESUME' | 'CV' | 'PORTFOLIO' | 'OTHER',
  options?: {
    ipAddress?: string
    userAgent?: string
  }
) {
  try {
    await prisma.download.create({
      data: {
        fileType,
        ipAddress: options?.ipAddress,
        userAgent: options?.userAgent,
        downloadedAt: new Date()
      }
    })
  } catch (error) {
    console.error('Error tracking download:', error)
  }
}

export async function getPageViewStats() {
  try {
    const totalViews = await prisma.pageView.count()

    const viewsByPage = await prisma.pageView.groupBy({
      by: ['pagePath'],
      _count: {
        pagePath: true
      },
      orderBy: {
        _count: {
          pagePath: 'desc'
        }
      },
      take: 10
    })

    const recentViews = await prisma.pageView.findMany({
      orderBy: {
        visitedAt: 'desc'
      },
      take: 100
    })

    return {
      totalViews,
      viewsByPage,
      recentViews
    }
  } catch (error) {
    console.error('Error getting page view stats:', error)
    return null
  }
}

export async function getDownloadStats() {
  try {
    const totalDownloads = await prisma.download.count()

    const downloadsByType = await prisma.download.groupBy({
      by: ['fileType'],
      _count: {
        fileType: true
      }
    })

    return {
      totalDownloads,
      downloadsByType
    }
  } catch (error) {
    console.error('Error getting download stats:', error)
    return null
  }
}
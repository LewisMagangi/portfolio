// prisma/seed.ts
// Database seeding script for initial data

import "dotenv/config";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, UserRole, ProjectStatus, PostStatus, SkillCategory, TechCategory } from '../lib/generated/prisma';
import bcrypt from 'bcryptjs';
import { POSTS as V8_POSTS } from '../lib/content/blog-posts';
import { GROUPS as SKILL_GROUPS, GROUP_CATEGORY, LEVEL_DB } from '../lib/content/skills';

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create Prisma client with the adapter
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...');

  let admin = null;

  // Only create admin user in development
  if (process.env.NODE_ENV === 'development') {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    admin = await prisma.user.upsert({
      where: { email: 'lewis@example.com' },
      update: {},
      create: {
        email: 'lewis@example.com',
        name: 'Lewis Magangi',
        password: adminPassword,
        role: UserRole.ADMIN,
        bio: 'Full-Stack Software Engineer with expertise in Django, React, and Next.js. Passionate about building secure, scalable applications.',
        location: 'Nairobi, Kenya',
        github: 'https://github.com/lewismagangi',
        linkedin: 'https://linkedin.com/in/lewismagangi',
        isActive: true,
        emailVerified: true,
      },
    });
    console.log('✅ Created admin user (development only)');
  } else {
    console.log('ℹ️  Skipping admin user creation in production');
  }

  // Only create sample data if admin exists (development mode)
  if (admin) {

  // Create technologies
  const technologies = await Promise.all([
    // Backend
    prisma.technology.upsert({
      where: { name: 'Python' },
      update: {},
      create: { name: 'Python', category: TechCategory.BACKEND, color: '#3776AB' },
    }),
    prisma.technology.upsert({
      where: { name: 'Django' },
      update: {},
      create: { name: 'Django', category: TechCategory.BACKEND, color: '#092E20' },
    }),
    prisma.technology.upsert({
      where: { name: 'Django REST Framework' },
      update: {},
      create: { name: 'Django REST Framework', category: TechCategory.BACKEND, color: '#A30000' },
    }),
    prisma.technology.upsert({
      where: { name: 'Flask' },
      update: {},
      create: { name: 'Flask', category: TechCategory.BACKEND, color: '#000000' },
    }),
    prisma.technology.upsert({
      where: { name: 'Node.js' },
      update: {},
      create: { name: 'Node.js', category: TechCategory.BACKEND, color: '#339933' },
    }),
    // Frontend
    prisma.technology.upsert({
      where: { name: 'React' },
      update: {},
      create: { name: 'React', category: TechCategory.FRONTEND, color: '#61DAFB' },
    }),
    prisma.technology.upsert({
      where: { name: 'Next.js' },
      update: {},
      create: { name: 'Next.js', category: TechCategory.FRONTEND, color: '#000000' },
    }),
    prisma.technology.upsert({
      where: { name: 'TypeScript' },
      update: {},
      create: { name: 'TypeScript', category: TechCategory.FRONTEND, color: '#3178C6' },
    }),
    prisma.technology.upsert({
      where: { name: 'TailwindCSS' },
      update: {},
      create: { name: 'TailwindCSS', category: TechCategory.FRONTEND, color: '#06B6D4' },
    }),
    // Database
    prisma.technology.upsert({
      where: { name: 'PostgreSQL' },
      update: {},
      create: { name: 'PostgreSQL', category: TechCategory.DATABASE, color: '#4169E1' },
    }),
    prisma.technology.upsert({
      where: { name: 'Prisma' },
      update: {},
      create: { name: 'Prisma', category: TechCategory.DATABASE, color: '#2D3748' },
    }),
    prisma.technology.upsert({
      where: { name: 'MongoDB' },
      update: {},
      create: { name: 'MongoDB', category: TechCategory.DATABASE, color: '#47A248' },
    }),
    // DevOps
    prisma.technology.upsert({
      where: { name: 'Docker' },
      update: {},
      create: { name: 'Docker', category: TechCategory.DEVOPS, color: '#2496ED' },
    }),
    prisma.technology.upsert({
      where: { name: 'Git' },
      update: {},
      create: { name: 'Git', category: TechCategory.DEVOPS, color: '#F05032' },
    }),
  ]);
  console.log('✅ Created technologies');

  // Create projects
  await prisma.project.upsert({
    where: { slug: 'solar-powered-water-atm' },
    update: {},
    create: {
      title: 'Solar-Powered Water ATM System',
      slug: 'solar-powered-water-atm',
      description: 'Python-based web application enabling secure water access through solar-powered dispensing units with real-time monitoring.',
      detailedDescription: 'The Solar-Powered Water ATM is a comprehensive platform designed to provide sustainable water access to underserved communities. Built with Django, it features user authentication, transaction management, real-time device monitoring, and detailed reporting capabilities.',
      thumbnail: '/images/projects/water-atm.jpg',
      githubUrl: 'https://github.com/lewismagangi/water-atm',
      status: ProjectStatus.ACTIVE,
      featured: true,
      orderIndex: 1,
      startDate: new Date('2024-01-01'),
      createdBy: admin.id,
      technologies: {
        create: [
          { technologyId: technologies.find(t => t.name === 'Python')!.id },
          { technologyId: technologies.find(t => t.name === 'Django')!.id },
          { technologyId: technologies.find(t => t.name === 'PostgreSQL')!.id },
        ],
      },
      highlights: {
        create: [
          { highlight: 'Led Flask to Django 5.2.4 migration with scalable multi-app architecture', orderIndex: 0 },
          { highlight: 'Implemented comprehensive authentication system with CSRF protection', orderIndex: 1 },
          { highlight: 'Designed database schemas supporting user profiles and device telemetry', orderIndex: 2 },
        ],
      },
    },
  });

  await prisma.project.upsert({
    where: { slug: 'sustainable-fishing-platform' },
    update: {},
    create: {
      title: 'Sustainable Fishing Platform',
      slug: 'sustainable-fishing-platform',
      description: 'Multi-app Django platform for community-driven sustainable fishing with catch management and educational content.',
      detailedDescription: 'A comprehensive platform supporting fishermen, educators, and administrators in promoting sustainable fishing practices. Features include catch logging, educational resources, community timeline, and robust role-based access control.',
      thumbnail: '/images/projects/fishing.jpg',
      githubUrl: 'https://github.com/lewismagangi/sustainable-fishing',
      status: ProjectStatus.COMPLETED,
      featured: true,
      orderIndex: 2,
      startDate: new Date('2023-06-01'),
      endDate: new Date('2024-03-01'),
      createdBy: admin.id,
      technologies: {
        create: [
          { technologyId: technologies.find(t => t.name === 'Django')!.id },
          { technologyId: technologies.find(t => t.name === 'Python')!.id },
        ],
      },
      highlights: {
        create: [
          { highlight: 'Designed complete system architecture with three core Django apps', orderIndex: 0 },
          { highlight: 'Built custom admin dashboards with real-time metrics', orderIndex: 1 },
          { highlight: 'Implemented N+1 query optimization with select_related/prefetch_related', orderIndex: 2 },
        ],
      },
    },
  });

  await prisma.project.upsert({
    where: { slug: 'wamumbi-charity-platform' },
    update: {},
    create: {
      title: 'Wamumbi Charity Platform',
      slug: 'wamumbi-charity-platform',
      description: 'Modern Next.js web app for charity foundation with secure donation processing and admin dashboard.',
      detailedDescription: 'A full-stack charity platform built with Next.js, featuring donation management, role-based access control, and secure payment processing through Paystack integration.',
      thumbnail: '/images/projects/wamumbi.jpg',
      githubUrl: 'https://github.com/lewismagangi/wamumbi',
      liveUrl: 'https://wamumbi.vercel.app',
      status: ProjectStatus.IN_PROGRESS,
      featured: true,
      orderIndex: 3,
      startDate: new Date('2025-04-01'),
      createdBy: admin.id,
      technologies: {
        create: [
          { technologyId: technologies.find(t => t.name === 'Next.js')!.id },
          { technologyId: technologies.find(t => t.name === 'TypeScript')!.id },
          { technologyId: technologies.find(t => t.name === 'Prisma')!.id },
          { technologyId: technologies.find(t => t.name === 'PostgreSQL')!.id },
        ],
      },
      highlights: {
        create: [
          { highlight: 'Building custom admin dashboard with role-based access', orderIndex: 0 },
          { highlight: 'Integrating Paystack for secure donation processing', orderIndex: 1 },
          { highlight: 'Deployed on Vercel with CI/CD workflows', orderIndex: 2 },
        ],
      },
    },
  });
  console.log('✅ Created projects');

  // Create experiences
  await prisma.experience.create({
    data: {
      company: 'Wamumbi',
      role: 'Volunteer Software Engineer',
      location: 'Remote, Nairobi Kenya',
      employmentType: 'VOLUNTEER',
      startDate: new Date('2025-04-01'),
      isCurrent: true,
      description: 'Co-developing fullstack web app for a charity foundation.',
      achievements: {
        create: [
          { achievement: 'Co-developing fullstack web app using Next.js, Clerk, and Prisma ORM with PostgreSQL', orderIndex: 0 },
          { achievement: 'Building custom admin dashboard with role-based access', orderIndex: 1 },
          { achievement: 'Integrating Paystack for secure donation processing', orderIndex: 2 },
        ],
      },
    },
  });

  await prisma.experience.create({
    data: {
      company: 'KenGen Kenya',
      role: 'Intern, Networking Department',
      location: 'Stima Plaza Headquarters, Nairobi',
      employmentType: 'INTERNSHIP',
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-08-31'),
      isCurrent: false,
      description: 'Network infrastructure maintenance and configuration.',
      achievements: {
        create: [
          { achievement: 'Troubleshooted Cisco phones and PC networks', orderIndex: 0 },
          { achievement: 'Configured Cisco devices including routers and access points', orderIndex: 1 },
          { achievement: 'Supported network maintenance and documentation', orderIndex: 2 },
        ],
      },
    },
  });
  console.log('✅ Created experiences');

  // Create education
  await prisma.education.create({
    data: {
      institution: 'ALX Software Engineering',
      degree: 'Software Engineering Program',
      fieldOfStudy: 'Full-Stack Development',
      startDate: new Date('2022-02-01'),
      endDate: new Date('2025-02-01'),
      description: 'Intensive 12-month program focused on full-stack development with specialization in backend engineering.',
      highlights: {
        create: [
          { highlight: 'Backend Specialization', orderIndex: 0 },
          { highlight: 'Full-stack Development', orderIndex: 1 },
          { highlight: 'System Design', orderIndex: 2 },
        ],
      },
    },
  });

  await prisma.education.create({
    data: {
      institution: 'Jaramogi Oginga Odinga University',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Forensics Science',
      startDate: new Date('2020-09-01'),
      endDate: new Date('2024-10-28'),
      grade: 'Graduated',
      description: 'Comprehensive cybersecurity program covering digital forensics, network security, and ethical hacking.',
      highlights: {
        create: [
          { highlight: 'Cybersecurity', orderIndex: 0 },
          { highlight: 'Digital Forensics', orderIndex: 1 },
          { highlight: 'Network Security', orderIndex: 2 },
        ],
      },
    },
  });
  console.log('✅ Created education records');

  // Create blog categories
  await prisma.blogCategory.createMany({
    data: [
      {
        name: 'Web Development',
        slug: 'web-development',
        description: 'Articles about modern web development practices and technologies',
      },
      {
        name: 'Security',
        slug: 'security',
        description: 'Cybersecurity insights and best practices',
      },
      {
        name: 'Tutorials',
        slug: 'tutorials',
        description: 'Step-by-step guides and how-tos',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Created blog categories');

  // Create blog tags
  await prisma.blogTag.createMany({
    data: [
      { name: 'Django', slug: 'django' },
      { name: 'React', slug: 'react' },
      { name: 'Accessibility', slug: 'accessibility' },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Created blog tags');

  // Create blog posts: the one post on the site (lib/content/blog-posts.ts), under its own topic.
  for (const post of V8_POSTS) {
    const topicSlug = post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const topic = await prisma.blogCategory.upsert({
      where: { slug: topicSlug },
      create: { name: post.category, slug: topicSlug },
      update: {},
    });
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        authorId: admin.id,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date(`${post.publishedAt}T09:00:00+03:00`),
        readTime: post.readTime,
        categories: { create: [{ categoryId: topic.id }] },
      },
    });
  }
  console.log('✅ Created blog posts');

  // Create testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Project Team Lead',
        role: 'Solar-Powered Water ATM',
        content: 'Lewis demonstrated exceptional technical leadership in migrating our platform from Flask to Django. His attention to security and scalability transformed our codebase.',
        rating: 5,
        featured: true,
        status: 'APPROVED',
      },
      {
        name: 'Academic Supervisor',
        role: 'University Project',
        content: 'Outstanding work on the Dynamic Cryptosuite Selection System. Lewis shows deep understanding of cryptographic principles and software architecture.',
        rating: 5,
        featured: true,
        status: 'APPROVED',
      },
      {
        name: 'ALX Mentor',
        role: 'Software Engineering Program',
        content: 'Lewis consistently delivered high-quality code and showed strong problem-solving abilities. His contributions to team projects were invaluable.',
        rating: 5,
        featured: true,
        status: 'APPROVED',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Created testimonials');

  // Create skills: the launch list on /skills, with levels and evidence (v8). No ratings.
  await prisma.skill.createMany({
    data: SKILL_GROUPS.flatMap((g) =>
      g.skills.map((s, i) => ({
        name: s.name,
        category: GROUP_CATEGORY[g.id as keyof typeof GROUP_CATEGORY] as SkillCategory,
        level: LEVEL_DB[s.level],
        how: s.how,
        evidence: s.evidence,
        orderIndex: i,
      })),
    ),
    skipDuplicates: true,
  });
  console.log('✅ Created skills');

  console.log('🎉 Database seeding completed!');
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

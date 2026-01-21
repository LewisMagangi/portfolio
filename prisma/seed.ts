// prisma/seed.ts
// Database seeding script for initial data

import "dotenv/config";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, UserRole, ProjectStatus, PostStatus, SkillCategory, TechCategory } from '../lib/generated/prisma';
import bcrypt from 'bcryptjs';

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create Prisma client with the adapter
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
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
  console.log('✅ Created admin user');

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

  // Create blog posts
  // First, get category and tag IDs
  const webDevCategory = await prisma.blogCategory.findUnique({ where: { slug: 'web-development' } });
  const tutorialsCategory = await prisma.blogCategory.findUnique({ where: { slug: 'tutorials' } });
  const djangoTag = await prisma.blogTag.findUnique({ where: { slug: 'django' } });
  const reactTag = await prisma.blogTag.findUnique({ where: { slug: 'react' } });
  const accessibilityTag = await prisma.blogTag.findUnique({ where: { slug: 'accessibility' } });

  if (webDevCategory && tutorialsCategory && djangoTag && reactTag && accessibilityTag) {
    await prisma.blogPost.upsert({
      where: { slug: 'building-accessible-voice-interfaces' },
      update: {},
      create: {
        title: 'Building Accessible Voice Interfaces with Whisper and Coqui TTS',
        slug: 'building-accessible-voice-interfaces',
        excerpt: 'How we achieved WCAG 2.1 AA compliance while implementing local voice processing for enhanced privacy.',
        content: `# Building Accessible Voice Interfaces

In this article, I'll share our journey of building a privacy-first voice exam platform that meets WCAG 2.1 AA standards...

## The Challenge

Traditional voice interfaces rely on cloud services, which raises privacy concerns...

## Our Solution

We implemented local processing using Whisper for speech-to-text and Coqui TTS for text-to-speech...`,
        coverImage: '/images/blog/voice-interfaces.jpg',
        authorId: admin.id,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2025-11-01'),
        readTime: 8,
        categories: {
          create: [
            { categoryId: webDevCategory.id },
            { categoryId: tutorialsCategory.id },
          ],
        },
        tags: {
          create: [
            { tagId: accessibilityTag.id },
          ],
        },
      },
    });

    await prisma.blogPost.upsert({
      where: { slug: 'django-to-nextjs-journey' },
      update: {},
      create: {
        title: 'Django to Next.js: A Full-Stack Journey',
        slug: 'django-to-nextjs-journey',
        excerpt: 'Lessons learned from working across both backend and frontend ecosystems in production environments.',
        content: `# From Django to Next.js

My journey working with both Django and Next.js has taught me valuable lessons about full-stack development...`,
        coverImage: '/images/blog/django-nextjs.jpg',
        authorId: admin.id,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2025-10-15'),
        readTime: 6,
        categories: {
          create: [
            { categoryId: webDevCategory.id },
          ],
        },
        tags: {
          create: [
            { tagId: djangoTag.id },
            { tagId: reactTag.id },
          ],
        },
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

  // Create skills
  const skillCategories = [
    {
      category: 'BACKEND',
      skills: [
        { name: 'Python', proficiencyLevel: 5, yearsOfExperience: 3 },
        { name: 'Django', proficiencyLevel: 5, yearsOfExperience: 2 },
        { name: 'Django REST Framework', proficiencyLevel: 4, yearsOfExperience: 2 },
        { name: 'Flask', proficiencyLevel: 4, yearsOfExperience: 1 },
        { name: 'Node.js', proficiencyLevel: 3, yearsOfExperience: 1 },
      ],
    },
    {
      category: 'FRONTEND',
      skills: [
        { name: 'React', proficiencyLevel: 4, yearsOfExperience: 2 },
        { name: 'Next.js', proficiencyLevel: 4, yearsOfExperience: 1 },
        { name: 'TypeScript', proficiencyLevel: 4, yearsOfExperience: 1 },
        { name: 'TailwindCSS', proficiencyLevel: 3, yearsOfExperience: 1 },
      ],
    },
    {
      category: 'DATABASE',
      skills: [
        { name: 'PostgreSQL', proficiencyLevel: 4, yearsOfExperience: 2 },
        { name: 'Prisma', proficiencyLevel: 4, yearsOfExperience: 1 },
        { name: 'MongoDB', proficiencyLevel: 3, yearsOfExperience: 1 },
      ],
    },
    {
      category: 'DEVOPS',
      skills: [
        { name: 'Docker', proficiencyLevel: 3, yearsOfExperience: 1 },
        { name: 'Git', proficiencyLevel: 5, yearsOfExperience: 3 },
      ],
    },
  ];

  const allSkills = [];
  for (const category of skillCategories) {
    for (const skill of category.skills) {
      allSkills.push({
        name: skill.name,
        category: category.category as SkillCategory,
        proficiencyLevel: skill.proficiencyLevel,
        yearsOfExperience: skill.yearsOfExperience,
      });
    }
  }

  await prisma.skill.createMany({
    data: allSkills,
    skipDuplicates: true,
  });
  console.log('✅ Created skills');

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

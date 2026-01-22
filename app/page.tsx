"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Download, ChevronDown, ExternalLink, Send, Twitter } from 'lucide-react';

interface Project {
  id?: string;
  title: string;
  description: string;
  technologies?: Array<{ technology?: { name: string } } | string>;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiencyLevel: number;
  yearsOfExperience: number;
}

interface SkillsData {
  [category: string]: Skill[];
}

interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  publishedAt?: string;
  createdAt?: string;
  readTime?: string;
}

// Default projects to show immediately
const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'ProDev Connect',
    description: 'A full-stack social platform for developers with real-time messaging, post sharing, and community features.',
    technologies: ['Next.js', 'Django', 'PostgreSQL', 'WebSockets']
  },
  {
    id: '2', 
    title: 'Solar-Powered Water ATM',
    description: 'IoT-enabled water dispensing system with M-Pesa integration and real-time monitoring dashboard.',
    technologies: ['Django', 'React', 'Raspberry Pi', 'MQTT']
  },
  {
    id: '3',
    title: 'Voice Exam System',
    description: 'Accessible exam platform with WCAG 2.1 compliance, voice navigation, and screen reader support.',
    technologies: ['Python', 'Flask', 'Web Speech API', 'PostgreSQL']
  }
];

const PortfolioWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [skills, setSkills] = useState<SkillsData>({});
  const [skillsLoading, setSkillsLoading] = useState(true);

  useEffect(() => {
    // Fetch from API in background (non-blocking)
    const fetchData = async () => {
      try {
        const [projectsRes, blogRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/blog')
        ]);

        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          if (projectsData.posts?.length > 0) {
            setProjects(projectsData.posts);
          }
        }

        if (blogRes.ok) {
          const blogData = await blogRes.json();
          if (blogData.posts?.length > 0) {
            setBlogPosts(blogData.posts);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 3000);
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleDownloadCV = async () => {
    try {
      // Track the download and get the CV file
      const response = await fetch('/api/cv/download');

      if (response.ok) {
        // Create a blob from the response and download it
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;

        // Get filename from response headers or use default
        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'Lewis_Magangi_CV.pdf';
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="(.+)"/);
          if (filenameMatch) {
            filename = filenameMatch[1];
          }
        }

        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the object URL
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download CV');
        alert('CV download is currently not available. Please try again later.');
      }
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Failed to download CV. Please try again later.');
    }
  };

  const fetchSkills = async () => {
    try {
      console.log('Fetching skills from API...');
      const response = await fetch('/api/skills');
      const data = await response.json();
      console.log('Skills API response:', data);
      if (data.success) {
        setSkills(data.data);
        console.log('Skills set:', data.data);
      } else {
        console.error('API returned error:', data);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setSkillsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const experience = [
    {
      company: "Wamumbi",
      role: "Volunteer Software Engineer",
      period: "April 2025 - Present",
      location: "Remote, Nairobi Kenya",
      achievements: [
        "Co-developing fullstack web app using Next.js, Clerk, and Prisma ORM with PostgreSQL",
        "Building custom admin dashboard with role-based access",
        "Integrating Paystack for secure donation processing"
      ]
    },
    {
      company: "KenGen Kenya",
      role: "Intern, Networking Department",
      period: "May 2024 - Aug 2024",
      location: "Stima Plaza Headquarters, Nairobi",
      achievements: [
        "Troubleshooted Cisco phones and PC networks",
        "Configured Cisco devices including routers and access points",
        "Supported network maintenance and documentation"
      ]
    }
  ];

  const education = [
    {
      institution: "ALX Software Engineering",
      degree: "Software Engineering",
      period: "Feb 2022 - Feb 2025",
      highlights: ["Backend Specialization", "Full-stack Development", "System Design"]
    },
    {
      institution: "Jaramogi Oginga Odinga University",
      degree: "Bachelor's in Computer Forensics Science",
      period: "Sept 2020 - Oct 2024",
      highlights: ["Cybersecurity", "Digital Forensics", "Network Security"]
    }
  ];

  const testimonials = [
    {
      name: "Project Team Lead",
      role: "Solar-Powered Water ATM",
      text: "Lewis demonstrated exceptional technical leadership in migrating our platform from Flask to Django. His attention to security and scalability transformed our codebase."
    },
    {
      name: "Academic Supervisor",
      role: "University Project",
      text: "Outstanding work on the Dynamic Cryptosuite Selection System. Lewis shows deep understanding of cryptographic principles and software architecture."
    },
    {
      name: "ALX Mentor",
      role: "Software Engineering Program",
      text: "Lewis consistently delivered high-quality code and showed strong problem-solving abilities. His contributions to team projects were invaluable."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              LM
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Portfolio', 'Experience', 'Skills', 'Blog', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:text-cyan-400 transition-colors ${
                    activeSection === item.toLowerCase() ? 'text-cyan-400' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Portfolio', 'Experience', 'Skills', 'Blog', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-2 hover:bg-slate-700 rounded-md"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Lewis Magangi
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 mb-8">
              Full-Stack Software Engineer | Cybersecurity Specialist
            </p>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12">
              Building secure, scalable web applications with expertise in Django, React, and Next.js.
              Passionate about accessibility, clean code, and solving real-world problems through technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Get In Touch
              </button>
              <button 
                onClick={handleDownloadCV}
                className="px-8 py-3 border-2 border-cyan-500 hover:bg-cyan-500/10 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <Download size={20} />
                Download Resume
              </button>
            </div>
            <div className="flex justify-center gap-6">
              <a href="https://github.com/LewisMagangi" title="GitHub Profile" className="hover:text-cyan-400 transition-colors">
                <Github size={28} />
              </a>
              <a href="https://www.linkedin.com/in/lewis-magangi/" title="LinkedIn Profile" className="hover:text-cyan-400 transition-colors">
                <Linkedin size={28} />
              </a>
              <a href="https://twitter.com/Lewis_Magangi" title="Twitter Profile" className="hover:text-cyan-400 transition-colors">
                <Twitter size={28} />
              </a>
              <a href="https://lewismagangi.vercel.app/" title="Portfolio Website" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                <ExternalLink size={28} />
              </a>
              <a href="mailto:lewismomanyi34@gmail.com" title="Send Email" className="hover:text-cyan-400 transition-colors">
                <Mail size={28} />
              </a>
            </div>
          </div>
          <div className="mt-16 text-center animate-bounce">
            <ChevronDown size={32} className="mx-auto text-cyan-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Who I Am</h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                I&apos;m a passionate Full-Stack Software Engineer with a strong foundation in cybersecurity.
                With a Bachelor&apos;s degree in Computer Forensics Science and extensive training through ALX
                Software Engineering, I bring a unique perspective to building secure, scalable applications.
              </p>
              <p className="text-slate-300 mb-4 leading-relaxed">
                My journey spans from low-level systems programming in C to modern web development with
                React and Next.js. I&apos;ve led migrations, architected databases, and implemented accessibility
                standards that ensure everyone can use the technology we build.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Beyond coding, I&apos;m a competitive chess player who represented my university at national
                championships, bringing strategic thinking and patience to every project I undertake.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">What I Do</h3>
              <div className="space-y-4">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Backend Development</h4>
                  <p className="text-slate-300 text-sm">
                    Architecting robust APIs and databases with Django, building secure authentication systems,
                    and optimizing performance for scale.
                  </p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Frontend Engineering</h4>
                  <p className="text-slate-300 text-sm">
                    Creating responsive, accessible interfaces with React and Next.js, implementing modern
                    design patterns and state management.
                  </p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Security & Accessibility</h4>
                  <p className="text-slate-300 text-sm">
                    Implementing WCAG 2.1 standards, securing applications against vulnerabilities, and
                    ensuring privacy-first architectures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elevator Pitch */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">Elevator Pitch</h2>
            <p className="text-lg text-slate-300 leading-relaxed text-center">
              &quot;Hi, I&apos;m Lewis Magangi, a Full-Stack Software Engineer with expertise in Django and React.
              I&apos;ve led the architectural design and implementation of multiple production applications,
              including a solar-powered IoT platform and accessibility-compliant voice exam systems.
              With a background in cybersecurity and a passion for building secure, scalable solutions,
              I bring both technical depth and strategic thinking to every project. I&apos;m looking for
              opportunities where I can leverage my full-stack skills to solve complex problems and
              deliver impact at scale.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? projects.map((project, index) => (
              <div key={project.id || index} className="bg-slate-700/50 rounded-xl p-6 hover:bg-slate-700 transition-all transform hover:scale-105 border border-slate-600">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">{project.title}</h3>
                <p className="text-slate-300 mb-4 text-sm">{project.description}</p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-cyan-400">
                        {typeof tech === 'string' ? tech : tech.technology?.name || 'Unknown'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center text-slate-400">
                No projects available. Add some through the admin interface.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">{exp.role}</h3>
                    <p className="text-lg text-slate-300">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400">{exp.period}</p>
                    <p className="text-slate-500 text-sm">{exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-slate-300 flex items-start">
                      <span className="text-cyan-400 mr-2">▹</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-3xl font-bold mb-8 text-center text-cyan-400">Education</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {education.map((edu, index) => (
                <div key={index} className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                  <h4 className="text-xl font-bold text-cyan-400 mb-2">{edu.institution}</h4>
                  <p className="text-lg text-slate-300 mb-2">{edu.degree}</p>
                  <p className="text-slate-400 mb-4">{edu.period}</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map((highlight, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-cyan-400">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <button
              onClick={fetchSkills}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Refresh Skills
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsLoading ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-cyan-500 border-t-transparent" />
              </div>
            ) : Object.entries(skills).length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-400">
                No skills found. Add some skills in the admin panel.
              </div>
            ) : (
              Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                  <h3 className="text-xl font-bold mb-4 text-cyan-400">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <span key={skill.id} className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-slate-300 hover:bg-cyan-500/20 transition-colors">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Testimonials
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                <p className="text-slate-300 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="border-t border-slate-600 pt-4">
                  <p className="font-semibold text-cyan-400">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Recent Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.length > 0 ? blogPosts.slice(0, 6).map((post, index) => (
              <div key={post.id || index} className="bg-slate-700/50 rounded-xl p-6 border border-slate-600 hover:border-cyan-500 transition-all cursor-pointer group">
                <p className="text-sm text-slate-400 mb-2">
                  {new Date(post.publishedAt || post.createdAt || Date.now()).toLocaleDateString()} • {post.readTime || '5 min read'}
                </p>
                <h3 className="text-xl font-bold mb-3 text-cyan-400 group-hover:text-cyan-300">{post.title}</h3>
                <p className="text-slate-300 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-cyan-400 text-sm font-semibold group-hover:text-cyan-300">
                  Read More <ExternalLink size={16} className="ml-2" />
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center text-slate-400">
                No blog posts available. Add some through the admin interface.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="bg-slate-700/50 rounded-xl p-8 border border-slate-600">
            <p className="text-slate-300 text-center mb-8">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  placeholder="Tell me about your project or idea..."
                  className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <button
                onClick={handleFormSubmit}
                className="w-full px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </button>
              {formSubmitted && (
                <p className="text-center text-green-400">Message sent successfully! I&apos;ll get back to you soon.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 border-t border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 mb-4 md:mb-0">
              © 2025 Lewis Magangi. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="https://github.com/LewisMagangi" title="GitHub Profile" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/lewis-magangi/" title="LinkedIn Profile" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://twitter.com/Lewis_Magangi" title="Twitter Profile" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="https://lewismagangi.vercel.app/" title="Portfolio Website" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <ExternalLink size={24} />
              </a>
              <a href="mailto:lewismomanyi34@gmail.com" title="Send Email" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioWebsite;

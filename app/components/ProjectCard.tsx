// components/ProjectCard.tsx
// Reusable project card component

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    description: string;
    thumbnail?: string;
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
    technologies: Array<{
      technology: {
        name: string;
        category: string;
        color?: string;
      };
    }>;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
      {/* Thumbnail */}
      {project.thumbnail && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {project.featured && (
            <div className="absolute top-4 right-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="text-slate-400 mb-4 line-clamp-3">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-slate-700 rounded-full text-xs text-cyan-400 border border-cyan-500/30"
            >
              {tech.technology.name}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-400">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Github size={16} />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
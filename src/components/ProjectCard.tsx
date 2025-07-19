import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Language } from "./LanguageToggle";
import { useImageImports } from "@/hooks/useImageImports";

interface ProjectCardProps {
  project: {
    title: string;
    description: { ru: string; en: string };
    technologies: string[];
    github: string;
    image: string;
    status: string;
  };
  language: Language;
  index: number;
}

export function ProjectCard({ project, language, index }: ProjectCardProps) {
  const { getImageUrl } = useImageImports();
  
  const handleGithubClick = () => {
    window.open(project.github, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -30 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group relative bg-card border border-border rounded-xl overflow-hidden 
                 hover:border-primary/50 transition-all duration-500 cursor-pointer
                 hover:shadow-glow hover:scale-105 backdrop-blur-sm"
      whileHover={{ y: -10 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageUrl(project.image)}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>

        <div className="absolute top-4 right-4">
          <span className={`
            px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider
            ${project.status === 'completed' 
              ? 'bg-accent/20 text-accent border border-accent/30' 
              : 'bg-cyber-orange/20 text-cyber-orange border border-cyber-orange/30'
            }
          `}>
            {project.status === 'completed' 
              ? (language === 'ru' ? 'Завершен' : 'Completed')
              : (language === 'ru' ? 'В процессе' : 'In Progress')
            }
          </span>
        </div>

        <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 
                        transition-all duration-300 flex items-center justify-center gap-4">
          <button
            onClick={handleGithubClick}
            className="btn-cyber flex items-center gap-2"
          >
            <Github size={18} />
            {language === 'ru' ? 'Код' : 'Code'}
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-orbitron font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {project.description[language]}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground 
                         rounded border border-border hover:border-primary/50 
                         hover:text-primary transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <button
          onClick={handleGithubClick}
          className="w-full btn-cyber flex items-center justify-center gap-2 group-hover:shadow-neon"
        >
          <Github size={16} />
          {language === 'ru' ? 'Посмотреть на GitHub' : 'View on GitHub'}
        </button>
      </div>

      <div className="absolute -inset-0.5 bg-gradient-cyber opacity-0 group-hover:opacity-20 rounded-xl blur transition-opacity duration-500 -z-10"></div>
    </motion.div>
  );
}
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

interface SkillCardProps {
  skill: {
    name: string | { ru: string; en: string };
    level: number;
    icon: string;
    category?: string;
  };
  language: "ru" | "en";
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export function SkillCard({ skill, language, isSelected, onClick, index }: SkillCardProps) {
  // Get the icon component dynamically
  const IconComponent = (Icons as any)[skill.icon] as LucideIcon || Icons.Code;
  
  const skillName = typeof skill.name === "string" ? skill.name : skill.name[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`
        relative p-6 rounded-xl border cursor-pointer transition-all duration-500 group
        ${isSelected 
          ? 'border-primary bg-card/80 shadow-cyber scale-105' 
          : 'border-border bg-card/40 hover:border-primary/50 hover:shadow-glow'
        }
        backdrop-blur-sm holographic
      `}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-cyber opacity-10 rounded-xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <IconComponent 
            className={`
              w-8 h-8 transition-all duration-300
              ${isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}
            `}
          />
          <span 
            className={`
              text-sm font-orbitron font-bold
              ${isSelected ? 'text-accent' : 'text-muted-foreground group-hover:text-accent'}
            `}
          >
            {skill.level}%
          </span>
        </div>
        
        <h3 className={`
          font-rajdhani font-semibold text-lg mb-3 transition-colors duration-300
          ${isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'}
        `}>
          {skillName}
        </h3>
        
        {/* Skill level bar */}
        <div className="skill-bar">
          <motion.div
            className="skill-progress"
            initial={{ width: 0 }}
            animate={{ width: isSelected ? `${skill.level}%` : "0%" }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
        
        {skill.category && (
          <span className="inline-block mt-3 px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded uppercase tracking-wider">
            {skill.category}
          </span>
        )}
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300"></div>
    </motion.div>
  );
}
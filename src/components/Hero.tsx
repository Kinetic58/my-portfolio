import { Scene3D } from "./Scene3D";
import { ErrorBoundary } from "./ErrorBoundary";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Language } from "./LanguageToggle";
import { useImageImports } from "@/hooks/useImageImports";

interface HeroProps {
  language: Language;
  personalData: any;
}

export function Hero({ language, personalData }: HeroProps) {
  const { getImageUrl } = useImageImports();
  
  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden cyber-grid">
      <ErrorBoundary>
        <Scene3D />
      </ErrorBoundary>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-cyber rounded-full opacity-20 animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-neon rounded-full opacity-30 animate-float"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-cyber-purple/30 rounded-full animate-float-delayed"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <img
              src={getImageUrl(personalData.avatar)}
              alt={personalData.name[language]}
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary shadow-cyber glow-cyber animate-pulse-glow"
            />
            <div className="absolute -inset-4 bg-gradient-cyber rounded-full opacity-30 animate-pulse-glow"></div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-orbitron font-bold mb-4 gradient-text"
          >
            {personalData.name[language]}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-primary font-rajdhani font-semibold tracking-wider uppercase mb-6 text-glow"
          >
            {personalData.title[language]}
          </motion.p>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
        >
          {personalData.description[language]}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <button className="btn-cyber">
            {language === "ru" ? "Скачать CV" : "Download CV"}
          </button>
          <button 
            className="btn-cyber"
            onClick={scrollToNext}
          >
            {language === "ru" ? "Узнать больше" : "Learn More"}
          </button>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={scrollToNext}
          className="text-primary hover:text-accent transition-colors animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </motion.div>
    </section>
  );
}
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { SkillCard } from "@/components/SkillCard";
import { ProjectCard } from "@/components/ProjectCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle, Language } from "@/components/LanguageToggle";
import { useImageImports } from "@/hooks/useImageImports";
import resumeData from "@/data/resume.json";

const Index = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const { getImageUrl } = useImageImports();

  // Combine hard and soft skills for display
  const allSkills = [
    ...resumeData.skills.hardSkills,
    ...resumeData.skills.softSkills.map(skill => ({
      ...skill,
      name: skill.name[language],
      category: "soft"
    }))
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed header with controls */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-orbitron font-bold text-xl gradient-text"
          >
            {resumeData.personal.name[language]}
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {['about', 'skills', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-muted-foreground hover:text-primary transition-colors capitalize tracking-wider"
              >
                {section === 'about' && language === 'ru' ? 'Обо мне' :
                 section === 'skills' && language === 'ru' ? 'Навыки' :
                 section === 'projects' && language === 'ru' ? 'Проекты' :
                 section === 'contact' && language === 'ru' ? 'Контакты' :
                 section}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <LanguageToggle onLanguageChange={setLanguage} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero language={language} personalData={resumeData.personal} />

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 gradient-text">
              {language === "ru" ? "Обо мне" : "About Me"}
            </h2>
            <div className="w-24 h-1 bg-gradient-neon mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {resumeData.personal.description[language]}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative inline-block">
                <img
                  src={getImageUrl(resumeData.personal.avatar)}
                  alt={resumeData.personal.name[language]}
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-deep glow-cyber"
                />
                <div className="absolute -inset-4 bg-gradient-cyber rounded-2xl opacity-20 animate-pulse-glow"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-primary font-semibold min-w-[100px]">
                    {language === "ru" ? "Email:" : "Email:"}
                  </span>
                  <span className="text-muted-foreground">{resumeData.personal.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary font-semibold min-w-[100px]">
                    {language === "ru" ? "Телефон:" : "Phone:"}
                  </span>
                  <span className="text-muted-foreground">{resumeData.personal.phone}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary font-semibold min-w-[100px]">
                    {language === "ru" ? "Локация:" : "Location:"}
                  </span>
                  <span className="text-muted-foreground">{resumeData.personal.location[language]}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 relative cyber-grid">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 gradient-text">
              {language === "ru" ? "Навыки" : "Skills"}
            </h2>
            <div className="w-24 h-1 bg-gradient-neon mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground">
              {language === "ru" 
                ? "Нажмите на навык, чтобы увидеть уровень владения" 
                : "Click on a skill to see the proficiency level"}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allSkills.map((skill, index) => (
              <SkillCard
                key={index}
                skill={skill}
                language={language}
                isSelected={selectedSkill === index}
                onClick={() => setSelectedSkill(selectedSkill === index ? null : index)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 gradient-text">
              {language === "ru" ? "Проекты" : "Projects"}
            </h2>
            <div className="w-24 h-1 bg-gradient-neon mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground">
              {language === "ru" 
                ? "Некоторые из моих последних работ" 
                : "Some of my recent work"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumeData.projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                language={language}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
              initial={{opacity: 0, y: 50}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.8}}
              viewport={{once: true}}
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 gradient-text">
              {language === "ru" ? "Свяжитесь со мной" : "Get In Touch"}
            </h2>
            <div className="w-24 h-1 bg-gradient-neon mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground mb-12">
              {language === "ru"
                  ? "Готов обсудить новые возможности и интересные проекты"
                  : "Ready to discuss new opportunities and exciting projects"}
            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              <button
                  className="btn-cyber"
                  onClick={() => window.open(`mailto:${resumeData.contact.social.email}`, '_blank')}
              >
                {language === "ru" ? "Написать Email" : "Send Email"}
              </button>
              <button
                  className="btn-cyber"
                  onClick={() => window.open(resumeData.contact.social.github, '_blank')}
              >
                {language === "ru" ? "GitHub" : "GitHub"}
              </button>
              <button
                  className="btn-cyber"
                  onClick={() => window.open(resumeData.contact.social.telegram, '_blank')}
              >
                {language === "ru" ? "Telegram" : "Telegram"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 {resumeData.personal.name[language]}.
            {language === "ru" ? " Все права защищены." : " All rights reserved."}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

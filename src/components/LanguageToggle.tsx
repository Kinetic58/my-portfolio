import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export type Language = "ru" | "en";

interface LanguageToggleProps {
  onLanguageChange: (lang: Language) => void;
}

export function LanguageToggle({ onLanguageChange }: LanguageToggleProps) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null;
    const initialLang = savedLang || "en";
    setLanguage(initialLang);
    onLanguageChange(initialLang);
  }, [onLanguageChange]);

  const toggleLanguage = () => {
    const newLang: Language = language === "en" ? "ru" : "en";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
    onLanguageChange(newLang);
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className="relative overflow-hidden group glow-cyber hover:scale-110 transition-all duration-300 px-4"
    >
      <Globe className="h-4 w-4 mr-2 text-primary group-hover:text-accent transition-colors" />
      <span className="text-sm font-bold tracking-wider uppercase text-primary group-hover:text-accent">
        {language}
      </span>
    </Button>
  );
}
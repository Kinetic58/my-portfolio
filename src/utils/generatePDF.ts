import jsPDF from 'jspdf';
import resumeData from '@/data/resume.json';
import { robotoFontBase64 } from './roboto-normal-cyrillic-base64';

// Определяем типы для данных
type Language = 'ru' | 'en';

interface PersonalData {
    name: Record<Language, string>;
    title: Record<Language, string>;
    email: string;
    phone: string;
    location: Record<Language, string>;
    description: Record<Language, string>;
}

interface Skill {
    name: string;
    category: string;
}

interface SoftSkill {
    name: Record<Language, string>;
}

interface Project {
    title: string;
    description: Record<Language, string>;
    technologies: string[];
}

interface Social {
    github: string;
    telegram: string;
    email: string;
}

interface ResumeData {
    personal: PersonalData;
    skills: {
        hardSkills: Skill[];
        softSkills: SoftSkill[];
    };
    projects: Project[];
    contact: {
        social: Social;
    };
}

export const generatePDF = (language: Language = 'en') => {

    const doc = new jsPDF();
    console.log('PDF generation started...');
    doc.addFileToVFS('roboto-normal-cyrillic.ttf', robotoFontBase64);
    doc.addFont('roboto-normal-cyrillic.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto');

    const primaryColor: [number, number, number] = [0, 123, 255];
    const secondaryColor: [number, number, number] = [108, 117, 125];
    const accentColor: [number, number, number] = [220, 53, 69];

    let yPosition = 20;

    // Заголовок с именем
    doc.setFontSize(28);
    doc.setTextColor(...primaryColor);
    doc.text(resumeData.personal.name[language], 20, yPosition);

    yPosition += 10;
    doc.setFontSize(16);
    doc.setTextColor(...secondaryColor);
    doc.text(resumeData.personal.title[language], 20, yPosition);

    yPosition += 20;

    // Контактная информация
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`${language === 'ru' ? 'Email:' : 'Email:'} ${resumeData.personal.email}`, 20, yPosition);
    yPosition += 6;
    doc.text(`${language === 'ru' ? 'Телефон:' : 'Phone:'} ${resumeData.personal.phone}`, 20, yPosition);
    yPosition += 6;
    doc.text(`${language === 'ru' ? 'Локация:' : 'Location:'} ${resumeData.personal.location[language]}`, 20, yPosition);

    yPosition += 15;

    // О себе
    doc.setFontSize(16);
    doc.setTextColor(...primaryColor);
    doc.text(language === 'ru' ? 'О СЕБЕ' : 'ABOUT ME', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const aboutText = resumeData.personal.description[language];
    const splitAbout = doc.splitTextToSize(aboutText, 170);
    doc.text(splitAbout, 20, yPosition);
    yPosition += splitAbout.length * 5 + 10;

    // Технические навыки
    doc.setFontSize(16);
    doc.setTextColor(...primaryColor);
    doc.text(language === 'ru' ? 'ТЕХНИЧЕСКИЕ НАВЫКИ' : 'TECHNICAL SKILLS', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);

    // Группировка навыков по категориям с правильными типами
    const skillsByCategory: Record<string, Skill[]> = {};
    resumeData.skills.hardSkills.forEach((skill: Skill) => {
        if (!skillsByCategory[skill.category]) {
            skillsByCategory[skill.category] = [];
        }
        skillsByCategory[skill.category].push(skill);
    });

    Object.entries(skillsByCategory).forEach(([category, skills]) => {
        const categoryName = getCategoryName(category, language);

        doc.setTextColor(...accentColor);
        doc.text(`${categoryName}:`, 25, yPosition);
        yPosition += 5;

        doc.setTextColor(0, 0, 0);
        const skillNames = skills.map(skill => skill.name).join(', ');
        const splitSkills = doc.splitTextToSize(skillNames, 160);
        doc.text(splitSkills, 30, yPosition);
        yPosition += splitSkills.length * 4 + 5;
    });

    yPosition += 5;

    // Личные качества
    if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
    }

    doc.setFontSize(16);
    doc.setTextColor(...primaryColor);
    doc.text(language === 'ru' ? 'ЛИЧНЫЕ КАЧЕСТВА' : 'SOFT SKILLS', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const softSkillNames = resumeData.skills.softSkills
        .map(skill => skill.name[language])
        .join(', ');
    const splitSoftSkills = doc.splitTextToSize(softSkillNames, 170);
    doc.text(splitSoftSkills, 20, yPosition);
    yPosition += splitSoftSkills.length * 5 + 15;

    // Проекты
    if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
    }

    doc.setFontSize(16);
    doc.setTextColor(...primaryColor);
    doc.text(language === 'ru' ? 'ПРОЕКТЫ' : 'PROJECTS', 20, yPosition);
    yPosition += 8;

    resumeData.projects.forEach((project: Project) => {
        if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
        }

        doc.setFontSize(12);
        doc.setTextColor(...accentColor);
        doc.text(project.title, 20, yPosition);
        yPosition += 6;

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const projectDesc = doc.splitTextToSize(project.description[language], 170);
        doc.text(projectDesc, 20, yPosition);
        yPosition += projectDesc.length * 4 + 3;

        doc.setTextColor(...secondaryColor);
        const techText = `${language === 'ru' ? 'Технологии:' : 'Technologies:'} ${project.technologies.join(', ')}`;
        const splitTech = doc.splitTextToSize(techText, 170);
        doc.text(splitTech, 20, yPosition);
        yPosition += splitTech.length * 4 + 8;
    });

    // Контакты
    if (yPosition > 230) {
        doc.addPage();
        yPosition = 20;
    }

    doc.setFontSize(16);
    doc.setTextColor(...primaryColor);
    doc.text(language === 'ru' ? 'КОНТАКТЫ' : 'CONTACT & LINKS', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`GitHub: ${resumeData.contact.social.github}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Telegram: ${resumeData.contact.social.telegram}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Email: ${resumeData.contact.social.email}`, 20, yPosition);

    // Футер
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(...secondaryColor);
        doc.text(
            `${resumeData.personal.name[language]} - ${language === 'ru' ? 'Резюме' : 'Resume'} | ${language === 'ru' ? 'Страница' : 'Page'} ${i}/${pageCount}`,
            20,
            285
        );
    }

    return doc;
};

function getCategoryName(category: string, language: Language): string {
    const categories: Record<string, Record<Language, string>> = {
        'frontend': { ru: 'Frontend', en: 'Frontend' },
        'backend': { ru: 'Backend', en: 'Backend' },
        'database': { ru: 'Базы данных', en: 'Databases' },
        'devops': { ru: 'DevOps', en: 'DevOps' },
        'tools': { ru: 'Инструменты', en: 'Tools' }
    };

    return categories[category]?.[language] || category;
}
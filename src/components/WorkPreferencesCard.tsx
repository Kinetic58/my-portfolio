import { motion } from "framer-motion";
import { Clock, MapPin, Briefcase, Plane, Globe, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WorkPreferencesCardProps {
    language: "en" | "ru";
}

interface PreferenceItem {
    icon: React.ElementType;
    titleRu: string;
    titleEn: string;
    valueRu: string;
    valueEn: string;
    color: string;
}

const preferences: PreferenceItem[] = [
    {
        icon: Clock,
        titleRu: "График работы",
        titleEn: "Work Schedule",
        valueRu: "Удалённая работа",
        valueEn: "Remote work",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: Briefcase,
        titleRu: "Тип занятости",
        titleEn: "Employment Type",
        valueRu: "Полная занятость, Частичная занятость",
        valueEn: "Full-time, Part-time",
        color: "from-purple-500 to-pink-500"
    },
    {
        icon: MapPin,
        titleRu: "Время в пути до работы",
        titleEn: "Commute Time",
        valueRu: "Не имеет значения",
        valueEn: "Doesn't matter",
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: Plane,
        titleRu: "Командировки",
        titleEn: "Business Trips",
        valueRu: "Не могу",
        valueEn: "Not available",
        color: "from-orange-500 to-red-500"
    },
    {
        icon: Globe,
        titleRu: "Английский язык",
        titleEn: "English Level",
        valueRu: "B2",
        valueEn: "B2",
        color: "from-indigo-500 to-blue-500"
    },
    {
        icon: TrendingUp,
        titleRu: "Развитие",
        titleEn: "Development",
        valueRu: "Машинное обучение и Data Science",
        valueEn: "Machine Learning & Data Science",
        color: "from-yellow-500 to-orange-500"
    }
];

export function WorkPreferencesCard({ language }: WorkPreferencesCardProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            rotateX: -15,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 12,
                duration: 0.6
            }
        }
    };

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 10,
                delay: 0.2
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                delay: 0.3
            }
        }
    };

    return (
        <section className="py-20 px-6 relative overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 gradient-text">
                        {language === "ru" ? "Предпочтения к работе" : "Work Preferences"}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-neon mx-auto mb-8"></div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {language === "ru"
                            ? "Мои предпочтения и возможности для работы"
                            : "My work preferences and capabilities"}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {preferences.map((preference, index) => {
                        const IconComponent = preference.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.05,
                                    rotateY: 5,
                                    transition: { duration: 0.3 }
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="group perspective-1000"
                            >
                                <Card className="relative h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                                    {/* Gradient background overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${preference.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                    {/* Animated border glow */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${preference.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />

                                    <CardContent className="p-6 relative z-10">
                                        <div className="flex flex-col items-center text-center space-y-4">
                                            {/* Icon with animation */}
                                            <motion.div
                                                variants={iconVariants}
                                                className={`relative p-4 rounded-full bg-gradient-to-br ${preference.color} group-hover:scale-110 transition-transform duration-300`}
                                            >
                                                <IconComponent className="w-8 h-8 text-white" />

                                                {/* Pulse effect */}
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                        opacity: [0.5, 0, 0.5]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${preference.color}`}
                                                />
                                            </motion.div>

                                            {/* Title */}
                                            <motion.h3
                                                variants={textVariants}
                                                className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300"
                                            >
                                                {language === "ru" ? preference.titleRu : preference.titleEn}
                                            </motion.h3>

                                            {/* Value */}
                                            <motion.p
                                                variants={textVariants}
                                                className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed"
                                            >
                                                {language === "ru" ? preference.valueRu : preference.valueEn}
                                            </motion.p>
                                        </div>

                                        {/* Floating particles effect */}
                                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                            {[...Array(3)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{
                                                        y: [-10, -20, -10],
                                                        x: [0, 5, 0],
                                                        opacity: [0, 0.3, 0]
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        delay: i * 0.5,
                                                        ease: "easeInOut"
                                                    }}
                                                    className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${preference.color} opacity-0 group-hover:opacity-30`}
                                                    style={{
                                                        left: `${20 + i * 30}%`,
                                                        top: `${80 - i * 10}%`
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <div className="absolute top-10 left-10 w-20 h-20 border border-primary/20 rounded-full animate-pulse" />
                <div className="absolute bottom-10 right-10 w-16 h-16 border border-accent/20 rounded-full animate-bounce" />
                <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-secondary/20 rounded-full animate-ping" />
            </div>
        </section>
    );
}
"use client";

import { Code2, Database, Server, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n";

const technologies = [
  "Dashboard Sistem",
  "Manajemen Data",
  "Website Company",
  "Landing Page",
  "Sistem Informasi",
  "E-Catalog",
  "Admin Panel",
  "Custom Solution",
];

export default function About() {
  const { t } = useI18n();

  const skills = [
    {
      icon: Server,
      title: t("skill.backend"),
      description: t("skill.backend.desc"),
    },
    {
      icon: Database,
      title: t("skill.database"),
      description: t("skill.database.desc"),
    },
    {
      icon: Code2,
      title: t("skill.frontend"),
      description: t("skill.frontend.desc"),
    },
    {
      icon: Layers,
      title: t("skill.fullstack"),
      description: t("skill.fullstack.desc"),
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
              {t("about.section")}
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight">
              {t("about.title1")}
              <span className="text-zinc-400"> {t("about.title2")}</span>
            </h2>
            <p className="mt-6 text-zinc-600 leading-relaxed">
              {t("about.p1")}
            </p>
            <p className="mt-4 text-zinc-600 leading-relaxed">
              {t("about.p2")}
            </p>

            {/* Tech stack */}
            <div className="mt-8">
              <p className="text-sm font-medium text-zinc-900 mb-3">{t("about.techStack")}</p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 shadow-subtle"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill) => (
              <Card
                key={skill.title}
                className="group hover:border-zinc-300 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-zinc-900 transition-colors">
                    <skill.icon className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-zinc-900">{skill.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

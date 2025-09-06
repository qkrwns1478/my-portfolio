"use client";
import { useState, useEffect } from "react";
import { projects as projectList } from '@/data/projects';
import { useSettingsStore } from '../store/settingsStore';
import { techIconMap } from '../utils/techIcons';
import Button from "../components/Button";
import ResponsiveText from "../components/ResponsiveText";
import ImageModal from "../components/ImageModal";
import ProjectImage from "../components/ProjectImage";

const getAllCategories = (projects: typeof projectList) => {
  const categories = projects.flatMap(p => p.category || []);
  return [...new Set(categories)].sort();
};

function parsePeriod(period: string): Date | null {
  const match = period.match(/(\d{4})\.(\d{2})/);
  if (!match) return null;
  const [_, year, month] = match;
  return new Date(Number(year), Number(month) - 1);
}

export default function Projects() {
  const { language } = useSettingsStore();
  const [isHydrated, setIsHydrated] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const allCategories = getAllCategories(projectList);

  const filteredProjects = projectList
    .filter((p) => {
      const translation = p.translations[language];
      const inCategory = selectedCategory
        ? Array.isArray(p.category) && p.category.includes(selectedCategory)
        : true;
      const matchesSearch = searchText.trim() === "" ||
        translation.title.toLowerCase().includes(searchText.toLowerCase()) ||
        translation.desc?.toLowerCase().includes(searchText.toLowerCase()) ||
        translation.summary.toLowerCase().includes(searchText.toLowerCase());
      return inCategory && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = parsePeriod(a.period);
      const dateB = parsePeriod(b.period);
      if (!dateA || !dateB) return 0;
      return sortOrder === "latest"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="p-6">
      <section className="max-w-6xl mx-auto space-y-6 py-10">
        <div>
          <Button href="/">← {language === "Kor" ? "홈으로 돌아가기" : "Back to Home"}</Button>
        </div>
        <h2 className="text-4xl font-bold text-white">Projects</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`text-xs px-3 py-1 rounded-full border transition ${
              !selectedCategory ? "bg-cyan-300 text-black" : "text-cyan-300 border-cyan-300 hover:bg-cyan-300 hover:text-black"
            }`}
          >
            {language === "Kor" ? "전체 보기" : "All"}
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1 rounded-full border transition ${
                selectedCategory === cat
                  ? "bg-cyan-300 text-black"
                  : "text-cyan-300 border-cyan-300 hover:bg-cyan-300 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={language === "Kor" ? "프로젝트 이름 검색" : "Search project name"}
            className="w-full border border-cyan-300 bg-transparent text-white px-4 py-2 rounded-md placeholder:text-cyan-300"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "latest" | "oldest")}
            className="text-sm px-3 py-2 border border-cyan-300 bg-slate-700 text-white rounded-md"
          >
            <option value="latest">{language === "Kor" ? "최신순" : "Latest"}</option>
            <option value="oldest">{language === "Kor" ? "오래된순" : "Oldest"}</option>
          </select>
        </div>

        <div className="space-y-10">
          {filteredProjects.map((project) => {
            const t = project.translations[language];
            return (
              <div
                key={project.id}
                className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/40 transition-all duration-300 hover:transform space-y-4"
              >
                {project.details && (
                  <Button href={project.details} className="absolute top-4 right-4 text-sm px-3 py-1">
                    {language === "Kor" ? "더보기 →" : "Details →"}
                  </Button>
                )}

                <div>
                  <h3 className="text-2xl font-semibold text-cyan-300">
                    {t.desc ? <ResponsiveText values={[t.title, t.desc]} separator=" - " isDesc={true}/> : t.title}
                  </h3>
                  <code className="text-sm text-indigo-300">{project.period}</code>
                </div>

                <p className="text-violet-200">{t.summary}</p>

                <div className="flex flex-col md:flex-row gap-8 pt-4">
                  <div className="flex-1 space-y-4">
                    {t.asis && (
                      <div>
                        <p className="text-cyan-300 font-semibold">AS-IS</p>
                        <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                          {t.asis.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    )}
                    {t.challenge && (
                      <div>
                        <p className="text-cyan-300 font-semibold">Challenge</p>
                        <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                          {t.challenge.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    )}
                    {t.tobe && (
                      <div>
                        <p className="text-cyan-300 font-semibold">TO-BE</p>
                        <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                          {t.tobe.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    )}
                    {t.role && (
                      <div>
                        <p className="text-cyan-300 font-semibold">What I did</p>
                        <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                          {t.role.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    )}
                    {project.stack && (
                      <div>
                        <p className="text-cyan-300 font-semibold">Tech Stack</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {(project.stack as string[]).map((tech: string) => {
                            const IconComponent = techIconMap[tech];
                            return (
                              <span 
                                key={tech} 
                                className="flex items-center gap-2 px-4 py-2 bg-cyan-900/20 border border-cyan-500/30 text-cyan-300 rounded-full text-sm font-medium hover:border-cyan-400/50 hover:bg-cyan-900/30 transition-all duration-200"
                              >
                                {IconComponent && <IconComponent className="w-4 h-4" />}
                                {tech}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:underline mt-2 inline-block text-cyan-300">
                          GitHub ↗
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline mt-2 inline-block text-cyan-300">
                          {language === "Kor" ? "링크 ↗" : "Link ↗"}
                        </a>
                      )}
                      {project.video && (
                        <a href={project.video} target="_blank" rel="noopener noreferrer" className="hover:underline mt-2 inline-block text-cyan-300">
                          {language === "Kor" ? "발표영상 ↗" : "Video ↗"}
                        </a>
                      )}
                    </div>
                  </div>

                  <ProjectImage
                    projectId={project.id}
                    projectTitle={t.title}
                    onClick={(imageUrl) => setModalImage(imageUrl)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {modalImage && (
        <ImageModal src={modalImage} onClose={() => setModalImage(null)} />
      )}
    </div>
  );
}

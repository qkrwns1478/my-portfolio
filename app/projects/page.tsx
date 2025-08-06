"use client";
import { useState } from "react";
import { projects as projectList } from '@/data/projects';
import Button from "../components/Button";
import ResponsiveText from "../components/ResponsiveText";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const allCategories = getAllCategories(projectList);

  const filteredProjects = projectList
    .filter((p) => {
      const inCategory = selectedCategory
        ? Array.isArray(p.category) && p.category.includes(selectedCategory)
        : true;
      const matchesSearch = searchText.trim() === "" ||
        p.title.toLowerCase().includes(searchText.toLowerCase()) ||
        p.desc?.toLowerCase().includes(searchText.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchText.toLowerCase());
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

  return (
    <>
      <div>
        <Button href="/">← 홈으로 돌아가기</Button>
      </div>

      <section className="space-y-6 py-10">
        <h2 className="text-4xl font-bold text-white">Projects</h2>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`text-xs px-3 py-1 rounded-full border transition ${
              !selectedCategory ? "bg-cyan-300 text-black" : "text-cyan-300 border-cyan-300 hover:bg-cyan-300 hover:text-black"
            }`}
          >
            전체 보기
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
            placeholder="프로젝트 이름 검색"
            className="w-full border border-cyan-300 bg-transparent text-white px-4 py-2 rounded-md placeholder:text-cyan-300"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "latest" | "oldest")}
            className="text-sm px-3 py-2 border border-cyan-300 bg-slate-700 text-white rounded-md"
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
        </div>

        <div className="space-y-10">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="relative border border-white/10 rounded-xl p-6 shadow-md bg-slate-800 space-y-4"
            >
              {project.details && (
                <Button href={project.details} className="absolute top-4 right-4 text-sm px-3 py-1">더보기 →</Button>
              )}

              <div>
                <h3 className="text-2xl font-semibold text-cyan-300">{
                  project.desc ? <ResponsiveText values={[project.title, project.desc]} separator=" - " isDesc={true}/> : project.title
                }</h3>
                <code className="text-sm text-indigo-300">{project.period}</code>
              </div>

              <p className="text-violet-200">{project.summary}</p>

              {project.asis && (
                <div>
                  <p className="text-cyan-300 font-semibold">[AS-IS]</p>
                  <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                    {project.asis.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.challenge && (
                <div>
                  <p className="text-cyan-300 font-semibold">[Challenge]</p>
                  <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                    {project.challenge.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.tobe && (
                <div>
                  <p className="text-cyan-300 font-semibold">[TO-BE]</p>
                  <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                    {project.tobe.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.role && (
                <div>
                  <p className="text-cyan-300 font-semibold">My Role</p>
                  <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                    {project.role.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.stack && (
                <div>
                  <p className="text-cyan-300 font-semibold">Tech Stack</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-cyan-900 text-cyan-100 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline mt-2 inline-block text-cyan-300"
                  >
                    GitHub ↗
                  </a>
                )}
                {project.video && (
                  <a
                    href={project.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline mt-2 inline-block text-cyan-300"
                  >
                    발표영상 ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

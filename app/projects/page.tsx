import Link from "next/link";
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <>
    <div>
      <Link href="/">
        <button className="px-4 py-2 border border-cyan-300 text-cyan-300 rounded hover:bg-cyan-300 hover:text-black transition">
          ← 홈으로 돌아가기
        </button>
      </Link>
    </div>
    <section className="space-y-10 py-10">
      <h2 className="text-4xl font-bold text-white">🛠 Projects</h2>

      {projects.map((project, idx) => (
        <div
          key={idx}
          className="relative border border-white/10 rounded-xl p-6 shadow-md bg-slate-800 space-y-4"
        >
          {project.details && (
            <Link href={project.details}>
              <button className="absolute top-4 right-4 text-sm px-3 py-1 border border-cyan-300 text-cyan-300 rounded hover:bg-cyan-300 hover:text-black transition">
                더보기 →
              </button>
            </Link>
          )}

          <div>
            <h3 className="text-2xl font-semibold text-cyan-300">{project.title}</h3>
            <p className="text-sm text-indigo-300">{project.period}</p>
          </div>

          <p className="text-violet-200">{project.summary}</p>

          {project.asis && (
            <div>
              <p className="text-cyan-300 font-medium">[AS-IS]</p>
              <p className="text-violet-200">{project.asis}</p>
            </div>
          )}

          {project.challenge && (
            <div>
              <p className="text-cyan-300 font-medium">[Challenge]</p>
              <ul className="list-disc list-inside text-violet-200 space-y-1">
                {project.challenge.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {project.tobe && (
            <div>
              <p className="text-cyan-300 font-medium">[TO-BE]</p>
              <ul className="list-disc list-inside text-violet-200 space-y-1">
                {project.tobe.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {project.role && (
            <div>
              <p className="text-cyan-300 font-medium">🔧 내 역할</p>
              <ul className="list-disc list-inside text-violet-200 space-y-1">
                {project.role.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {project.stack && (
            <div>
              <p className="text-cyan-300 font-medium">🛠 Tech Stack</p>
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
        </div>
      ))}
    </section>
    </>
  );
}

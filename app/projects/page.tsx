import Link from "next/link";
import { projects } from '@/data/projects';
import Button from "../components/Button";
import ResponsiveText from "../components/ResponsiveText";

export default function Projects() {
  return (
    <>
    <div>
      <Button href="/">← 홈으로 돌아가기</Button>
    </div>
    <section className="space-y-10 py-10">
      <h2 className="text-4xl font-bold text-white">Projects</h2>

      {projects.map((project, idx) => (
        <div
          key={idx}
          className="relative border border-white/10 rounded-xl p-6 shadow-md bg-slate-800 space-y-4"
        >
          {project.details && (
            <Button href={project.details} className="absolute top-4 right-4 text-sm px-3 py-1">더보기 →</Button>
          )}

          <div>
            <h3 className="text-2xl font-semibold text-cyan-300">{
              project.desc ? <ResponsiveText values={[project.title, project.desc]} separator=" - "/> : project.title
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
    </section>
    </>
  );
}

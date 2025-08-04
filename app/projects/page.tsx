interface Project {
  title: string;
  description: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: 'KlickLab - 클릭스트림 분석 플랫폼',
    description: 'SDK 한 줄로 사용자 행동을 수집하고, 실시간 시각화 및 전환율 분석까지 제공하는 데이터 분석 플랫폼',
    link: 'https://github.com/Eatventory/KlickLab'
  },
  {
    title: 'title',
    description: 'description',
  },
  {
    title: 'title',
    description: 'description',
  },
];

export default function Projects() {
  return (
    <section className="space-y-10 py-10">
      <h2 className="text-4xl font-bold">🛠 Projects</h2>
      {projects.map((project, idx) => (
        <div
          key={idx}
          className="border border-white/10 rounded-xl p-6 shadow-md bg-slate-800"
        >
          <h3 className="text-2xl font-semibold text-cyan-300">{project.title}</h3>
          <p className="mt-2 text-violet-200">{project.description}</p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              className="hover:underline mt-3 inline-block text-cyan-300"
            >
              GitHub ↗
            </a>
          )}
        </div>
      ))}
    </section>
  );
}

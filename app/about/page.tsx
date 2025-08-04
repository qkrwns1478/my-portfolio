export default function About() {
  return (
    <section className="space-y-6 py-10">
      <h2 className="text-4xl font-bold">👨‍💻 About Me</h2>
      <p className="text-violet-200">
        저는 다양한 문제를 직접 부딪히며 해결해온 경험을 통해 성장한 개발자입니다.
        백엔드와 프론트엔드를 모두 경험했으며, 실전 프로젝트에서 기획부터 배포까지 주도적으로 참여했습니다.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-indigo-400">
        <li><strong>기술스택</strong>: TypeScript, Next.js, ClickHouse, PostgreSQL, AWS</li>
        <li><strong>대표 경험</strong>: 클릭스트림 분석 플랫폼, 키오스크 버전 관리 웹앱</li>
        <li><strong>특징</strong>: 빠른 적응력, 주도적 문제 해결, 커뮤니케이션 중심의 협업</li>
      </ul>
    </section>
  );
}
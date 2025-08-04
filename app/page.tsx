import Head from 'next/head'

export default function Home() {
  return (
    <section className="text-center space-y-6 py-12">
      <h1 className="text-5xl font-extrabold tracking-tight">안녕하세요, 박준식입니다 👋</h1>
      <p className="text-lg max-w-xl mx-auto text-violet-200">
        창의적인 시도와 실전 중심 프로젝트를 즐기는 풀스택 개발자입니다.<br />
        기술의 본질을 이해하고, 사용자 경험을 설계하는 데 집중합니다.
      </p>
      <div className="flex justify-center space-x-6 text-lg font-medium">
        <a href="/about" className="text-cyan-300 hover:underline">💁‍♂️ 자기소개</a>
        <a href="/projects" className="text-cyan-300 hover:underline">🛠 프로젝트</a>
      </div>
    </section>
  );
}
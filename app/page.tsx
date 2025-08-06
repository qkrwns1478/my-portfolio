import ResponsiveText from "./components/ResponsiveText";
import Button from "./components/Button";

export default function Home() {
  return (
    <section className="text-center space-y-6 py-12 px-4 sm:px-6 md:px-12">
      <h1 className="text-3xl xs:text-4xl sm:text-5xl font-extrabold tracking-tight">
        <ResponsiveText values={["안녕하세요,", "박준식입니다"]} />
      </h1>

      <p className="text-base sm:text-lg max-w-xl mx-auto text-violet-200">
        <ResponsiveText
          values={[
            "창의적인 시도와 실전 중심 프로젝트를 즐기는", "풀스택 개발자입니다.",
            "기술의 본질을 이해하고,", "사용자 경험을 설계하는 데 집중합니다.",
          ]}
          groupSize={2}
        />
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-6 space-y-3 sm:space-y-0">
        <Button href="/about" className="w-40">About Me</Button>
        <Button href="/projects" className="w-40">Projects</Button>
      </div>
    </section>
  );
}
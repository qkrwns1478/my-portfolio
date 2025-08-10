'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, Zap, Target, TrendingUp } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ResponsiveText from './components/ResponsiveText';
import { useSettingsStore } from './store/settingsStore';

const Button = ({
  href,
  className = '',
  children
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className={`group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 border border-cyan-500/20 backdrop-blur-sm ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
    </Link>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => {
  return (
    <div className="group p-6 bg-slate-800/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105">
      <div className="mb-4">
        <Icon className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      </div>
      <h3 className="text-lg font-bold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-300/80 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default function Home() {
  const { language } = useSettingsStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const features = [
    {
      icon: Code2,
      title: language === "Kor" ? "풀스택 개발" : "Fullstack Develop",
      description: language === "Kor" ? "React, Next.js, Node.js를 활용한 완전한 웹 솔루션 개발" : "Complete Web Solution Develop with React, Next.js, Node.js"
    },
    {
      icon: Zap,
      title: language === "Kor" ? "성능 최적화" : "Performance Optimization",
      description: language === "Kor" ? "빠른 로딩과 원활한 사용자 경험을 위한 최적화 전문" : "Optimization expertise for fast loading and seamless user experience"
    },
    {
      icon: Target,
      title: language === "Kor" ? "사용자 중심" : "User-centered",
      description: language === "Kor" ? "직관적이고 접근성 높은 인터페이스 설계" : "Intuitive, Accessible Interface Design"
    },
    {
      icon: TrendingUp,
      title: language === "Kor" ? "확장 가능한 구조" : "Extensible Structure",
      description: language === "Kor" ? "미래 확장을 고려한 견고한 아키텍처 설계" : "Robust architectural design for future expansion"
    }
  ];

  const techStacks = ['React', 'Next.js', 'TypeScript', 'Node.js', 'C', 'Python', 'PostgreSQL', 'MongoDB', 'ClickHouse'];

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500/5 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/10 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s'}} />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-40 right-1/3 w-48 h-48 bg-gradient-to-r from-cyan-400/10 to-blue-400/15 rounded-full blur-2xl animate-bounce" style={{animationDuration: '8s', animationDelay: '1s'}} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDY3LDE1NiwyMDIsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPgo8L3N2Zz4=')] opacity-40" />

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-ping" style={{animationDelay: '0s', animationDuration: '3s'}} />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-ping" style={{animationDelay: '1s', animationDuration: '4s'}} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-400/35 rounded-full animate-ping" style={{animationDelay: '2s', animationDuration: '5s'}} />
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-300/25 rounded-full animate-ping" style={{animationDelay: '0.5s', animationDuration: '3.5s'}} />
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-blue-300/20 rounded-full animate-ping" style={{animationDelay: '1.5s', animationDuration: '4.5s'}} />
      </div>

      {/* Hero Section */}
      <section className="text-center space-y-8 py-16 px-4 sm:px-6 md:px-12 relative overflow-hidden">
        {/* Additional floating elements for hero */}
        <div className="absolute top-10 left-10 animate-float">
          <Code2 className="w-8 h-8 text-cyan-400/20" />
        </div>
        <div className="absolute top-20 right-20 animate-float" style={{animationDelay: '1s'}}>
          <Zap className="w-6 h-6 text-blue-400/20" />
        </div>
        <div className="absolute bottom-20 left-20 animate-float" style={{animationDelay: '2s'}}>
          <Target className="w-7 h-7 text-purple-400/20" />
        </div>

        <div className={"relative z-10 transition-all duration-1000"}>
          <h1 className="text-4xl xs:text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
            <ResponsiveText
              values={language === "Kor" ? ["안녕하세요,", "박준식입니다"] : ["Hello!", "I'm ParkJS"]}
              className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent slide-in-blur-top"
            />
          </h1>

          <div className="text-lg sm:text-xl max-w-2xl mx-auto text-slate-200/90 leading-relaxed mb-8">
            <ResponsiveText
              values={language === "Kor" ? [
                "창의적인 시도와 실전 중심 프로젝트를 즐기는", "풀스택 개발자입니다.",
                "기술의 본질을 이해하고,", "사용자 경험을 설계하는 데 집중합니다.",
              ] : [
                "A full-stack developer who enjoys", "creative attempts and hands-on projects",
                "Understand the nature of technology and", "focus on designing user experiences",
              ]}
              groupSize={language === "Kor" ? 2 : 1}
              className="fade-in-expand"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-6 space-y-4 sm:space-y-0 mb-12">
            <Button href="/about" className="w-48 fade-in-expand">
              About Me
            </Button>
            <Button href="/projects" className="w-48 fade-in-expand">
              Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {language === "Kor" ? "전문 분야" : "Specialized Field"}
            </span>
          </h2>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <ResponsiveText
              values={language === "Kor" ? ["다양한 기술 스택과 경험을 바탕으로", "완성도 높은 솔루션을 제공합니다."] : ["Provide high-quality solutions", "based on a variety of technology stacks and experiences"]}
              className="text-slate-300/70"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Preview */}
      <section className="py-16 px-4 sm:px-6 md:px-12 bg-slate-800/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {language === "Kor" ? "주요 기술 스택" : "Key Tech Stacks"}
            </span>
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {techStacks.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-cyan-900/20 border border-cyan-500/30 text-cyan-300 rounded-full text-sm font-medium hover:border-cyan-400/50 hover:bg-cyan-900/30 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="text-center mb-12 max-w-2xl mx-auto leading-relaxed">
            <ResponsiveText
              values={language === "Kor" ? ["최신 기술 트렌드를 파악하고", "최적화된 기술 스택을 선택하여", "효율적이고 확장 가능한 솔루션을 구현합니다."] :
                ["Identify the latest technology trends", "and choose an optimized tech stack", "to implement efficient and scalable solutions"]
              }
              className="text-slate-300/70"
              groupSize={2}
            />
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="py-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {language == "Kor" ? "더 알아보기" : "Learn More"}
            </span>
          </h2>
          <p className="text-slate-300/70 text-center mb-12 max-w-2xl mx-auto">
            {language === "Kor" ? "개발 과정과 기술적 인사이트를 공유하고 소통합니다" : "Share and communicate the development process and technical insights"}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* GitHub Card */}
            <div className="group bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full flex items-center justify-center mr-4">
                  <FaGithub className="w-6 h-6 text-white"/>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">GitHub</h3>
                  <p className="text-slate-400 text-sm">{language === "Kor" ? "오픈소스 & 프로젝트" : "Open Source & Project"}</p>
                </div>
              </div>

              <p className="text-slate-300/80 mb-6 leading-relaxed">
                {language === "Kor"
                  ? "실제 개발한 프로젝트들의 소스코드와 기술적 구현 방식을 확인해보세요. 다양한 기술 스택으로 만든 실전 프로젝트들이 있습니다."
                  : "Check out the source code and technical implementation of the projects you actually developed. There are hands-on projects made from various tech stacks."}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2"></div>
                    10+ Repositories
                  </span>
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                    Active
                  </span>
                </div>
                <a
                  href="https://github.com/qkrwns1478"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  {language === "Kor" ? "방문하기" : "Visit"}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Blog Card */}
            <div className="group bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
                  <img src="/munsik.ico" className="w-8 h-8"/>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">Tech Blog</h3>
                  <p className="text-slate-400 text-sm">{language === "Kor" ? "개발 인사이트 & 경험" : "Dev Insights & Experiences"}</p>
                </div>
              </div>

              <p className="text-slate-300/80 mb-6 leading-relaxed">
                {language === "Kor"
                  ? "개발하면서 마주한 문제들과 해결 과정, 새로운 기술에 대한 학습 내용을 정리하고 공유합니다. 실무에서 얻은 인사이트를 나눕니다."
                  : "Organize and share learning about problems, solutions, and new technologies encountered during development. Share insights from practice."}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                    Weekly Posts
                  </span>
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
                    Tech Focus
                  </span>
                </div>
                <a
                  href="https://munsik22.tistory.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  {language === "Kor" ? "방문하기" : "Visit"}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
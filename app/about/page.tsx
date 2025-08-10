"use client";
import { useEffect, useState } from "react";
import { FaGithub, FaBookOpen } from "react-icons/fa";
import Button from "../components/Button";
import { useSettingsStore } from '../store/settingsStore';

export default function About() {
  const { language }= useSettingsStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="p-6">
      <section className="max-w-6xl mx-auto space-y-6 py-10">
        <div>
          <Button href="/">{language === "Kor" ? "← 홈으로 돌아가기" : "← Back to Home"}</Button>
        </div>
        <h2 className="text-4xl font-bold text-white">About Me</h2>
        <div className="space-y-4 text-violet-200">
          <h3 className="text-xl font-semibold text-cyan-300">
            {language === "Kor" ? `"문제를 구조화하고, 끝까지 해결하는 개발자"` : `"Developer who structure and solve problems to the end"`}
          </h3>
          <p>
            {language === "Kor" ?
              `저는 반도체에 관심이 있어 전자공학을 전공으로 선택했지만,
              1학년 때 처음 접한 C언어 프로그래밍 수업을 계기로 제 진로가 바뀌기 시작했습니다.
              문제를 코드로 해결해나가는 과정이 너무 재미있었고,
              이후에는 임베디드 실험, 백오피스 개발, 실시간 대시보드 프로젝트까지
              다양한 환경에서 개발을 경험하며 점점 더 개발자의 길을 확신하게 되었습니다.` : 
              `I chose electronic engineering as my major because I was interested in semiconductors,
              but my career path began to change with the C language programming class I first encountered in my first year.
              The process of solving problems with code was so much fun,
              and since then, I have experienced development in a variety of environments,
              from embedded experiments, back-office development to real-time dashboard projects,
              that I have become increasingly convinced of the developer's path.`
            }
          </p>
          <p>
            {language === "Kor" ?
              `CS 기초를 탄탄히 다지기 위해 크래프톤 정글에서 운영체제, 알고리즘, 네트워크 등 전산학 기반을 집중적으로 학습했고,
              지금은 기술을 넘어 문제를 해결하는 구조를 설계하는 개발자를 목표로 성장하고 있습니다.` : 
              `I intensively learned the computer science foundations such as operating systems, algorithms, and networks at the Krafton Jungle,
              and now I am growing with the aim of designing structures that solve problems beyond technology.`
            }
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-cyan-300">Profile</h3>
          <div className="group bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/40 transition-all duration-300 hover:transform">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 text-violet-200 text-base">
              <p><span className="text-cyan-300 font-semibold">{language === "Kor" ? "이름" : "Name"}</span> {language === "Kor" ? "박준식" : "Junsik Park"}</p>
              <p><span className="text-cyan-300 font-semibold">MBTI</span> ISFJ</p>
              <p><span className="text-cyan-300 font-semibold">{language === "Kor" ? "생년월일" : "Date of birth"}</span> 2000.02.15</p>
              <p><span className="text-cyan-300 font-semibold">{language === "Kor" ? "이메일" : "Email"}</span> qkrwns1478@gmail.com</p>
              <p><span className="text-cyan-300 font-semibold">{language === "Kor" ? "거주지" : "Location"}</span> {language === "Kor" ? "대구광역시 북구" : "Daegu, Republic of Korea"}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com/qkrwns1478"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaGithub className="text-cyan-300"/> Github
                </a>

                <a
                  href="https://munsik22.tistory.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaBookOpen className="text-cyan-300"/> Blog
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-cyan-300">Education</h3>
          <ul className="list-disc pl-6 text-violet-200">
            <li>
              <strong className="text-cyan-300">{language === "Kor" ? "경북대학교 전자공학부 학사" : "Bachelor of Electronics Engineering, Kyungpook National University"}</strong> <span><code>2019.03 - 2025.08</code></span>
              <ul className="list-[square] pl-6">
                <li>{language === "Kor" ? "임베디드 시스템, MCU 제어 등 하드웨어 기반 실험 수행" : "Perform hardware-based experiments : Embedded systems, MCU control, etc"}</li>
              </ul>
            </li>
            <li>
              <strong className="text-cyan-300">{language === "Kor" ? "크래프톤 정글 8기 수료" : "KRAFTON JUNGLE 8th"}</strong> <span><code>2025.03 - 2025.07</code></span>
              <ul className="list-[square] pl-6">
                <li>{language === "Kor" ? 
                  "OS(PintOS), 네트워크, 자료구조, 알고리즘 등 CS 기반 집중 교육" : 
                  "CS-based intensive training : OS(PintOS), network, data structure, algorithms, etc"
                }</li>
                <li>{language === "Kor" ? "실전 프로젝트를 통해 백엔드/풀스택 실무 경험" : "Backend/Full-Stack hands-on experience with hands-on projects"}</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-cyan-300">Experience</h3>
          <ul className="list-disc pl-6 text-violet-200">
            <li>
              <strong className="text-cyan-300">moki | {language === "Kor" ? "키오스크 버전 관리 웹 백오피스 개발 (현장실습)" : "Kiosk Version Management Web Back Office Development (Internship)"}</strong> <span><code>2024.01 - 2024.02</code></span>
              <ul className="list-[square] pl-6">
                <li>{language === "Kor" ? "전국 사업지 단말기별 APK 버전 현황 조회 / 배포 기능 구현" : "Inquiry of APK version status by business terminal nationwide / implementation of distribution function"}</li>
                <li>{language === "Kor" ? "관리자 권한, 업데이트 로그 추적 등 백오피스 실무 경험" : "Back-office hands-on experience, including administrator permissions, tracking update logs, etc"}</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-cyan-300">Tech Stack</h3>
          <div className="group bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/40 transition-all duration-300 hover:transform">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-cyan-300 mb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                <img src="https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white" alt="C" />
                <img src="https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white" alt="C++" />
                <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
                <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
                <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold text-cyan-300 mb-2">Backend</h4>
              <div className="flex flex-wrap gap-2">
                <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
                <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
                <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" />
                <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
                <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
                <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
                <img src="https://img.shields.io/badge/ClickHouse-FFDD00?style=for-the-badge&logo=clickhouse&logoColor=black" alt="ClickHouse" />
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold text-cyan-300 mb-2">Frontend</h4>
              <div className="flex flex-wrap gap-2">
                <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
                <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
                <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
                <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand" />
                <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
                <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-cyan-300 mb-2">DevOps</h4>
              <div className="flex flex-wrap gap-2">
                <img src="https://img.shields.io/badge/AWS EC2-FF9900?style=for-the-badge&logo=amazon-ec2&logoColor=white" alt="AWS EC2" />
                <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-cyan-300">{language === "Kor" ? "이런 개발자가 되고 싶어요" : "My Goals"}</h3>
          <ul className="list-disc pl-6 text-violet-200 space-y-2">
            <li>
              <strong className="text-cyan-300">{language === "Kor" ? "시스템을 이해하며 개발하는 사람" : "An expert who understands and develops systems"}</strong><br />
              {language === "Kor" ? "단순 구현을 넘어, 데이터 흐름과 병목을 이해하고 최적화하는 데에 관심이 많습니다." : "Beyond simple implementation, understanding and optimizing data flows and bottlenecks is my concern."}
            </li>
            <li>
              <strong className="text-cyan-300">{language === "Kor" ? "실행력 있는 문제 해결자" : "A viable problem solver"}</strong><br />
              {language === "Kor" ? "아무도 맡지 않으려는 어려운 문제일수록 직접 해결하려고 합니다. 빠르게 실험하고 고치며 정답을 찾아가는 과정이 즐겁습니다." : "If it's a difficult problem that no one wants to take on, I try to solve it myself. It's fun to experiment quickly, fix it, and find the right answer."}
            </li>
            <li>
              <strong className="text-cyan-300">{language === "Kor" ? "성장에 진심인 동료" : "A growing colleague"}</strong><br />
              {language === "Kor" ? "협업은 내 성장의 가속기라고 생각합니다. 코드 리뷰, 역할 분담, 팀 기획까지 모두 적극적으로 참여해왔습니다." : "I think collaboration is the accelerator of my growth. I've been actively involved in code review, role-sharing, and team planning."}
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
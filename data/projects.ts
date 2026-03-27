export interface Project {
  id: string;
  category: string[];
  period: string;
  stack?: string[];
  github?: string;
  link?: string;
  video?: string;
  details?: string;
  translations: {
    [key in 'Kor' | 'Eng']: {
      title: string;
      desc?: string;
      summary: string;
      asis?: string[];
      challenge?: string[];
      tobe?: string[];
      role?: string[];
    }
  }
}

export const projects: Project[] = [
  {
    id: 'boj-banner-maker',
    category: ['Frontend', 'Backend'],
    period: '2026.03',
    stack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'],
    github: 'https://github.com/qkrwns1478/boj-banner-maker',
    link: 'https://boj-banner-maker.vercel.app/',
    translations: {
      Kor: {
        title: '백준 문제 배너 생성기',
        desc: '백준(BOJ) 문제 배너 이미지 생성 서비스',
        summary: 'Solved.ac API를 활용하여 백준 알고리즘 문제 정보를 바탕으로 동적 배너 이미지를 생성하는 웹 애플리케이션',
        // asis: [],
        // challenge: [],
        // tobe: [],
        role: [
          'Next.js API Routes를 활용한 동적 배너 이미지 생성 로직 구현',
          'Solved.ac API 연동 및 문제 데이터 파싱'
        ]
      },
      Eng: {
        title: 'BOJ Banner Maker',
        desc: 'Baekjoon(BOJ) Problem Banner Image Generator',
        summary: 'A web application that generates dynamic banner images based on Baekjoon problem information using the Solved.ac API.',
        // asis: [],
        // challenge: [],
        // tobe: [],
        role: [
          'Implemented dynamic banner image generation logic using Next.js API Routes.',
          'Integrated Solved.ac API and parsed problem data.'
        ]
      }
    }
  },
  {
    id: 'alicelingo',
    category: ['Frontend', 'Backend'],
    period: '2026.02 – 2026.03',
    stack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Supabase', 'OpenAI'],
    github: 'https://github.com/qkrwns1478/alicelingo',
    link: 'https://alicelingo.vercel.app',
    translations: {
      Kor: {
        title: 'AliceLingo',
        desc: 'AI 기반 어학 학습 플랫폼',
        summary: 'Groq API와 Supabase를 활용한 맞춤형 어학 학습 및 AI 평가 서비스',
        // asis: [],
        // challenge: [],
        // tobe: [],
        role: [
          'Next.js 및 Supabase를 활용한 풀스택 로직 및 사용자 인증 구현',
          'Groq API를 연동한 실시간 음성 인식 및 AI 채점 파이프라인 구축',
          'Levenshtein 알고리즘을 활용한 독자적인 발음/문법 피드백 시스템 개발'
        ]
      },
      Eng: {
        title: 'AliceLingo',
        desc: 'AI-Based Language Learning Platform',
        summary: 'A personalized language learning and AI evaluation service using Groq API and Supabase.',
        // asis: [],
        // challenge: [],
        // tobe: [],
        role: [
          'Implemented full-stack logic and user authentication using Next.js and Supabase.',
          'Built a real-time voice recognition and AI grading pipeline using Groq API.',
          'Developed a proprietary pronunciation/grammar feedback system using the Levenshtein algorithm.'
        ]
      }
    }
  },
  {
    id: 'namu-clone',
    category: ['Frontend'],
    period: '2026.02 – 2026.02',
    stack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Prisma'],
    github: 'https://github.com/qkrwns1478/namu-clone',
    translations: {
      Kor: {
        title: '나무위키 클론',
        desc: '위키 서비스 클론 프로젝트',
        summary: 'Next.js와 Prisma를 활용하여 나무위키의 문서 열람, 편집, 역사 등의 핵심 기능을 구현한 클론 프로젝트',
        // asis: [],
        // challenge: [],
        // tobe: [],
        role: [
          '프론트엔드 및 백엔드 전반 로직 구현',
          '마크다운 및 위키 문법 파싱/렌더링 로직 개발',
          'Prisma를 활용한 데이터베이스 구조 설계 및 API 구현'
        ]
      },
      Eng: {
        title: 'Namu Clone',
        desc: 'Wiki Service Clone Project',
        summary: 'A clone project of Namuwiki implementing core features such as viewing, editing, and history using Next.js and Prisma.',
        // asis: [],
        // challenge: [],
        // tobe: [],
        role: [
          'Full-stack frontend and backend development',
          'Developed markdown and wiki syntax parsing/rendering logic',
          'Designed database schema and implemented APIs using Prisma'
        ]
      }
    }
  },
  {
    id: 'shopping-mall-front',
    category: ['Frontend'],
    period: '2025.11 – 2025.12',
    stack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Framer'],
    github: 'https://github.com/qkrwns1478/shopping-mall-front',
    translations: {
      Kor: {
        title: '쇼핑몰 웹사이트 (프론트엔드)',
        desc: '이커머스 프론트엔드 웹 애플리케이션',
        summary: 'Next.js와 React 기반으로 구축된 쇼핑몰 프론트엔드 프로젝트로, 상품 탐색부터 결제까지의 사용자 경험(UX)을 고려한 UI 구현',
        // asis: [],
        // challenge: [],
        // tobe: [],
        role: [
          'Next.js를 활용한 쇼핑몰 프론트엔드 전반 로직 구현',
          'Framer Motion 및 Dnd-kit을 이용한 동적 UI 및 인터랙션 적용',
          'React Hook Form을 활용한 효율적인 폼 상태 관리 및 유효성 검증'
        ]
      },
      Eng: {
        title: 'Shopping Mall Website (Frontend)',
        desc: 'E-commerce Frontend Web Application',
        summary: 'A shopping mall frontend project built with Next.js and React, implementing UI with a focus on user experience (UX) from product browsing to checkout.',
        // asis: [],
        // challenge: [],
        // tobe: [],
        role: [
          'Implemented overall frontend logic for the shopping mall using Next.js',
          'Applied dynamic UI and interactions using Framer Motion and Dnd-kit',
          'Efficient form state management and validation using React Hook Form'
        ]
      }
    }
  },
  {
    id: 'shopping-mall-back',
    category: ['Backend'],
    period: '2025.11 – 2025.12',
    stack: ['Java', 'Spring', 'Springboot', 'MySQL'],
    github: 'https://github.com/qkrwns1478/shopping-mall-back',
    translations: {
      Kor: {
        title: '쇼핑몰 API 서버 (백엔드)',
        desc: '이커머스 백엔드 REST API 서버',
        summary: 'Spring Boot 기반의 쇼핑몰 백엔드 프로젝트로, 회원 인증, 상품 관리, 주문 처리 등의 핵심 비즈니스 로직과 API 설계',
        // asis: [],
        // challenge: [],
        // tobe: [],
        role: [
          'Spring Boot 및 Spring Data JPA를 활용한 안정적인 백엔드 아키텍처 구축',
          'Spring Security를 적용한 사용자 인증 및 권한 관리 구조 설계',
          '이메일 인증(Spring Mail) 구현 및 Swagger(Springdoc)를 활용한 API 문서화'
        ]
      },
      Eng: {
        title: 'Shopping Mall API Server (Backend)',
        desc: 'E-commerce Backend REST API Server',
        summary: 'A shopping mall backend project based on Spring Boot, focusing on designing APIs and core business logic such as user authentication, product management, and order processing.',
        // asis: [],
        // challenge: [],
        // tobe: [],
        role: [
          'Built a robust backend architecture using Spring Boot and Spring Data JPA',
          'Designed user authentication and authorization structure using Spring Security',
          'Implemented email verification (Spring Mail) and API documentation using Swagger (Springdoc)'
        ]
      }
    }
  },
  {
    id: 'eip-practice',
    category: ['Frontend'],
    period: '2025.10 – 2025.12',
    stack: ['Vue.js', 'Vite', 'JavaScript'],
    github: 'https://github.com/qkrwns1478/eip-practice',
    translations: {
      Kor: {
        title: '정보처리기사 실기 퀴즈 앱',
        summary: '정보처리기사 실기 대비 랜덤 퀴즈 애플리케이션',
        // asis: [],
        // challenge: [],
        // tobe: [],
        role: ['Vue.js 학습 및 적용']
      },
      Eng: {
        title: 'EIP Practice',
        summary: 'Random Quiz Application for Engineer Information Processing Test',
        // asis: [],
        // challenge: [],
        // tobe: [],
        role: ['Learning and applying Vue.js']
      },
    }
  },
  {
    id: 'my-activity-graph',
    category: ['Frontend'],
    period: '2025.08',
    stack: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Vercel'],
    github: 'https://github.com/qkrwns1478/my-activity-graph',
    link: 'https://activity-graph-generator.vercel.app/',
    translations: {
      Kor: {
        title: 'Activity Graph Generator',
        desc: '동적 깃허브 스타일 활동 그래프 생성기',
        summary: '일일 활동 데이터를 시각화하여 프로필 README를 꾸밀 수 있는 동적 SVG 그래프 생성 도구',
        role: ['프론트엔드 및 백엔드 개발', 'SVG 생성 로직 및 동적 테마/애니메이션 구현'],
      },
      Eng: {
        title: 'Activity Graph Generator',
        desc: 'Dynamic GitHub-Style Activity Graph Generator',
        summary: 'A tool to generate a dynamic, GitHub-style activity graph (heatmap calendar) for your profile README',
        role: ['Frontend & Backend development', 'Implemented SVG generation logic and dynamic themes/animations'],
      }
    }
  },
  {
    id: 'my-portfolio',
    category: ['Frontend'],
    period: '2025.08 – 2025.09',
    stack: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Zustand', 'Vercel'],
    github: 'https://github.com/qkrwns1478/my-portfolio',
    translations: {
      Kor: {
        title: `ParkJS' DEV SPACE`,
        desc: '개인 포트폴리오 웹사이트',
        summary: '기술 스택, 경험, 그리고 진행했던 프로젝트들을 소개합니다.',
        challenge: ['Vercel 배포 후 이미지 최초 로딩 시 3초 정도의 지연이 발생하는 이슈'],
        tobe: ['useEffect를 사용하여 컴포넌트가 마운트될 때 필요한 모든 이미지를 미리 로드하여 렌더링 지연 문제를 해결'],
        role: ['전체 프로젝트 기획 및 개발', 'UI/UX 디자인 및 인터랙션 구현', '다국어 지원 및 상태 관리'],
      },
      Eng: {
        title: `ParkJS' DEV SPACE`,
        desc: 'Personal Portfolio Website',
        summary: 'Introduce my tech stack, experience, and projects',
        challenge: ['An issue where there was a delay of about 3 seconds when the image was first loaded after deploying to Vercel'],
        tobe: ['Resolved the rendering delay issue and by preloading all necessary images when the component mounts using useEffect'],
        role: ['Full project planning and development', 'UI/UX design and interaction implementation', 'Multilingual support and state management'],
      }
    }
  },
  {
    id: 'klicklab',
    category: ['Frontend', 'Backend'],
    period: '2025.06 – 2025.07',
    stack: ['React', 'Zustand', 'TailwindCSS', 'Node.js', 'ClickHouse', 'Kafka', 'AWS EC2'],
    github: 'https://github.com/Eatventory/KlickLab',
    video: 'https://www.youtube.com/watch?v=j3gBUdQbYz4',
    details: '/projects/klicklab',
    translations: {
      Kor: {
        title: 'KlickLab',
        desc: '클릭스트림 분석 플랫폼',
        summary: 'SDK 한 줄로 사용자 행동을 수집하고, 실시간 시각화 및 전환율 분석까지 제공하는 데이터 분석 플랫폼',
        asis: ['모든 이벤트 로그를 단일 DB에서 조회하면서 쿼리 응답 속도가 매우 느려짐', '쓰기/읽기 작업이 동시에 이뤄지며 병목 현상이 발생함.'],
        challenge: ['ClickHouse 기반의 컬럼형 DB 도입으로 조회 성능 개선', '시간 단위 Materialized View 설계 및 집계 테이블 구성', '읽기/쓰기 DB를 물리적으로 분리하는 CQRS 패턴 적용', '그래프 조건부 렌더링 최적화 및 필터링 로직 구현'],
        tobe: ['1천만 건 기준 응답 속도 99.43% 단축', 'RPS 3,900 → 10,600 이상으로 증가 (GC 분산 전략)', '1인 쇼핑몰 유저를 위한 인사이트 대시보드 완성'],
        role: ['ClickHouse 쿼리 설계 및 실시간 집계 구조 구축', '참여도 분석 대시보드 프론트엔드에서 비동기 렌더링 최적화', '커스텀 그래프 툴팁/필터 구현'],
      },
      Eng: {
        title: 'KlickLab',
        desc: 'Clickstream Analysis Platform',
        summary: 'A data analytics platform that collects user behavior with a single line of SDK and provides real-time visualization and conversion rate analysis.',
        asis: ['Query response speed was very slow due to querying all event logs from a single DB.', 'A bottleneck occurred as read/write operations were performed simultaneously.'],
        challenge: ['Improved query performance by introducing a ClickHouse-based columnar DB.', 'Designed time-unit Materialized View and aggregate tables.', 'Applied CQRS pattern to physically separate read/write DBs.', 'Optimized graph conditional rendering and implemented filtering logic.'],
        tobe: ['Reduced response time by 99.43% for 10 million records.', 'Increased RPS from 3,900 to over 10,600 (GC distribution strategy).', 'Completed an insight dashboard for single-person shopping mall users.'],
        role: ['Designed ClickHouse queries and built a real-time aggregation structure.', 'Optimized async-rendering on the engagement analysis dashboard F/E.', 'Implemented custom graph tooltips/filters.'],
      }
    }
  },
  {
    id: 'pintos',
    category: ['OS'],
    period: '2025.05 – 2025.06',
    stack: ['C', 'QEMU', 'GDB', 'Makefile'],
    github: 'https://github.com/qkrwns1478/pintos-kaist',
    translations: {
      Kor: {
        title: 'KAIST PintOS',
        desc: '운영체제 프로젝트',
        summary: '운영체제 핵심 구조를 직접 구현하며 시스템 수준의 동시성, 인터페이스, 메모리 모델 등을 설계하고 검증한 팀 프로젝트',
        challenge: ['Thread: Priority Donation Chain 구현 및 동기화 구조 설계', 'System Call: 사용자 ↔ 커널 인터페이스 직접 구현', 'Virtual Memory: Lazy Loading, Stack Growth 등 가상 메모리 설계'],
        tobe: ['수만 라인 규모 커널 분석 및 구조 기반 협업 경험', 'Race Condition, 페이지 폴트 등 OS 내부 개념 체득'],
        role: ['스케줄러, 시스템 콜, 가상 메모리 전반 구현 및 테스트 주도 개발', '동기화 문제 해결 및 인터페이스 안정성 설계'],
      },
      Eng: {
        title: 'KAIST PintOS',
        desc: 'Operating System Project',
        summary: 'A team project to design and verify system-level concurrency, interfaces, and memory models by implementing the core structure of an operating system.',
        challenge: ['Thread: Implemented Priority Donation Chain and designed synchronization structure.', 'System Call: Directly implemented user ↔ kernel interface.', 'Virtual Memory: Designed virtual memory including Lazy Loading, Stack Growth, etc.'],
        tobe: ["Experience in analyzing a kernel of tens of thousands of lines and collaborating based on its structure.", "Gained understanding of OS internal concepts like Race Condition, page faults, etc."],
        role: ["Implemented and led test-driven development for the scheduler, system calls, and virtual memory.", "Solved synchronization problems and designed interface stability."],
      }
    }
  },
  {
    id: 'fortune-cookie',
    category: ['Frontend'],
    period: '2025.03',
    stack: ['TailwindCSS', 'JavaScript', 'Python', 'Flask', 'Jinja', 'MongoDB'],
    github: 'https://github.com/qkrwns1478/digital-fortune-cookie',
    translations: {
      Kor: {
        title: '디지털 포춘 쿠키',
        desc: '일일 운세 확인 플랫폼',
        summary: '운세를 랜덤으로 제공하는 디지털 포춘 쿠키 웹 애플리케이션',
        asis: ['포춘쿠키 열기 버튼을 빠르게 연속 클릭하면 ajax 요청이 중복 발생하며 동시성 문제가 발생함.', '하루에 한 번만 열 수 있는 제약이 무력화될 수 있었음.'],
        challenge: ['하루 한 번만 포춘쿠키 열 수 있도록 MongoDB Atomic Update 적용', '행운 점수에 가중치 기반 확률 알고리즘 도입', '운세 메시지를 이벤트/결과/조언 요소로 분해하여 조합', 'JWT 기반 로그인 인증 및 토큰 무효화 처리', 'MongoDB 정렬 알고리즘 기반 행운 점수 랭킹 시스템 구현'],
        tobe: ['사용자 맞춤 운세 생성 알고리즘 완성', '버튼 연타 시 ajax 중복 요청으로 발생하는 동시성 문제를, 최초 클릭 시 버튼 비활성화 방식으로 해결', '보안성과 UX를 모두 고려한 간결한 운세 체험 서비스 제공'],
        role: ['프론트엔드 개발 및 포춘쿠키 대시보드 UI/UX 구현', 'Flask 백엔드 서버 연동 및 AWS 서버 배포'],
      },
      Eng: {
        title: 'Digital Fortune Cookie',
        desc: 'Daily Fortune Check Platform',
        summary: 'A digital fortune cookie web application that provides random fortunes.',
        asis: ['Concurrency issues occurred due to duplicate ajax requests when the "Open Fortune Cookie" button was clicked rapidly and repeatedly.', 'The "once-a-day" constraint could be bypassed.'],
        challenge: ['Applied MongoDB Atomic Update to ensure the cookie can only be opened once a day.', 'Introduced a weight-based probability algorithm for luck scores.', 'Composed fortune messages by breaking them down into event/result/advice elements.', 'Implemented JWT-based login authentication and token invalidation.', "Implemented a luck score ranking system based on MongoDB's sorting algorithm."],
        tobe: ['Completed a user-customized fortune generation algorithm.', 'Resolved the concurrency issue from duplicate ajax requests on rapid button clicks by disabling the button after the first click.', 'Provided a concise fortune-telling service considering both security and UX.'],
        role: ['F/E development and UI/UX implementation for the fortune cookie dashboard.', 'Integrated with the Flask B/E server and deployed to an AWS server.'],
      }
    }
  },
  {
    id: 'stm32-fan',
    category: ['Embedded'],
    period: '2024.03 – 2024.06',
    stack: ['STM32F', 'Embedded C'],
    video: 'https://www.youtube.com/watch?v=8qhFRJbyApA',
    translations: {
      Kor: {
        title: 'STM32 선풍기 제어 시스템',
        desc: '전공 프로젝트',
        summary: '인터럽트 기반 사용자 입력을 처리하고 PWM 제어를 안정화한 MCU 임베디드 제어 프로젝트',
        asis: ['인터럽트 기반 처리 중 변수 값 불일치', 'PWM 제어 구조 부재로 인한 실시간 반응 실패'],
        challenge: ['하드웨어 레지스터 직접 제어를 통해 GPIO, PWM 설정', 'volatile 키워드를 활용한 인터럽트/루프 간 동기화 보장'],
        tobe: ['버튼 입력에 따라 즉각적으로 선풍기 강도 변경', 'MCU 수준에서 동작하는 안정적인 제어 로직 구현'],
        role: ['MCU 코드 작성, 회로 설계, 디버깅', '인터럽트 동기화 및 실시간 반응 로직 구현'],
      },
      Eng: {
        title: 'STM32 Fan Control System',
        desc: 'Major Project',
        summary: 'An MCU embedded control project that processes interrupt-based user input and stabilizes PWM control.',
        asis: ['Variable value mismatch during interrupt-based processing.', 'Failure of real-time response due to the absence of a PWM control structure.'],
        challenge: ['Configured GPIO and PWM through direct control of hardware registers.', 'Ensured synchronization between interrupts and loops using the `volatile` keyword.'],
        tobe: ['Fan intensity changes immediately according to button input.', 'Implemented stable control logic operating at the MCU level.'],
        role: ['MCU coding, circuit design, debugging', 'Implemented interrupt synchronization and real-time response logic.'],
      }
    }
  },
  {
    id: 'kiosk-version',
    category: ['Frontend', 'Backend'],
    period: '2024.01 – 2024.02',
    stack: ['jQuery', 'PHP', 'MySQL'],
    details: '/projects/kiosk-backoffice',
    translations: {
      Kor: {
        title: '키오스크 버전 관리',
        desc: '현장실습 과제 프로젝트',
        summary: '사업장 단말기별 APK 버전 현황 조회 및 안정적인 분할 업로드 기능을 지원하는 관리자용 백오피스 시스템',
        asis: ['APK 배포가 수동으로 이뤄짐.', '업로드 중 오류 발생 시 전체 파일이 유실됨.', '사업장별 버전 관리가 어려웠음.'],
        challenge: ['APK 파일 분할 업로드 및 서버 병합 로직 설계', '사업장별 설치 버전 일괄 조회 기능 구현', '업로드 이력 확인 및 관리자 UI 개발'],
        tobe: ['대용량 업로드 중 실패율 감소 및 재전송 기능 확보', '현장 단말기 상태를 중앙에서 통합 관리할 수 있는 구조 완성'],
        role: ['관리자 웹 UI 및 업로드 페이지 개발', '분할 업로드 / 서버 병합 로직 구현', '설치 현황 조회 및 이력 확인 기능 개발'],
      },
      Eng: {
        title: 'Kiosk Version Management',
        desc: 'Internship Field Training Project',
        summary: "An admin back-office system that supports querying APK version status for each business location's terminal and features stable chunked uploads.",
        asis: ['APK distribution was done manually.', 'The entire file was lost if an error occurred during upload.', 'Version management for each business location was difficult.'],
        challenge: ['Designed chunked APK file upload and server-side merging logic.', 'Implemented a feature to batch-query installed versions for each business location.', 'Developed upload history tracking and the administrator UI.'],
        tobe: ['Reduced failure rate for large file uploads and secured re-transmission functionality.', 'Completed a structure for centrally managing the status of on-site terminals.'],
        role: ['Developed the admin web UI and upload page.', 'Implemented chunked upload / server-side merging logic.', 'Developed features for querying installation status and checking history.'],
      }
    }
  }
];

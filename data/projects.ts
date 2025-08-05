// data/projects.ts
export interface Project {
  title: string;
  period: string;
  summary: string;
  asis?: string;
  challenge?: string[];
  tobe?: string[];
  role?: string[];
  stack?: string[];
  link?: string;
  details?: string;
}

export const projects: Project[] = [
  {
    title: '📊 KlickLab - 클릭스트림 분석 플랫폼',
    period: '2025.06 – 2025.07 (크래프톤 정글, 팀 프로젝트)',
    summary:
      'SDK 한 줄로 사용자 행동을 수집하고, 실시간 시각화 및 전환율 분석까지 제공하는 데이터 분석 플랫폼',
    asis:
      '모든 이벤트 로그를 단일 DB에서 조회하면서 쿼리 응답 속도가 매우 느리고, 쓰기/읽기 작업이 동시에 이뤄지며 병목 현상이 발생함.',
    challenge: [
      'ClickHouse 기반의 컬럼형 DB 도입으로 조회 성능 개선',
      '시간 단위 Materialized View 설계 및 집계 테이블 구성',
      '읽기/쓰기 DB를 물리적으로 분리하는 CQRS 패턴 적용',
      '그래프 조건부 렌더링 최적화 및 필터링 로직 구현',
    ],
    tobe: [
      '1천만 건 기준 응답 속도 99.43% 단축',
      'RPS 3,900 → 10,600 이상으로 증가 (GC 분산 전략)',
      '1인 쇼핑몰 유저를 위한 인사이트 대시보드 완성',
    ],
    role: [
      'ClickHouse 쿼리 설계 및 실시간 집계 구조 구축',
      '대시보드 프론트엔드에서 비동기 렌더링 최적화, 커스텀 그래프 툴팁/필터 구현',
      '페이지별 이탈률, 전환율 계산 로직 설계'
    ],
    stack: [
      'React',
      'Zustand',
      'TailwindCSS',
      'Node.js',
      'ClickHouse',
      'Kafka',
      'AWS EC2',
    ],
    link: 'https://github.com/Eatventory/KlickLab',
    details: '/projects/klicklab',
  },
  {
    title: '🧵 KAIST PintOS - 운영체제 프로젝트',
    period: '2025.03 – 2025.07 (크래프톤 정글)',
    summary:
      '운영체제 핵심 구조를 직접 구현하며 시스템 수준의 동시성, 인터페이스, 메모리 모델 등을 설계하고 검증한 팀 프로젝트',
    challenge: [
      'Thread: Priority Donation Chain 구현 및 동기화 구조 설계',
      'System Call: 사용자 ↔ 커널 인터페이스 직접 구현',
      'Virtual Memory: Lazy Loading, Stack Growth 등 가상 메모리 설계',
    ],
    tobe: [
      '수만 라인 규모 커널 분석 및 구조 기반 협업 경험',
      'Race Condition, 페이지 폴트 등 OS 내부 개념 체득',
    ],
    role: [
      '스케줄러, 시스템 콜, 가상 메모리 전반 구현 및 테스트 주도 개발',
      '동기화 문제 해결 및 인터페이스 안정성 설계'
    ],
    stack: ['C', 'QEMU', 'GDB', 'Makefile'],
    details: '/projects/pintos',
  },
  {
    title: '🥠 디지털 포춘 쿠키',
    period: '2025.03.10 – 2025.03.13 (크래프톤 정글, 팀 프로젝트)',
    summary: '운세를 랜덤으로 제공하는 디지털 포춘 쿠키 웹 애플리케이션',
    asis:
    '운세는 랜덤으로 제공되지만, 포춘쿠키 열기 버튼을 빠르게 연속 클릭하면 ajax 요청이 중복 발생하며 동시성 문제가 발생함. 하루에 한 번만 열 수 있는 제약이 무력화될 수 있었음.',
    challenge: [
      '하루 한 번만 포춘쿠키 열 수 있도록 MongoDB Atomic Update 적용',
      '행운 점수에 가중치 기반 확률 알고리즘 도입',
      '운세 메시지를 이벤트/결과/조언 요소로 분해하여 조합',
      'JWT 기반 로그인 인증 및 토큰 무효화 처리',
      'MongoDB 정렬 알고리즘 기반 행운 점수 랭킹 시스템 구현',
    ],
    tobe: [
      '사용자 맞춤 운세 생성 알고리즘 완성',
      '버튼 연타 시 ajax 중복 요청으로 발생하는 동시성 문제를, 최초 클릭 시 버튼 비활성화 방식으로 해결',
      '보안성과 UX를 모두 고려한 간결한 운세 체험 서비스 제공',
    ],
    role: [
      '프론트엔드 개발 및 포춘쿠키 대시보드 UI/UX 구현',
      'Flask 백엔드 서버 연동 및 AWS 서버 배포'
    ],
    stack: ['TailwindCSS', 'JavaScript', 'Python', 'Flask', 'Jinja', 'MongoDB'],
    link: 'https://github.com/qkrwns1478/digital-fortune-cookie',
  },
  {
    title: '🌀 STM32 선풍기 제어 시스템',
    period: '2024.03 – 2024.06 (전공 프로젝트)',
    summary:
      '인터럽트 기반 사용자 입력을 처리하고 PWM 제어를 안정화한 MCU 임베디드 제어 프로젝트',
    asis:
      '인터럽트 기반 처리 중 변수 값 불일치 및 PWM 제어 구조 부재로 인한 실시간 반응 실패',
    challenge: [
      '하드웨어 레지스터 직접 제어를 통해 GPIO, PWM 설정',
      'volatile 키워드를 활용한 인터럽트/루프 간 동기화 보장',
    ],
    tobe: [
      '버튼 입력에 따라 즉각적으로 선풍기 강도 변경',
      'MCU 수준에서 동작하는 안정적인 제어 로직 구현',
    ],
    role: [
      '전 과정 개인 수행 (MCU 코드 작성, 회로 설계, 디버깅)',
      '인터럽트 동기화 및 실시간 반응 로직 구현'
    ],
    stack: ['STM32F', 'Embedded C'],
  },
  {
    title: '🧾 키오스크 버전 관리 백오피스',
    period: '2024.01 – 2024.02 (현장실습, moki)',
    summary:
      '사업장 단말기별 APK 버전 현황 조회 및 안정적인 분할 업로드 기능을 지원하는 관리자용 백오피스 시스템',
    asis:
      'APK 배포가 수동으로 이뤄졌고, 업로드 중 오류 발생 시 전체 파일이 유실됨. 사업장별 버전 관리가 어려웠음.',
    challenge: [
      'APK 파일 분할 업로드 및 서버 병합 로직 설계',
      '사업장별 설치 버전 일괄 조회 기능 구현',
      '업로드 이력 확인 및 관리자 UI 개발',
    ],
    tobe: [
      '대용량 업로드 중 실패율 감소 및 재전송 기능 확보',
      '현장 단말기 상태를 중앙에서 통합 관리할 수 있는 구조 완성',
    ],
    role: [
      '관리자 웹 UI 및 업로드 페이지 개발',
      '분할 업로드 / 서버 병합 로직 구현',
      '설치 현황 조회 및 이력 확인 기능 개발'
    ],
    stack: ['JavaScript', 'PHP', 'MySQL'],
    details: '/projects/kiosk-backoffice',
  },
];

# ParkJS' DEV SPACE - 포트폴리오 사이트
<p align="center">
    <img src="./public/robo1.png" width="256" height="256">
</p>

개인 포트폴리오 웹사이트입니다. 저의 기술 스택, 경험, 그리고 진행했던 프로젝트들을 소개하기 위해 만들어졌습니다.

방문자들이 제 작업물을 쉽게 탐색하고, 저라는 개발자에 대해 더 깊이 이해할 수 있도록 직관적이고 인터랙티브한 UI/UX를 제공하는 데 중점을 두었습니다.

## 주요 기능

* **반응형 디자인**: 데스크탑, 태블릿, 모바일 등 모든 디바이스에서 최적의 경험을 제공합니다.
* **다국어 지원**: 한국어와 영어를 모두 지원하여 사용자가 원하는 언어로 콘텐츠를 볼 수 있습니다.
* **인터랙티브 메뉴**: 사용자의 재미를 위해 두 가지 다른 스타일의 메뉴(Robo, Dew)를 선택할 수 있습니다.
* **동적 프로젝트 필터링**: 카테고리, 검색, 정렬 기능을 통해 원하는 프로젝트를 쉽게 찾아볼 수 있습니다.
* **이력서 열람 및 다운로드**: 사이트 내에서 이력서를 바로 확인하고 PDF 파일로 다운로드할 수 있습니다.
* **reCAPTCHA 기반 문의하기**: 스팸을 방지하고 안전하게 문의 메일을 보낼 수 있는 기능을 구현했습니다.

## 기술 스택

![React](https://img.shields.io/badge/React-20232A?style=badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=badge&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=badge&logo=zustand&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=badge&logo=vercel&logoColor=white)

## 트러블 슈팅

### [Problem] Vercel 배포 후 이미지 최초 로딩 지연 발생

Vercel에 배포 후 RoboMenu 컴포넌트의 `roboImage` 경로가 바뀔 때, 해당 이미지가 캐시되어 있지 않다면 브라우저에서 최초 렌더링 시 3초 정도의 지연이 발생하는 이슈를 인지했습니다. 이로 인해 사용자 경험이 저하될 수 있었습니다.

### [Solution]

1.  **`next/image` 대신 `<img>` 태그 사용** → ❌
    * `next/image`의 자동 이미지 최적화 기능이 원인일 수 있다고 판단하여 기본 `<img>` 태그로 변경했으나, 로딩 지연 문제는 해결되지 않았습니다.

2.  **Vercel Function Region 변경** → ❌
    * 서버와 사용자 간의 물리적 거리를 줄여 응답 속도를 개선하고자 Vercel의 Function Region을 기본값(Washington, D.C.)에서 `Seoul (South Korea)`로 변경했습니다. 하지만 이미지 로딩 속도에 유의미한 변화는 없었습니다.

3.  **이미지 프리로딩 로직 추가** → ⭕
    * **`useEffect`를 사용하여 컴포넌트가 마운트될 때 필요한 모든 이미지를 미리 로드**하는 `imagesToPreload` 배열을 만들었습니다.
    * 이 배열을 순회하며 `new Image()`를 통해 이미지를 백그라운드에서 미리 로드하도록 하여, 실제 이미지가 필요한 시점에는 캐시된 이미지를 즉시 사용할 수 있도록 구현했습니다.

    ```javascript
    useEffect(() => {
        const imagesToPreload = [
          '/robo1.png',
          '/robo2.png',
          '/robo3.png',
          '/robo4.png',
          '/robo5.png',
          '/robo6.png',
        ];
      
        imagesToPreload.forEach((image) => {
          const img = new Image();
          img.src = image;
        });
      }, []);
    ```

    결과적으로 이 방법을 통해 이미지 전환 시 발생하던 렌더링 지연 문제를 해결하고, 자연스로운 사용자 경험을 제공할 수 있었습니다.
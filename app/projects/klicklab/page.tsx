"use client";
import { useState, useEffect } from 'react';
import ResponsiveText from "../../components/ResponsiveText";
import Button from "../../components/Button";
import { useSettingsStore } from '../../store/settingsStore';

export default function KlickLabDetail() {
  const { language } = useSettingsStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="p-6">
      <section className="max-w-6xl mx-auto space-y-10 py-10">
        <div>
          <Button href="/projects">← {language === "Kor" ? "프로젝트 목록으로 돌아가기" : "Back to Projects"}</Button>
        </div>
        <div className="flex justify-between items-start sm:items-center">
          <h2 className="text-4xl font-bold text-cyan-300">
            <ResponsiveText values={language === "Kor" ? ["데이터 분석", "플랫폼", "KlickLab"] : ["KlickLab:", "Data Analysis", "Platform"]}/>
          </h2>
          <div className="flex flex-col-reverse sm:flex-row gap-4 text-sm">
            <a
              href="https://github.com/Eatventory/KlickLab"
              className="text-cyan-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {language === "Kor" ? "깃허브 레포지토리" : "GitHub Repository"} ↗
            </a>
            <span className="text-indigo-300"><code>2025.06 - 2025.07</code></span>
          </div>
        </div>

        <p className="text-violet-200">
          {language === "Kor" ?
            "클릭스트림 기반 실시간 데이터 수집 및 분석 플랫폼 개발 - 이벤트 수집 SDK, 쿼리 병목 개선, 고가용 시스템 설계" :
            "Developing a clickstream-based real-time data collection and analysis platform - including event collection SDK, query bottleneck improvement, and high-availability system design."
          }
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-cyan-300">▶ {language === "Kor" ? "프로젝트 개요" : "Project Overview"}</h3>
            <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
              <li>
                {language === "Kor" ?
                  "사용자가 웹사이트에서 클릭, 페이지 이동, 폼 입력 등 행동을 수행할 때마다 이를 수집하고 분석 가능한 형태로 가공하여 시각화해주는 데이터 분석 플랫폼입니다." :
                  "A data analysis platform that collects user actions such as clicks, page views, and form inputs on a website, processes them into an analyzable format, and visualizes the results."
                }
              </li>
              <li>
                {language === "Kor" ?
                  "웹사이트 운영자들이 ‘전환율’, ‘유입 경로’, ‘이탈 지점’ 등을 빠르게 파악할 수 있도록 대시보드를 제공하며, 수집 → 분석 → 시각화 전 과정을 직접 설계 및 구현했습니다." :
                  "It provides a dashboard to help website operators quickly identify metrics like 'conversion rate,' 'traffic sources,' and 'drop-off points,' with the entire process from collection to visualization designed and implemented from scratch."
                }
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-cyan-300">▶ {language === "Kor" ? "주요 기능과 문제 해결 흐름" : "Key Features & Problem-Solving Flow"}</h3>
            <div className="space-y-5 mt-4">

              {/* 기능 1 */}
              <div>
                <h4 className="text-lg font-semibold text-cyan-300">
                  1. {language === "Kor" ? "SDK 이벤트 수집 제외 기능" : "SDK Event Collection Exclusion Feature"}
                </h4>
                <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                  <li>{language === "Kor" ? "SDK가 페이지 내의 모든 클릭 이벤트를 수집하는 구조였기 때문에, 사용자 행동과 무관한 의미 없는 클릭 이벤트(예: 빈 영역 클릭, 그림자/오버레이 클릭 등)까지 필터링 없이 마구잡이로 수집되는 문제가 발생했습니다." : "The SDK was initially structured to collect all click events on a page, which led to the problem of indiscriminately collecting meaningless events unrelated to user behavior (e.g., clicks on empty spaces, shadows, overlays) without any filtering."}</li>
                  <li>{language === "Kor" ? "의미 없는 요소에 대해 이벤트 수집을 차단할 수 있도록, kl-disabled 클래스를 포함한 DOM 요소 또는 부모 요소에서 발생한 이벤트는 수집하지 않도록 SDK 이벤트 리스너를 수정했습니다. 이벤트 타겟이 없는 경우를 대비한 방어 로직과, 상위 요소 하나에만 클래스를 부여해도 전체 하위 요소 이벤트가 차단되도록 DOM 트리 탐색 구조를 도입했습니다." : "To block event collection for meaningless elements, the SDK event listener was modified to ignore events from DOM elements (or their parents) containing the 'kl-disabled' class. Defensive logic was added for cases without an event target, and a DOM tree traversal structure was introduced to block all child element events even if only a single parent element had the class."}</li>
                  <li>{language === "Kor" ? "시각적·기능적으로 의미 없는 클릭이 수집되지 않게 되어 지표의 정확도와 정합성이 향상되었고, 클릭 우선순위, 전환 분석 등에서 실제 사용자 행동만 기반으로 한 분석이 가능해졌습니다." : "By preventing the collection of visually and functionally meaningless clicks, the accuracy and integrity of metrics were improved, enabling analysis based solely on actual user behavior for click priority, conversion analysis, and more."}</li>
                </ul>
              </div>

              {/* 기능 2 */}
              <div>
                <h4 className="text-lg font-semibold text-cyan-300">
                  2. {language === "Kor" ? "대시보드 쿼리 병목 개선 - 집계 테이블 및 Materialized View 구조 설계" : "Dashboard Query Bottleneck Improvement - Aggregate Table & Materialized View Design"}
                </h4>
                <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                  <li>{language === "Kor" ? "프로젝트 초기에는 모든 대시보드 지표(전환율, 이탈률, 유입 분석 등)를 ClickHouse의 events 원본 테이블에서 직접 조회하는 구조였습니다. 특히 GROUP BY, JOIN, WHERE 조건이 복합적으로 걸리는 쿼리에서 응답 지연 및 타임아웃 현상이 발생했고, 1,000만 건 이상의 데이터에서 응답 시간이 10초 이상 소요되는 병목이 발생했습니다." : "Initially, all dashboard metrics (conversion rate, bounce rate, inflow analysis, etc.) were queried directly from the original 'events' table in ClickHouse. This caused response delays and timeouts, especially with complex queries involving GROUP BY, JOIN, and WHERE clauses, creating a bottleneck with response times exceeding 10 seconds for datasets with over 10 million records."}</li>
                  <li>{language === "Kor" ? "대시보드에서 자주 사용하는 지표에 대해 일/시/분 단위의 집계 테이블(flat_, agg_)을 별도로 생성하고, ReplacingMergeTree, AggregatingMergeTree 등 테이블 특성에 맞는 엔진을 선택해 쿼리 최적화와 TTL 관리까지 고려한 설계를 진행했습니다. ClickHouse의 Materialized View(MV)를 통해 이벤트가 적재될 때마다 자동으로 집계 테이블로 가공되도록 처리했습니다. 백엔드 API는 모두 MV 대상 집계 테이블만 조회하도록 쿼리 구조를 변경했습니다." : "For frequently used dashboard metrics, separate daily/hourly/minute-level aggregate tables (flat_, agg_) were created. Engines suitable for table characteristics, such as ReplacingMergeTree and AggregatingMergeTree, were selected to design a system that considered query optimization and TTL management. Events were automatically processed into these aggregate tables upon ingestion using ClickHouse's Materialized Views (MV). The backend API was restructured to query only these MV-targeted aggregate tables."}</li>
                  <li>{language === "Kor" ? "주요 쿼리의 응답 시간이 최대 10.67초 → 최소 60ms로 단축(약 99.43% 개선)되었고, 분석 중 타임아웃 문제 없이 대시보드의 실시간 인터랙션 가능 수준까지 도달했습니다. API 측에서도 분석 대상 테이블을 원본에서 집계 테이블로 전환함으로써 CPU 사용량과 I/O 부담이 감소했고, 데이터 증가량이 수천만 건으로 늘어났음에도 성능 저하 없이 분석 기능이 유지되었습니다." : "The response time for major queries was reduced from a maximum of 10.67 seconds to a minimum of 60ms (a ~99.43% improvement), enabling real-time interaction on the dashboard without timeout issues. On the API side, switching from the original table to aggregate tables for analysis reduced CPU usage and I/O load, maintaining analytical performance without degradation even as the data grew to tens of millions of records."}</li>
                </ul>
              </div>

              {/* 기능 3 */}
              <div>
                <h4 className="text-lg font-semibold text-cyan-300">
                  3. {language === "Kor" ? "읽기/쓰기 분리 구조 적용 - ClickHouse 기반 CQRS 설계" : "Read/Write Separation - ClickHouse-based CQRS Design"}
                </h4>
                <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                  <li>{language === "Kor" ? "SDK에서 수집한 클릭 이벤트가 실시간으로 events 테이블에 INSERT되는 동시에, 대시보드 API에서 수많은 SELECT 쿼리가 실행되며 같은 ClickHouse 노드에 읽기/쓰기 부하가 집중되면서 일시적으로 메모리 부족(OOM) 현상이 발생하였고 데이터 수집 실패, 서버 중단, ClickHouse 노드 장애까지 이어졌습니다." : "As click events collected by the SDK were being inserted into the 'events' table in real-time, numerous SELECT queries from the dashboard API were executed simultaneously, concentrating read/write loads on the same ClickHouse node. This led to temporary Out-Of-Memory (OOM) issues, resulting in data collection failures, server downtime, and even ClickHouse node failures."}</li>
                  <li>{language === "Kor" ? "읽기/쓰기 분리를 위한 CQRS 구조를 ClickHouse 레벨에서 직접 설계했습니다." : "A CQRS architecture for read/write separation was designed directly at the ClickHouse level."}
                    <ul className="list-[square] pl-6">
                      <li>{language === "Kor" ? "A 노드: Kafka를 통해 수집된 로그를 INSERT하는 쓰기 전용 노드(Producer)" : "Node A: A write-only node (Producer) that inserts logs collected via Kafka."}</li>
                      <li>{language === "Kor" ? "B 노드: 집계 테이블(flat_, agg_)만 조회하는 읽기 전용 노드(Consumer)" : "Node B: A read-only node (Consumer) that only queries the aggregate tables (flat_, agg_)."}</li>
                    </ul>
                  </li>
                  <li>{language === "Kor" ? "이벤트 수집과 분석 요청이 완전히 물리적으로 분리되면서 OOM 현상이 재발하지 않았고, ClickHouse 장애나 로그 수집 중단 없이 수집과 분석이 안정적으로 병행 가능해졌습니다. 실시간 분석 요청이 많은 상황에서도 대시보드 응답 속도와 시스템 안정성이 유지되었습니다." : "With the complete physical separation of event collection and analysis requests, OOM issues did not recur. This enabled stable, parallel processing of collection and analysis without ClickHouse failures or log collection interruptions. Dashboard response speed and system stability were maintained even with a high volume of real-time analysis requests."}</li>
                </ul>
              </div>

              {/* 기능 4 */}
              <div>
                <h4 className="text-lg font-semibold text-cyan-300">
                  4. {language === "Kor" ? "RPS 급락 문제 해결 - Node.js GC 분산 구조 전환" : "Resolving RPS Drops - Transitioning to a Distributed Node.js GC Structure"}
                </h4>
                <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                  <li>{language === "Kor" ? "초기에는 c6in.xlarge 고사양 인스턴스 17대를 구성해 로그 수집 서버를 운영했지만, Node.js의 단일 스레드 구조와 주기적인 Garbage Collection(GC)으로 인해 약 30초 주기로 Stop-the-World 현상이 발생했고, RPS가 순간적으로 급락하며 일부 요청이 504 Gateway Timeout으로 실패하는 문제가 지속되었습니다. 고사양 인스턴스를 추가할수록 비용이 급격히 상승하고, vCPU 총량 할당 한계에도 부딪혀 수직 확장 전략이 더 이상 유효하지 않았습니다." : "Initially, the log collection server was operated on 17 high-spec c6in.xlarge instances. However, due to Node.js's single-threaded nature and periodic Garbage Collection (GC), 'Stop-the-World' events occurred every ~30 seconds. This caused sudden drops in RPS, leading to persistent 504 Gateway Timeout failures for some requests. Vertical scaling was no longer viable as adding more high-spec instances drastically increased costs and hit vCPU allocation limits."}</li>
                  <li>{language === "Kor" ? "vCPU 1개짜리 t2.small 인스턴스 74대를 활용해 수평 확장 구조로 전환했습니다. 각 인스턴스는 독립적인 Node.js 프로세스를 실행하며, GC는 개별 인스턴스 수준에서만 발생하므로 Stop-the-World의 영향이 전체 트래픽에 파급되지 않도록 구조적으로 분산시켰습니다." : "We switched to a horizontal scaling architecture using 74 t2.small instances with 1 vCPU each. Each instance runs an independent Node.js process, so GC only occurs at the individual instance level. This structurally distributed the impact of 'Stop-the-World' events, preventing them from affecting the entire traffic flow."}</li>
                  <li>{language === "Kor" ? "GC에 의한 RPS 급락 현상이 사라졌고, 평균 RPS는 기존 3,938에서 10,682로 약 2.7배 증가했습니다. 동시에 인프라 비용은 약 56% 절감되었으며, 더 이상 수집 중단이나 타임아웃 없이 안정적인 고빈도 로그 수집이 가능해졌습니다." : "The RPS drops caused by GC were eliminated, and the average RPS increased by approximately 2.7 times, from 3,938 to 10,682. Simultaneously, infrastructure costs were reduced by about 56%, enabling stable, high-frequency log collection without further interruptions or timeouts."}</li>
                </ul>
              </div>

              {/* 기능 5 */}
              <div>
                <h4 className="text-lg font-semibold text-cyan-300">
                  5. {language === "Kor" ? "전환 이벤트 정의 구조 개선 - 사용자 목적에 맞는 전환 지표 분석 지원" : "Improving Conversion Event Definition - Supporting User-Goal-Oriented Analysis"}
                </h4>
                <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                  <li>{language === "Kor" ? "기존 전환 이벤트 로직은 event_name IN ('purchase', 'signup', 'conversion')처럼 쇼핑몰 운영자 관점에서 정해진 전환 이벤트 목록이 하드코딩된 구조였습니다. 하지만 사용자 맞춤 전환 조건을 반영할 수 없어 대시보드에서 제공하는 전환율 지표가 사용자의 실제 관심사와 불일치하는 문제가 발생했습니다." : "The existing conversion event logic was hardcoded with a predefined list of events from a shopping mall operator's perspective, like event_name IN ('purchase', 'signup', 'conversion'). This meant it couldn't reflect custom conversion conditions, causing a mismatch between the conversion rate metrics on the dashboard and the user's actual interests."}</li>
                  <li>{language === "Kor" ? "전환 정의 방식을 고정된 목록이 아닌 사용자 정의 기반으로 전환했습니다. 사용자는 클릭랩 대시보드에서 특정 이벤트명, 페이지 경로, 버튼 요소 등 원하는 조건을 직접 등록할 수 있도록 개선했고, SDK는 수집 시점에 이 설정값을 기반으로 해당 이벤트가 전환 조건에 해당하는지를 판별하게 했습니다." : "The conversion definition method was changed from a fixed list to a user-defined system. Users can now register desired conditions—such as specific event names, page paths, or button elements—directly on the KlickLab dashboard. The SDK then determines if an event meets these conversion criteria at the time of collection based on these settings."}</li>
                  <li>{language === "Kor" ? "사용자는 이제 자신의 서비스 목적에 따라 다양한 행동을 전환으로 자유롭게 지정할 수 있게 되었고, 대시보드에서 제공하는 전환율과 퍼널 분석 지표가 실제 관심 있는 지점에 정확히 대응하게 되었습니다." : "Users can now freely define various actions as conversions according to their service objectives, and the conversion rate and funnel analysis metrics provided on the dashboard now accurately correspond to their points of interest."}</li>
                </ul>
              </div>

              {/* 기능 6 */}
              <div>
                <h4 className="text-lg font-semibold text-cyan-300">
                  6. {language === "Kor" ? "렌더링 최적화를 위한 API 요청 구조 개선" : "Optimizing API Request Structure for Better Rendering"}
                </h4>
                <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                  <li>{language === "Kor" ? "대시보드 내 일부 컴포넌트가 실제로는 화면에 표시되지 않음에도 불구하고 관련 API가 모두 호출되어 불필요한 네트워크 요청이 다수 발생했고 전체 렌더링 시간이 길어지며 사용자 경험 저하로 이어졌습니다." : "Some components within the dashboard were triggering their respective API calls even when not visible on the screen. This resulted in numerous unnecessary network requests, increasing the overall rendering time and degrading the user experience."}</li>
                  <li>{language === "Kor" ? "조건부 렌더링 로직을 적용해 보이지 않는 컴포넌트의 API 요청을 차단하고, 요청 병렬화 및 응답 캐싱 로직을 추가해 중복 요청을 제거했습니다." : "Conditional rendering logic was applied to block API requests from non-visible components. Additionally, request parallelization and response caching were implemented to eliminate duplicate requests."}</li>
                  <li>{language === "Kor" ? "초기 렌더링 시점의 API 요청 수가 감소하면서 로딩 시간이 단축되었고, 클라이언트 측 부하와 서버 요청량이 모두 감소했습니다. 반복되는 지표 조회에서도 불필요한 네트워크 요청 없이 지속적으로 빠른 응답을 유지할 수 있는 기반을 마련했습니다." : "The number of API requests at initial render was reduced, shortening loading times and decreasing both client-side load and server request volume. This established a foundation for maintaining consistently fast responses for repeated metric queries without unnecessary network requests."}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

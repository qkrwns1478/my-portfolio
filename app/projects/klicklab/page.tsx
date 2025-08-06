import Link from "next/link";

export default function KlickLabDetail() {
  return (
    <section className="py-10 space-y-8">
      <div>
        <Link
          href="/projects"
          className="text-cyan-300 border border-cyan-300 px-4 py-2 rounded hover:bg-cyan-300 hover:text-black transition"
        >
          ← 프로젝트 목록으로 돌아가기
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold text-cyan-300">
          📊 데이터 분석 플랫폼 KlickLab
        </h2>
        <div className="flex gap-4 text-sm">
          <a
            href="https://github.com/Eatventory/KlickLab"
            className="text-cyan-300 underline"
            target="_blank"
          >
            깃허브 레포지토리 ↗
          </a>
          <span className="text-indigo-300"><code>2025.06 - 2025.07</code></span>
        </div>
      </div>

      <p className="text-violet-200">
        클릭스트림 기반 실시간 데이터 수집 및 분석 플랫폼 개발 - 이벤트 수집 SDK,
        쿼리 병목 개선, 고가용 시스템 설계
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-cyan-300">▶ 프로젝트 개요</h3>
          <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
            <li>
              사용자가 웹사이트에서 클릭, 페이지 이동, 폼 입력 등 행동을 수행할 때마다 이를 수집하고
              분석 가능한 형태로 가공하여 시각화해주는 데이터 분석 플랫폼입니다.
            </li>
            <li>
              웹사이트 운영자들이 ‘전환율’, ‘유입 경로’, ‘이탈 지점’ 등을 빠르게 파악할 수 있도록 대시보드를 제공하며,
              수집 → 분석 → 시각화 전 과정을 직접 설계 및 구현했습니다.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-cyan-300">▶ 주요 기능과 문제 해결 흐름</h3>
          <div className="space-y-5 mt-4">

            {/* 기능 1 */}
            <div>
              <h4 className="text-lg font-semibold text-cyan-300">
                1. SDK 이벤트 수집 제외 기능
              </h4>
              <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                <li>
                  SDK가 페이지 내의 모든 클릭 이벤트를 수집하는 구조였기 때문에,
                  사용자 행동과 무관한 의미 없는 클릭 이벤트(예: 빈 영역 클릭, 그림자/오버레이 클릭 등)까지
                  필터링 없이 마구잡이로 수집되는 문제가 발생했습니다.
                </li>
                <li>
                  의미 없는 요소에 대해 이벤트 수집을 차단할 수 있도록,
                  kl-disabled 클래스를 포함한 DOM 요소 또는 부모 요소에서 발생한 이벤트는 수집하지 않도록 SDK 이벤트 리스너를 수정했습니다.
                  이벤트 타겟이 없는 경우를 대비한 방어 로직과,
                  상위 요소 하나에만 클래스를 부여해도 전체 하위 요소 이벤트가 차단되도록 DOM 트리 탐색 구조를 도입했습니다.
                </li>
                <li>
                  시각적·기능적으로 의미 없는 클릭이 수집되지 않게 되어 지표의 정확도와 정합성이 향상되었고,
                  클릭 우선순위, 전환 분석 등에서 실제 사용자 행동만 기반으로 한 분석이 가능해졌습니다.
                </li>
              </ul>
            </div>

            {/* 기능 2 */}
            <div>
              <h4 className="text-lg font-semibold text-cyan-300">
                2. 대시보드 쿼리 병목 개선 - 집계 테이블 및 Materialized View 구조 설계
              </h4>
              <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                <li>
                  프로젝트 초기에는 모든 대시보드 지표(전환율, 이탈률, 유입 분석 등)를 ClickHouse의 events 원본 테이블에서 직접 조회하는 구조였습니다.
                  특히 GROUP BY, JOIN, WHERE 조건이 복합적으로 걸리는 쿼리에서 응답 지연 및 타임아웃 현상이 발생했고,
                  1,000만 건 이상의 데이터에서 응답 시간이 10초 이상 소요되는 병목이 발생했습니다.
                </li>
                <li>
                  대시보드에서 자주 사용하는 지표에 대해 일/시/분 단위의 집계 테이블(flat_, agg_)을 별도로 생성하고,
                  ReplacingMergeTree, AggregatingMergeTree 등 테이블 특성에 맞는 엔진을 선택해 쿼리 최적화와 TTL 관리까지 고려한 설계를 진행했습니다.
                  ClickHouse의 Materialized View(MV)를 통해 이벤트가 적재될 때마다 자동으로 집계 테이블로 가공되도록 처리했습니다.
                  백엔드 API는 모두 MV 대상 집계 테이블만 조회하도록 쿼리 구조를 변경했습니다.
                </li>
                <li>
                  주요 쿼리의 응답 시간이 최대 10.67초 → 최소 60ms로 단축(약 99.43% 개선)되었고,
                  분석 중 타임아웃 문제 없이 대시보드의 실시간 인터랙션 가능 수준까지 도달했습니다.
                  API 측에서도 분석 대상 테이블을 원본에서 집계 테이블로 전환함으로써 CPU 사용량과 I/O 부담이 감소했고,
                  데이터 증가량이 수천만 건으로 늘어났음에도 성능 저하 없이 분석 기능이 유지되었습니다.
                </li>
              </ul>
            </div>

            {/* 기능 3 */}
            <div>
              <h4 className="text-lg font-semibold text-cyan-300">
                3. 읽기/쓰기 분리 구조 적용 - ClickHouse 기반 CQRS 설계
              </h4>
              <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                <li>
                  SDK에서 수집한 클릭 이벤트가 실시간으로 events 테이블에 INSERT되는 동시에,
                  대시보드 API에서 수많은 SELECT 쿼리가 실행되며 같은 ClickHouse 노드에 읽기/쓰기 부하가 집중되면서
                  일시적으로 메모리 부족(OOM) 현상이 발생하였고 데이터 수집 실패, 서버 중단, ClickHouse 노드 장애까지 이어졌습니다.
                </li>
                <li>
                  읽기/쓰기 분리를 위한 CQRS 구조를 ClickHouse 레벨에서 직접 설계했습니다.
                  <ul className="list-[square] pl-6">
                    <li>A 노드: Kafka를 통해 수집된 로그를 INSERT하는 쓰기 전용 노드(Producer)</li>
                    <li>B 노드: 집계 테이블(flat_, agg_)만 조회하는 읽기 전용 노드(Consumer)</li>
                  </ul>
                </li>
                <li>
                  이벤트 수집과 분석 요청이 완전히 물리적으로 분리되면서 OOM 현상이 재발하지 않았고,
                  ClickHouse 장애나 로그 수집 중단 없이 수집과 분석이 안정적으로 병행 가능해졌습니다.
                  실시간 분석 요청이 많은 상황에서도 대시보드 응답 속도와 시스템 안정성이 유지되었습니다.
                </li>
              </ul>
            </div>

            {/* 기능 4 */}
            <div>
              <h4 className="text-lg font-semibold text-cyan-300">
                4. RPS 급락 문제 해결 - Node.js GC 분산 구조 전환
              </h4>
              <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                <li>
                  초기에는 c6in.xlarge 고사양 인스턴스 17대를 구성해 로그 수집 서버를 운영했지만,
                  Node.js의 단일 스레드 구조와 주기적인 Garbage Collection(GC)으로 인해 약 30초 주기로 Stop-the-World 현상이 발생했고,
                  RPS가 순간적으로 급락하며 일부 요청이 504 Gateway Timeout으로 실패하는 문제가 지속되었습니다.
                  고사양 인스턴스를 추가할수록 비용이 급격히 상승하고, vCPU 총량 할당 한계에도 부딪혀 수직 확장 전략이 더 이상 유효하지 않았습니다.
                </li>
                <li>
                  vCPU 1개짜리 t2.small 인스턴스 74대를 활용해 수평 확장 구조로 전환했습니다.
                  각 인스턴스는 독립적인 Node.js 프로세스를 실행하며, GC는 개별 인스턴스 수준에서만 발생하므로
                  Stop-the-World의 영향이 전체 트래픽에 파급되지 않도록 구조적으로 분산시켰습니다.
                </li>
                <li>
                  GC에 의한 RPS 급락 현상이 사라졌고, 평균 RPS는 기존 3,938에서 10,682로 약 2.7배 증가했습니다.
                  동시에 인프라 비용은 약 56% 절감되었으며, 더 이상 수집 중단이나 타임아웃 없이 안정적인 고빈도 로그 수집이 가능해졌습니다.
                </li>
              </ul>
            </div>

            {/* 기능 5 */}
            <div>
              <h4 className="text-lg font-semibold text-cyan-300">
                5. 전환 이벤트 정의 구조 개선 - 사용자 목적에 맞는 전환 지표 분석 지원
              </h4>
              <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                <li>
                  기존 전환 이벤트 로직은 event_name IN ('purchase', 'signup', 'conversion')처럼
                  쇼핑몰 운영자 관점에서 정해진 전환 이벤트 목록이 하드코딩된 구조였습니다.
                  하지만 사용자 맞춤 전환 조건을 반영할 수 없어 대시보드에서 제공하는 전환율 지표가 사용자의 실제 관심사와 불일치하는 문제가 발생했습니다.
                </li>
                <li>
                  전환 정의 방식을 고정된 목록이 아닌 사용자 정의 기반으로 전환했습니다.
                  사용자는 클릭랩 대시보드에서 특정 이벤트명, 페이지 경로, 버튼 요소 등 원하는 조건을 직접 등록할 수 있도록 개선했고,
                  SDK는 수집 시점에 이 설정값을 기반으로 해당 이벤트가 전환 조건에 해당하는지를 판별하게 했습니다.
                </li>
                <li>
                  사용자는 이제 자신의 서비스 목적에 따라 다양한 행동을 전환으로 자유롭게 지정할 수 있게 되었고,
                  대시보드에서 제공하는 전환율과 퍼널 분석 지표가 실제 관심 있는 지점에 정확히 대응하게 되었습니다.
                </li>
              </ul>
            </div>

            {/* 기능 6 */}
            <div>
              <h4 className="text-lg font-semibold text-cyan-300">
                6. 렌더링 최적화를 위한 API 요청 구조 개선
              </h4>
              <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                <li>
                  대시보드 내 일부 컴포넌트가 실제로는 화면에 표시되지 않음에도 불구하고 관련 API가 모두 호출되어
                  불필요한 네트워크 요청이 다수 발생했고 전체 렌더링 시간이 길어지며 사용자 경험 저하로 이어졌습니다.
                </li>
                <li>
                  조건부 렌더링 로직을 적용해 보이지 않는 컴포넌트의 API 요청을 차단하고,
                  요청 병렬화 및 응답 캐싱 로직을 추가해 중복 요청을 제거했습니다.
                </li>
                <li>
                  초기 렌더링 시점의 API 요청 수가 감소하면서 로딩 시간이 단축되었고, 클라이언트 측 부하와 서버 요청량이 모두 감소했습니다.
                  반복되는 지표 조회에서도 불필요한 네트워크 요청 없이 지속적으로 빠른 응답을 유지할 수 있는 기반을 마련했습니다.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

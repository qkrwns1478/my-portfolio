"use client";
import { useState, useEffect } from 'react';
import Button from "../../components/Button";
import { useSettingsStore } from '../../store/settingsStore';

export default function SpartaLogisticsDetail() {
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
          <h2 className="text-4xl font-bold text-slate-200">
            {language === "Kor" ? "스파르타 로지스틱스" : "Sparta Logistics"}
          </h2>
          <div className="flex flex-col-reverse sm:flex-row gap-4 text-sm">
            <a
              href="https://github.com/qkrwns1478/sparta-logistics"
              className="text-slate-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {language === "Kor" ? "깃허브 레포지토리" : "GitHub Repository"} ↗
            </a>
            <span className="text-slate-400"><code>2026.05 – 2026.06</code></span>
          </div>
        </div>

        <p className="text-slate-300">
          {language === "Kor"
            ? "MSA 기반 물류 플랫폼의 주문 도메인 담당. Kafka Saga 패턴으로 5개 서비스 간 분산 트랜잭션을 처리하고, Redis 분산 락과 Outbox 패턴으로 동시성 안전성 및 이벤트 신뢰성을 확보했습니다."
            : "Responsible for the Order domain in an MSA-based logistics platform. Handled distributed transactions across 5 services using Kafka Saga patterns, and ensured concurrency safety and event reliability with Redis distributed locks and the Outbox pattern."
          }
        </p>

        <div className="space-y-8">

          {/* 프로젝트 개요 */}
          <div>
            <h3 className="text-xl font-semibold text-slate-200">▶ {language === "Kor" ? "프로젝트 개요" : "Project Overview"}</h3>
            <ul className="list-disc pl-6 text-slate-300 mt-2 space-y-1">
              <li>
                {language === "Kor"
                  ? "7개 마이크로서비스(User / Hub / Company / Product / Order / Delivery / Slack)로 구성된 B2B 물류 플랫폼으로, 서비스별 독립 DB와 Kafka 비동기 통신으로 설계되었습니다."
                  : "A B2B logistics platform consisting of 7 microservices (User / Hub / Company / Product / Order / Delivery / Slack), designed with independent databases per service and Kafka asynchronous communication."
                }
              </li>
              <li>
                {language === "Kor"
                  ? "Order 서비스를 담당하여 주문 CRUD API, 상태 머신(PENDING → ACCEPTED → IN_DELIVERY → COMPLETED / CANCELLED), 주문 시점 상품 스냅샷 저장, 허브 재고 로컬 스냅샷 관리를 구현했습니다."
                  : "I was responsible for the Order service, implementing order CRUD APIs, a state machine (PENDING → ACCEPTED → IN_DELIVERY → COMPLETED / CANCELLED), product snapshot storage at the time of order, and hub inventory local snapshot management."
                }
              </li>
            </ul>
          </div>

          {/* Saga 흐름 */}
          <div>
            <h3 className="text-xl font-semibold text-slate-200">▶ {language === "Kor" ? "Saga 흐름 설계" : "Saga Flow Design"}</h3>
            <div className="space-y-5 mt-4">

              <div>
                <h4 className="text-lg font-semibold text-slate-200">
                  1. {language === "Kor" ? "주문 생성: Choreography Saga (이벤트 체이닝)" : "Choreography Saga — Order Creation (Event Chaining)"}
                </h4>
                <ul className="list-disc pl-6 text-slate-300 space-y-1 mt-1">
                  <li>
                    {language === "Kor"
                      ? "각 서비스가 이벤트를 수신하면 독립적으로 반응하는 구조로, 중앙 조율자 없이 4개 서비스를 거쳐 주문이 완성됩니다."
                      : "Each service reacts independently upon receiving an event, completing the order through 4 services without a central orchestrator."
                    }
                  </li>
                  <li>
                    <img
                      src="/images/sparta-logistics/choreo_saga.webp"
                      alt="Choreography Saga Flow"
                      className="mt-2 rounded-lg border border-white/10 max-w-full"
                    />
                  </li>
                  <li>
                    {language === "Kor"
                      ? "보상 트랜잭션: stock.reservation.failed / delivery.creation.failed 수신 시 주문을 즉시 CANCELLED로 전이하고 HubService 재고 예약을 복구합니다."
                      : "Compensation transaction: On receiving stock.reservation.failed / delivery.creation.failed, the order is immediately transitioned to CANCELLED and the HubService stock reservation is restored."
                    }
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-200">
                  2. {language === "Kor" ? "주문 취소: Orchestration Saga (중앙 조율 구조)" : "Orchestration Saga — Order Cancellation (Central Orchestration)"}
                </h4>
                <ul className="list-disc pl-6 text-slate-300 space-y-1 mt-1">
                  <li>
                    {language === "Kor"
                      ? "보상 순서가 명확하고 실패 재시도 로직을 한 곳에서 관리해야 했기 때문에, 취소 흐름에는 Orchestration 패턴을 적용했습니다. CancelOrderOrchestrator가 각 서비스에 커맨드를 순차적으로 발행합니다."
                      : "Since the compensation order was clear and retry logic needed to be managed in one place, the Orchestration pattern was applied for the cancellation flow. CancelOrderOrchestrator sequentially issues commands to each service."
                    }
                  </li>
                  <li>
                    <img
                      src="/images/sparta-logistics/orches_saga.webp"
                      alt="Orchestration Saga Flow"
                      className="mt-2 rounded-lg border border-white/10 max-w-full"
                    />
                  </li>
                  <li>
                    {language === "Kor"
                      ? "배송 취소 거부 시 이전 상태(PENDING / ACCEPTED)로 복구, 재고 복구 실패 시 최대 3회 재시도, CANCELLING 30분 고착 감지를 위한 CancellingSagaTimeoutChecker를 구현했습니다."
                      : "On delivery cancellation rejection, restores to the previous state (PENDING / ACCEPTED); on stock restoration failure, retries up to 3 times; implemented CancellingSagaTimeoutChecker to detect CANCELLING state stuck for 30 minutes."
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 기술적 도전 */}
          <div>
            <h3 className="text-xl font-semibold text-slate-200">▶ {language === "Kor" ? "기술적 도전과 해결" : "Technical Challenges & Solutions"}</h3>
            <div className="space-y-5 mt-4">

              {/* 도전 1: Outbox 패턴 */}
              <div>
                <h4 className="text-lg font-semibold text-slate-200">
                  1. {language === "Kor" ? "Outbox 패턴으로 이벤트 유실 방지" : "Preventing Event Loss with the Outbox Pattern"}
                </h4>
                <ul className="list-disc pl-6 text-slate-300 space-y-1 mt-1">
                  <li>
                    {language === "Kor"
                      ? "DB 커밋 후 kafkaTemplate.send()가 실패하면 주문이 PENDING으로 고착되는 문제가 있었습니다. DB 커밋과 Kafka 발행이 원자적으로 묶이지 않는 구조가 원인이었습니다."
                      : "If kafkaTemplate.send() failed after a DB commit, the order would get stuck in PENDING. The root cause was that the DB commit and Kafka publish were not atomically coupled."
                    }
                  </li>
                  <li>
                    {language === "Kor"
                      ? "p_order와 p_outbox를 같은 트랜잭션에 저장하고, @Scheduled 릴레이가 1초 주기로 PENDING 이벤트를 폴링해 Kafka에 발행합니다. Kafka 장애 시 PENDING 레코드가 남아 복구 후 재발행(at-least-once)이 보장됩니다."
                      : "p_order and p_outbox are saved in the same transaction, and an @Scheduled relay polls PENDING events every second to publish to Kafka. If Kafka fails, PENDING records remain for redelivery after recovery (at-least-once guarantee)."
                    }
                  </li>
                  <li>
                    {language === "Kor"
                      ? "@PreDestroy + AtomicBoolean 플래그로 컨텍스트 종료 시 DROP TABLE 레이스 컨디션을 차단했고, Outbox 공통 모듈을 common 모듈로 추출해 다른 서비스도 재사용할 수 있도록 설계했습니다."
                      : "@PreDestroy + AtomicBoolean flag prevents DROP TABLE race conditions on context shutdown. The Outbox module was extracted into a common module, making it reusable across other services."
                    }
                  </li>
                </ul>
              </div>

              {/* 도전 2: Redis 분산 락 */}
              <div>
                <h4 className="text-lg font-semibold text-slate-200">
                  2. {language === "Kor" ? "Redis 분산 락 + 상태 키로 분산 동시성 제어" : "Distributed Concurrency Control with Redis Lock + State Keys"}
                </h4>
                <ul className="list-disc pl-6 text-slate-300 space-y-1 mt-1">
                  <li>
                    {language === "Kor"
                      ? "Kafka Consumer(비동기)와 REST API(동기)가 동일 주문에 동시 접근하면 상태 불일치가 발생했습니다. 대표적으로 delivery.created Consumer가 ACCEPTED를 쓰는 중 취소 API가 진입하면 CANCELLED 상태 주문이 IN_DELIVERY로 전이되는 문제였습니다."
                      : "Simultaneous access to the same order by the Kafka Consumer (async) and REST API (sync) caused state inconsistency. A representative case was the order transitioning to IN_DELIVERY even when CANCELLED, if the cancellation API entered while the delivery.created Consumer was writing ACCEPTED."
                    }
                  </li>
                  <li>
                    {language === "Kor"
                      ? "세 계층의 방어선을 중첩 적용했습니다: L1 Redis 상태 키(CANCELLING / PROCESSING)로 빠른 사전 차단, L2 Redis 분산 락(SET NX EX 30)으로 임계 구간 직렬화, L3 JPA @Version 낙관적 락으로 DB 레벨 최후 방어."
                      : "Three layers of defense were stacked: L1 Redis state keys (CANCELLING / PROCESSING) for fast pre-blocking, L2 Redis distributed lock (SET NX EX 30) for critical section serialization, L3 JPA @Version optimistic lock as the last line of defense at the DB level."
                    }
                  </li>
                  <li>
                    {language === "Kor"
                      ? "CANCELLING 키 생명 주기를 Saga 완료/복구 시점까지 유지하고, Consumer 4종에 CANCELLING 확인 → PROCESSING 세팅 패턴을 일관되게 적용했습니다."
                      : "The CANCELLING key lifecycle is maintained until Saga completion/recovery, and the CANCELLING check → PROCESSING set pattern is consistently applied across all 4 Consumer types."
                    }
                  </li>
                </ul>
              </div>

              {/* 도전 3: Kafka 선택 이유 */}
              <div>
                <h4 className="text-lg font-semibold text-slate-200">
                  3. {language === "Kor" ? "Kafka를 선택한 이유 (vs RabbitMQ)" : "Why Kafka Over RabbitMQ"}
                </h4>
                <ul className="list-disc pl-6 text-slate-300 space-y-1 mt-1">
                  <li>
                    {language === "Kor"
                      ? "파티션 키 기반 순서 보장: orderId를 파티션 키로 사용해 동일 주문 이벤트가 같은 파티션으로 라우팅되도록 했습니다."
                      : "Partition key-based ordering: Used orderId as the partition key to route events for the same order to the same partition."
                    }
                  </li>
                  <li>
                    {language === "Kor"
                      ? "멀티 컨슈머 팬아웃: delivery.created 이벤트 하나를 OrderService와 SlackService가 각자 독립적으로 소비하는 구조가 필요했습니다."
                      : "Multi-consumer fan-out: A single delivery.created event needed to be consumed independently by both OrderService and SlackService."
                    }
                  </li>
                  <li>
                    {language === "Kor"
                      ? "Outbox 패턴 연계: 로그 기반 영속성과 at-least-once 보장이 폴링 릴레이 방식과 자연스럽게 결합됩니다."
                      : "Outbox pattern synergy: Log-based persistence and at-least-once guarantees naturally combine with the polling relay approach."
                    }
                  </li>
                </ul>
              </div>

              {/* 도전 4: EmbeddedKafka */}
              <div>
                <h4 className="text-lg font-semibold text-slate-200">
                  4. {language === "Kor" ? "EmbeddedKafka 기반 통합 테스트" : "Integration Testing with EmbeddedKafka"}
                </h4>
                <ul className="list-disc pl-6 text-slate-300 space-y-1 mt-1">
                  <li>
                    {language === "Kor"
                      ? "Choreography Saga 3건 + Orchestration Saga 7건, 총 10개 시나리오를 @EmbeddedKafka로 검증했습니다. 실제 Kafka 브로커 없이 Consumer 레이어부터 DB 상태 전이까지 자동화 검증이 가능합니다."
                      : "Verified 10 total scenarios (3 Choreography Saga + 7 Orchestration Saga) using @EmbeddedKafka, enabling automated validation from the Consumer layer through DB state transitions without a real Kafka broker."
                    }
                  </li>
                  <li>
                    {language === "Kor"
                      ? "Config Server 비활성 환경의 optional:configserver: 처리 문제와 @WebMvcTest + @MockitoBean 조합으로 컨트롤러 단위 테스트 격리를 해결했습니다."
                      : "Resolved optional:configserver: handling in a Config Server-disabled environment, and achieved controller unit test isolation using @WebMvcTest + @MockitoBean."
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 한계 및 개선 방향 */}
          <div>
            <h3 className="text-xl font-semibold text-slate-200">▶ {language === "Kor" ? "설계 한계 및 개선 방향" : "Known Limitations & Improvements"}</h3>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="text-left py-2 pr-6 font-medium">{language === "Kor" ? "항목" : "Item"}</th>
                    <th className="text-left py-2 pr-6 font-medium">{language === "Kor" ? "현재" : "Current"}</th>
                    <th className="text-left py-2 font-medium">{language === "Kor" ? "개선 방향" : "Improvement"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(language === "Kor" ? [
                    ["이벤트 중복 처리", "상태 가드(상태 전이)로만 대응", "eventId 기반 dedup 테이블 추가"],
                    ["CANCELLING 고착 알림", "log.warn만 기록", "Slack 알림 또는 Dead Letter Topic 연동"],
                    ["Outbox FAILED 알림", "로그만 기록", "Slack 알림 또는 DLT 연동"],
                    ["Redis 장애 대응", "없음", "Circuit Breaker 또는 Redisson Watch-dog"],
                    ["at-least-once 중복 발행", "컨슈머 상태 가드", "진정한 멱등성은 dedup 테이블 필요"],
                  ] : [
                    ["Duplicate Event Handling", "State guard (state transition) only", "Add eventId-based dedup table"],
                    ["CANCELLING Stuck Alert", "log.warn only", "Slack alert or Dead Letter Topic integration"],
                    ["Outbox FAILED Alert", "Log only", "Slack alert or DLT integration"],
                    ["Redis Failure Handling", "None", "Circuit Breaker or Redisson Watch-dog"],
                    ["at-least-once Duplicate Publish", "Consumer state guard", "True idempotency requires dedup table"],
                  ]).map(([item, current, improve], i) => (
                    <tr key={i}>
                      <td className="py-2 pr-6 text-slate-200 font-mono text-xs">{item}</td>
                      <td className="py-2 pr-6">{current}</td>
                      <td className="py-2">{improve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

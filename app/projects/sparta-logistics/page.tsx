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

  const isKor = language === "Kor";

  return (
    <div className="p-6">
      <section className="max-w-6xl mx-auto space-y-10 py-10">
        <div>
          <Button href="/projects">← {isKor ? "프로젝트 목록으로 돌아가기" : "Back to Projects"}</Button>
        </div>
        <div className="flex justify-between items-start sm:items-center">
          <h2 className="text-4xl font-bold text-slate-200">
            {isKor ? "스파르타 로지스틱스" : "Sparta Logistics"}
          </h2>
          <div className="flex flex-col-reverse sm:flex-row gap-4 text-sm">
            <a
              href="https://github.com/qkrwns1478/sparta-logistics"
              className="text-slate-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {isKor ? "깃허브 레포지토리" : "GitHub Repository"} ↗
            </a>
            <span className="text-slate-400"><code>2026.05 – 2026.06</code></span>
          </div>
        </div>

        <p className="text-slate-300">
          {isKor
            ? "MSA 기반 물류 플랫폼의 주문 도메인 담당으로서 Kafka Saga 패턴으로 5개 서비스 간 분산 트랜잭션을 처리하고, Redis 분산 락과 Outbox 패턴으로 동시성 안전성 및 이벤트 신뢰성을 확보했습니다."
            : "Responsible for the Order domain in an MSA-based logistics platform. Handled distributed transactions across 5 services using Kafka Saga patterns, and ensured concurrency safety and event reliability with Redis distributed locks and the Outbox pattern."
          }
        </p>

        <div className="space-y-8">

          {/* 프로젝트 메타 정보 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 rounded-xl border border-white/10 bg-white/[0.03]">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{isKor ? "기간" : "Period"}</p>
              <p className="text-slate-300 text-sm">
                2026.05.14 – 2026.06.01{" "}
                <span className="text-slate-500">(19{isKor ? "일" : " days"})</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{isKor ? "팀 구성" : "Team"}</p>
              <p className="text-slate-300 text-sm">{isKor ? "6인" : "6 members"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{isKor ? "역할" : "Role"}</p>
              <p className="text-slate-300 text-sm">
                {isKor
                  ? "Order 서비스 전담: ERD 설계, API 구현, Saga 설계, 동시성 전략"
                  : "Order Service Owner: ERD design, API, Saga design, concurrency strategy"
                }
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">{isKor ? "기술 스택" : "Tech Stack"}</p>
              <div className="flex flex-wrap gap-1.5">
                {["Spring Boot 3", "Kafka", "Redis", "PostgreSQL", "JPA", "Feign Client", "Docker"].map((tech) => (
                  <span key={tech} className="text-xs px-2 py-0.5 rounded border border-white/15 bg-white/5 text-slate-300">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* 프로젝트 개요 */}
          <div>
            <h3 className="text-xl font-semibold text-slate-200">▶ {isKor ? "프로젝트 개요" : "Project Overview"}</h3>
            <ul className="list-disc pl-6 text-slate-300 mt-2 space-y-1">
              <li>
                {isKor
                  ? "7개 마이크로서비스(User / Hub / Company / Product / Order / Delivery / Slack)로 구성된 B2B 물류 플랫폼으로, 서비스별 독립 DB와 Kafka 비동기 통신으로 설계되었습니다."
                  : "A B2B logistics platform consisting of 7 microservices (User / Hub / Company / Product / Order / Delivery / Slack), designed with independent databases per service and Kafka asynchronous communication."
                }
              </li>
              <li>
                {isKor
                  ? "Order 서비스를 담당하여 주문 CRUD API, 상태 머신(PENDING → ACCEPTED → IN_DELIVERY → COMPLETED / CANCELLED), 주문 시점 상품 스냅샷 저장, 허브 재고 로컬 스냅샷 관리를 구현했습니다."
                  : "I was responsible for the Order service, implementing order CRUD APIs, a state machine (PENDING → ACCEPTED → IN_DELIVERY → COMPLETED / CANCELLED), product snapshot storage at the time of order, and hub inventory local snapshot management."
                }
              </li>
            </ul>
          </div>

          {/* 시스템 아키텍처 */}
          <div>
            <h3 className="text-xl font-semibold text-slate-200">▶ {isKor ? "시스템 아키텍처" : "System Architecture"}</h3>
            <div className="mt-4">
              <img
                src="/images/sparta-logistics/architecture.webp"
                alt="MSA System Architecture"
                className="rounded-lg border border-white/10 max-w-full"
              />
            </div>
          </div>

          {/* Saga 흐름 */}
          <div>
            <h3 className="text-xl font-semibold text-slate-200">▶ {isKor ? "Saga 흐름 설계" : "Saga Flow Design"}</h3>
            <div className="space-y-5 mt-4">
              <p className="text-slate-300">
                {isKor
                  ? "주문 생성과 주문 취소, 두 흐름의 특성이 완전히 달랐기 때문에 하나의 패턴으로 통일하는 것은 맞지 않다고 판단했습니다."
                  : "Since the characteristics of the two flows, order creation and order cancellation, were completely different, we decided that it was not right to unify them into one pattern."
                }
              </p>

              {/* Saga 패턴 선택 비교 테이블 */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-slate-300 border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="text-left py-2 pr-6 font-medium">{isKor ? "패턴" : "Pattern"}</th>
                      <th className="text-left py-2 pr-6 font-medium">{isKor ? "적용 흐름" : "Applied Flow"}</th>
                      <th className="text-left py-2 pr-6 font-medium">{isKor ? "흐름 특성" : "Flow Characteristic"}</th>
                      <th className="text-left py-2 font-medium">{isKor ? "선택 이유" : "Reason"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {(isKor ? [
                      ["Choreography", "주문 생성", "각 서비스가 이벤트를 수신하면 독립적으로 반응", "결합도 최소화, 중앙 조율자 불필요"],
                      ["Orchestration", "주문 취소", "보상 순서 명확, 재시도 로직을 한 곳에서 관리", "실패 재시도의 단일 책임 확보"],
                    ] : [
                      ["Choreography", "Order Creation", "Each service reacts independently on event receipt", "Minimal coupling, no central orchestrator needed"],
                      ["Orchestration", "Order Cancellation", "Clear compensation order, retry logic centralized", "Single responsibility for failure retry"],
                    ]).map(([pattern, flow, characteristic, reason], i) => (
                      <tr key={i}>
                        <td className="py-2 pr-6 font-mono text-xs text-slate-200">{pattern}</td>
                        <td className="py-2 pr-6">{flow}</td>
                        <td className="py-2 pr-6 text-slate-400">{characteristic}</td>
                        <td className="py-2">{reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-200">
                  1. {isKor ? "주문 생성: Choreography Saga (이벤트 체이닝)" : "Choreography Saga — Order Creation (Event Chaining)"}
                </h4>
                <ul className="list-disc pl-6 text-slate-300 space-y-1 mt-1">
                  <li>
                    {isKor
                      ? "각 서비스가 이벤트를 수신하면 독립적으로 반응하는 구조로, 중앙 조율자 없이 4개 서비스를 거쳐 주문이 완성됩니다."
                      : "Each service reacts independently upon receiving an event, completing the order through 4 services without a central orchestrator."
                    }
                    <img
                      src="/images/sparta-logistics/choreo_saga.webp"
                      alt="Choreography Saga Flow"
                      className="mt-2 rounded-lg border border-white/10 max-w-full"
                    />
                  </li>
                  <li>
                    {isKor
                      ? "보상 트랜잭션: stock.reservation.failed / delivery.creation.failed 수신 시 주문을 즉시 CANCELLED로 전이하고 HubService 재고 예약을 복구합니다."
                      : "Compensation transaction: On receiving stock.reservation.failed / delivery.creation.failed, the order is immediately transitioned to CANCELLED and the HubService stock reservation is restored."
                    }
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-200">
                  2. {isKor ? "주문 취소: Orchestration Saga (중앙 조율 구조)" : "Orchestration Saga — Order Cancellation (Central Orchestration)"}
                </h4>
                <ul className="list-disc pl-6 text-slate-300 space-y-1 mt-1">
                  <li>
                    {isKor
                      ? "보상 순서가 명확하고 실패 재시도 로직을 한 곳에서 관리해야 했기 때문에, 취소 흐름에는 Orchestration 패턴을 적용했습니다. CancelOrderOrchestrator가 각 서비스에 커맨드를 순차적으로 발행합니다."
                      : "Since the compensation order was clear and retry logic needed to be managed in one place, the Orchestration pattern was applied for the cancellation flow. CancelOrderOrchestrator sequentially issues commands to each service."
                    }
                    <img
                      src="/images/sparta-logistics/orches_saga.webp"
                      alt="Orchestration Saga Flow"
                      className="mt-2 rounded-lg border border-white/10 max-w-full"
                    />
                  </li>
                  <li>
                    {isKor
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
            <h3 className="text-xl font-semibold text-slate-200">▶ {isKor ? "기술적 도전과 해결" : "Technical Challenges & Solutions"}</h3>
            <div className="space-y-5 mt-4">

              <div>
                <h4 className="text-lg font-semibold text-slate-200">
                  1. {isKor ? "Outbox 패턴으로 이벤트 유실 방지" : "Preventing Event Loss with the Outbox Pattern"}
                </h4>
                <ul className="list-disc pl-6 text-slate-300 space-y-1 mt-1">
                  <li>
                    {isKor
                      ? "DB 커밋 후 kafkaTemplate.send()가 실패하면 주문이 PENDING으로 고착되는 문제가 있었습니다. DB 커밋과 Kafka 발행이 원자적으로 묶이지 않는 구조가 원인이었습니다."
                      : "If kafkaTemplate.send() failed after a DB commit, the order would get stuck in PENDING. The root cause was that the DB commit and Kafka publish were not atomically coupled."
                    }
                  </li>
                  <li>
                    {isKor
                      ? "p_order와 p_outbox를 같은 트랜잭션에 저장하고, @Scheduled 릴레이가 1초 주기로 PENDING 이벤트를 폴링해 Kafka에 발행합니다. Kafka 장애 시 PENDING 레코드가 남아 복구 후 재발행(at-least-once)이 보장됩니다."
                      : "p_order and p_outbox are saved in the same transaction, and an @Scheduled relay polls PENDING events every second to publish to Kafka. If Kafka fails, PENDING records remain for redelivery after recovery (at-least-once guarantee)."
                    }
                  </li>
                  <li>
                    {isKor
                      ? "@PreDestroy + AtomicBoolean 플래그로 컨텍스트 종료 시 DROP TABLE 레이스 컨디션을 차단했고, Outbox 공통 모듈을 common 모듈로 추출해 다른 서비스도 재사용할 수 있도록 설계했습니다."
                      : "@PreDestroy + AtomicBoolean flag prevents DROP TABLE race conditions on context shutdown. The Outbox module was extracted into a common module, making it reusable across other services."
                    }
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-200">
                  2. {isKor ? "Redis 분산 락 + 상태 키로 분산 동시성 제어" : "Distributed Concurrency Control with Redis Lock + State Keys"}
                </h4>
                <ul className="list-disc pl-6 text-slate-300 space-y-3 mt-1">
                  <li>
                    <span className="text-slate-400 font-medium">{isKor ? "문제 1. " : "Problem 1. "}</span>
                    {isKor
                      ? "동일한 주문에 대해 주문 승인(Kafka Consumer)과 주문 취소(REST API)가 동시에 진입하면 상태 값이 충돌했습니다."
                      : "When order approval (Kafka Consumer) and order cancellation (REST API) entered simultaneously for the same order, state values conflicted."
                    }
                    <img
                      src="/images/sparta-logistics/key_seq_1.webp"
                      alt="Challenge No.2 Problem 1 Sequence Diagram"
                      className="mt-2 rounded-lg border border-white/10 max-w-full"
                    />
                  </li>
                  <li>
                    <span className="text-slate-400 font-medium">{isKor ? "해결 1. " : "Solution 1. "}</span>
                    {isKor
                      ? "Redis 분산 락(SET NX EX 30)을 도입해 임계 구간에 하나의 요청만 진입하도록 직렬화하여 동시 진입으로 인한 상태 충돌을 해소했습니다."
                      : "Introduced a Redis distributed lock (SET NX EX 30) to serialize access so only one request enters the critical section at a time, resolving state conflicts from concurrent entry."
                    }
                    <img
                      src="/images/sparta-logistics/key_seq_2.webp"
                      alt="Challenge No.2 Solution 1 Sequence Diagram"
                      className="mt-2 rounded-lg border border-white/10 max-w-full"
                    />
                  </li>
                  <li>
                    <span className="text-slate-400 font-medium">{isKor ? "문제 2. " : "Problem 2. "}</span>
                    {isKor
                      ? "분산 락은 Saga 종료가 아닌 임계 구간 탈출 시점에 해제되므로, 락 해제 후 커밋 완료 사이의 구간은 보호되지 않았습니다."
                      : "Since the distributed lock is released when leaving the critical section rather than at Saga completion, the gap between lock release and commit completion remained unprotected."
                    }
                    <img
                      src="/images/sparta-logistics/key_seq_3.webp"
                      alt="Challenge No.2 Problem 2 Sequence Diagram"
                      className="mt-2 rounded-lg border border-white/10 max-w-full"
                    />
                  </li>
                  <li>
                    <span className="text-slate-400 font-medium">{isKor ? "해결 2. " : "Solution 2. "}</span>
                    {isKor
                      ? "분산 락과 Redis 상태 키(CANCELLING / PROCESSING)를 함께 사용해, 락 해제 이후 구간도 상태 키로 사전 차단하고 JPA @Version 낙관적 락으로 DB 레벨 최후 방어선을 추가했습니다."
                      : "By combining the distributed lock with Redis state keys (CANCELLING / PROCESSING), the gap after lock release is blocked by the state key, with JPA @Version optimistic lock added as a final DB-level safeguard."
                    }
                    <img
                      src="/images/sparta-logistics/key_seq_4.webp"
                      alt="Challenge No.2 Solution 2 Sequence Diagram"
                      className="mt-2 rounded-lg border border-white/10 max-w-full"
                    />
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-200">
                  3. {isKor ? "Kafka를 선택한 이유 (vs RabbitMQ)" : "Why Kafka Over RabbitMQ"}
                </h4>
                <ul className="list-disc pl-6 text-slate-300 space-y-1 mt-1">
                  <li>
                    {isKor
                      ? "파티션 키 기반 순서 보장: orderId를 파티션 키로 사용해 동일 주문 이벤트가 같은 파티션으로 라우팅되도록 했습니다."
                      : "Partition key-based ordering: Used orderId as the partition key to route events for the same order to the same partition."
                    }
                  </li>
                  <li>
                    {isKor
                      ? "멀티 컨슈머 팬아웃: delivery.created 이벤트 하나를 OrderService와 SlackService가 각자 독립적으로 소비하는 구조가 필요했습니다."
                      : "Multi-consumer fan-out: A single delivery.created event needed to be consumed independently by both OrderService and SlackService."
                    }
                  </li>
                  <li>
                    {isKor
                      ? "Outbox 패턴 연계: 로그 기반 영속성과 at-least-once 보장이 폴링 릴레이 방식과 자연스럽게 결합됩니다."
                      : "Outbox pattern synergy: Log-based persistence and at-least-once guarantees naturally combine with the polling relay approach."
                    }
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-200">
                  4. {isKor ? "EmbeddedKafka 기반 통합 테스트" : "Integration Testing with EmbeddedKafka"}
                </h4>
                <ul className="list-disc pl-6 text-slate-300 space-y-1 mt-1">
                  <li>
                    {isKor
                      ? "Choreography Saga 3건 + Orchestration Saga 7건, 총 10개 시나리오를 @EmbeddedKafka로 검증했습니다. 실제 Kafka 브로커 없이 Consumer 레이어부터 DB 상태 전이까지 자동화 검증이 가능합니다."
                      : "Verified 10 total scenarios (3 Choreography Saga + 7 Orchestration Saga) using @EmbeddedKafka, enabling automated validation from the Consumer layer through DB state transitions without a real Kafka broker."
                    }
                  </li>
                  <li>
                    {isKor
                      ? "Config Server 비활성 환경의 optional:configserver: 처리 문제와 @WebMvcTest + @MockitoBean 조합으로 컨트롤러 단위 테스트 격리를 해결했습니다."
                      : "Resolved optional:configserver: handling in a Config Server-disabled environment, and achieved controller unit test isolation using @WebMvcTest + @MockitoBean."
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 이벤트 토픽 명세 */}
          <div>
            <h3 className="text-xl font-semibold text-slate-200">▶ {isKor ? "이벤트 토픽 명세" : "Event Topic Specification"}</h3>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="text-left py-2 pr-4 font-medium">{isKor ? "토픽" : "Topic"}</th>
                    <th className="text-left py-2 pr-4 font-medium">Producer</th>
                    <th className="text-left py-2 pr-4 font-medium">Consumer</th>
                    <th className="text-left py-2 font-medium">{isKor ? "역할" : "Role"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(isKor ? [
                    ["order.created", "OrderService", "HubService", "재고 예약 트리거"],
                    ["stock.reserved", "HubService", "DeliveryService", "배송 생성 트리거"],
                    ["stock.reservation.failed", "HubService", "OrderService", "주문 CANCELLED 보상"],
                    ["delivery.created", "DeliveryService", "OrderService, SlackService", "ACCEPTED 전이 + AI 납기 산출"],
                    ["delivery.creation.failed", "DeliveryService", "OrderService", "주문 CANCELLED 보상"],
                    ["ai.deadline.calculated", "SlackService", "DeliveryService", "납기일 저장"],
                    ["delivery.started", "DeliveryService", "HubService", "실제 재고 차감"],
                    ["cancel.delivery.command", "Orchestrator", "DeliveryService", "취소 오케스트레이션 커맨드"],
                    ["delivery.cancelled.ack", "DeliveryService", "Orchestrator", "배송 취소 확인"],
                    ["delivery.cancellation.failed", "DeliveryService", "Orchestrator", "배송 취소 거부 → 이전 상태 복구"],
                    ["restore.stock.command", "Orchestrator", "HubService", "재고 복구 커맨드 (최대 3회 재시도)"],
                    ["stock.restored.ack", "HubService", "Orchestrator", "재고 복구 확인 → CANCELLED 확정"],
                    ["stock.restoration.failed", "HubService", "Orchestrator", "재고 복구 실패 → 재시도"],
                  ] : [
                    ["order.created", "OrderService", "HubService", "Trigger stock reservation"],
                    ["stock.reserved", "HubService", "DeliveryService", "Trigger delivery creation"],
                    ["stock.reservation.failed", "HubService", "OrderService", "Compensate: CANCELLED"],
                    ["delivery.created", "DeliveryService", "OrderService, SlackService", "Transition ACCEPTED + AI deadline"],
                    ["delivery.creation.failed", "DeliveryService", "OrderService", "Compensate: CANCELLED"],
                    ["ai.deadline.calculated", "SlackService", "DeliveryService", "Store final deadline"],
                    ["delivery.started", "DeliveryService", "HubService", "Deduct actual stock"],
                    ["cancel.delivery.command", "Orchestrator", "DeliveryService", "Cancel orchestration command"],
                    ["delivery.cancelled.ack", "DeliveryService", "Orchestrator", "Delivery cancel confirmed"],
                    ["delivery.cancellation.failed", "DeliveryService", "Orchestrator", "Reject cancel → restore previous state"],
                    ["restore.stock.command", "Orchestrator", "HubService", "Stock restore command (up to 3 retries)"],
                    ["stock.restored.ack", "HubService", "Orchestrator", "Stock restored → CANCELLED confirmed"],
                    ["stock.restoration.failed", "HubService", "Orchestrator", "Stock restore failed → retry"],
                  ]).map(([topic, producer, consumer, role], i) => (
                    <tr key={i}>
                      <td className="py-2 pr-4 font-mono text-xs text-slate-200 whitespace-nowrap">{topic}</td>
                      <td className="py-2 pr-4 text-slate-400 text-xs whitespace-nowrap">{producer}</td>
                      <td className="py-2 pr-4 text-slate-400 text-xs">{consumer}</td>
                      <td className="py-2 text-xs">{role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 설계 결정 기록 */}
          <div>
            <h3 className="text-xl font-semibold text-slate-200">▶ {isKor ? "설계 결정 기록" : "Architecture Decision Records"}</h3>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="text-left py-2 pr-6 font-medium">{isKor ? "결정" : "Decision"}</th>
                    <th className="text-left py-2 pr-6 font-medium">{isKor ? "비교 후보" : "Alternative"}</th>
                    <th className="text-left py-2 font-medium">{isKor ? "선택 이유" : "Rationale"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(isKor ? [
                    ["메시징: Kafka", "RabbitMQ", "파티션 키 순서 보장 + 멀티 컨슈머 팬아웃 + Outbox 릴레이 연계"],
                    ["생성 Saga: Choreography", "Orchestration", "서비스 간 결합도 최소화, 중앙 조율자 불필요"],
                    ["취소 Saga: Orchestration", "Choreography", "보상 순서 명확, 실패 재시도 단일 책임 확보"],
                    ["동시성: Redis 분산 락", "DB 비관적 락", "서비스 분산 환경에서 DB 락은 서비스 간 경계를 넘지 못함"],
                  ] : [
                    ["Messaging: Kafka", "RabbitMQ", "Partition key ordering + multi-consumer fan-out + Outbox relay synergy"],
                    ["Creation Saga: Choreography", "Orchestration", "Minimal coupling, no central orchestrator needed"],
                    ["Cancellation Saga: Orchestration", "Choreography", "Clear compensation order, single point for retry logic"],
                    ["Concurrency: Redis Distributed Lock", "DB Pessimistic Lock", "DB locks cannot cross service boundaries in a distributed setup"],
                  ]).map(([decision, alt, reason], i) => (
                    <tr key={i}>
                      <td className="py-2 pr-6 font-mono text-xs text-slate-200 whitespace-nowrap">{decision}</td>
                      <td className="py-2 pr-6 text-slate-400 text-xs whitespace-nowrap">{alt}</td>
                      <td className="py-2 text-xs">{reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 설계 한계 및 개선 방향 */}
          <div>
            <h3 className="text-xl font-semibold text-slate-200">▶ {isKor ? "설계 한계 및 개선 방향" : "Known Limitations & Improvements"}</h3>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="text-left py-2 pr-6 font-medium">{isKor ? "항목" : "Item"}</th>
                    <th className="text-left py-2 pr-6 font-medium">{isKor ? "현재" : "Current"}</th>
                    <th className="text-left py-2 font-medium">{isKor ? "개선 방향" : "Improvement"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(isKor ? [
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

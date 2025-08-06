import Link from "next/link";

export default function KioskBackofficeDetail() {
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
          키오스크 버전 관리 웹 애플리케이션
        </h2>
      </div>

      <p className="text-violet-200">
        키오스크 앱 배포 및 버전 현황 관리를 위한 운영자용 백오피스 시스템
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-cyan-300">▶ 주요 기능과 문제 해결 흐름</h3>
          <div className="space-y-5 mt-4">

            {/* 기능 1 */}
            <div>
              <h4 className="text-lg font-semibold text-cyan-300">
                1. 대용량 APK 업로드 실패 문제
              </h4>
              <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                <li>
                  네트워크가 불안정한 환경에서 .apk 파일 업로드가 중단되면 전체 파일이 유실되거나 다시 처음부터 업로드해야 하는 상황이 반복되었습니다.
                </li>
                <li>
                  분할 업로드 및 서버 병합 구조를 도입하여, 클라이언트에서 .apk 파일을 여러 조각으로 나눠 전송하고
                  서버에서는 이를 순차적으로 병합하도록 구현했습니다.각 조각의 업로드 상태를 저장하고, 
                  중단 지점부터 이어서 업로드할 수 있도록 재요청 가능 구조로 설계했습니다.
                </li>
                <li>
                  대용량 파일도 안정적으로 업로드할 수 있게 되었으며, 네트워크가 끊기더라도 부분 복구가 가능해 사용자 경험과 안정성이 향상되었습니다.
                </li>
              </ul>
            </div>

            {/* 기능 2 */}
            <div>
              <h4 className="text-lg font-semibold text-cyan-300">
                2. 버전 정보 및 메타데이터 통합 관리 기능
              </h4>
              <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                <li>
                  각 지점 키오스크의 설치 버전 정보를 관리할 방법이 없어 APK 파일을 언제 누가 어떤 버전으로 업로드했는지 파악할 수 없었고,
                  잘못된 버전이 배포되어도 이력을 추적하기 어려운 상태였습니다.
                </li>
                <li>
                  APK 파일 등록 시 자동으로 생성되는 버전 코드, 파일명, 용량, 등록 일시 등을 버전 관리 테이블에 함께 저장하도록 설계하고,
                  각 단말기별 현재 설치 버전과 연결할 수 있도록 구조화했습니다.
                  운영자가 등록된 버전 목록을 UI 상에서 테이블 형태로 쉽게 확인할 수 있도록 구성했습니다.
                </li>
                <li>
                  운영자는 이제 각 단말기 또는 전체 사업장의 버전 업로드 이력과 상태를 한눈에 확인할 수 있게 되었고,
                  잘못된 버전 배포나 누락을 사전에 방지할 수 있게 되었습니다.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-cyan-300">▶ 배운 점</h3>
          <div className="space-y-5 mt-4">
            <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
              <li>백엔드와 프론트엔드를 모두 구현하며, 실사용자의 관점에서 '어디서 막힐 수 있는가'를 중심으로 UI/로직을 설계하는 감각을 키울 수 있었습니다.</li>
              <li>기능 구현을 넘어서, 운영자 입장에서 시스템을 바라보며 사용자 중심 설계의 중요성을 체감했습니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

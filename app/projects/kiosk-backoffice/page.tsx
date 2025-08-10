"use client";
import { useState, useEffect } from 'react';
import ResponsiveText from "../../components/ResponsiveText";
import Button from "../../components/Button";
import { useSettingsStore } from '../../store/settingsStore';

export default function KioskBackofficeDetail() {
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
            <ResponsiveText values={language === "Kor" ? ["키오스크", "버전 관리", "웹 앱"] : ["Kiosk", "Version Control", "Web App"]}/>
          </h2>
        </div>

        <p className="text-violet-200">
          {language === "Kor" ? "키오스크 앱 배포 및 버전 현황 관리를 위한 운영자용 백오피스 시스템" : "An admin back-office system for kiosk app deployment and version status management."}
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-cyan-300">▶ {language === "Kor" ? "주요 기능과 문제 해결 흐름" : "Key Features & Problem-Solving Flow"}</h3>
            <div className="space-y-5 mt-4">

              {/* 기능 1 */}
              <div>
                <h4 className="text-lg font-semibold text-cyan-300">
                  1. {language === "Kor" ? "대용량 APK 업로드 실패 문제" : "Large APK Upload Failure Issue"}
                </h4>
                <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                  <li>
                    {language === "Kor" ? "네트워크가 불안정한 환경에서 .apk 파일 업로드가 중단되면 전체 파일이 유실되거나 다시 처음부터 업로드해야 하는 상황이 반복되었습니다." : "In unstable network environments, .apk file uploads were frequently interrupted, leading to repeated situations where the entire file was lost or had to be re-uploaded from the beginning."}
                  </li>
                  <li>
                    {language === "Kor" ? "분할 업로드 및 서버 병합 구조를 도입하여, 클라이언트에서 .apk 파일을 여러 조각으로 나눠 전송하고 서버에서는 이를 순차적으로 병합하도록 구현했습니다. 각 조각의 업로드 상태를 저장하고, 중단 지점부터 이어서 업로드할 수 있도록 재요청 가능 구조로 설계했습니다." : "A chunked upload and server-side merge structure was introduced. The client sends the .apk file in multiple pieces, which the server then sequentially merges. The upload status of each chunk is saved, and a resumable request structure was designed to allow uploads to continue from the point of interruption."}
                  </li>
                  <li>
                    {language === "Kor" ? "대용량 파일도 안정적으로 업로드할 수 있게 되었으며, 네트워크가 끊기더라도 부분 복구가 가능해 사용자 경험과 안정성이 향상되었습니다." : "This enabled stable uploads of large files, and partial recovery became possible even if the network was disconnected, improving user experience and stability."}
                  </li>
                </ul>
              </div>

              {/* 기능 2 */}
              <div>
                <h4 className="text-lg font-semibold text-cyan-300">
                  2. {language === "Kor" ? "버전 정보 및 메타데이터 통합 관리 기능" : "Integrated Management of Version Info & Metadata"}
                </h4>
                <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                  <li>
                    {language === "Kor" ? "각 지점 키오스크의 설치 버전 정보를 관리할 방법이 없어 APK 파일을 언제 누가 어떤 버전으로 업로드했는지 파악할 수 없었고, 잘못된 버전이 배포되어도 이력을 추적하기 어려운 상태였습니다." : "There was no way to manage the installed version information for each kiosk, making it impossible to determine who uploaded which version of an APK file and when. This made it difficult to track the history if an incorrect version was deployed."}
                  
                  </li>
                  <li>
                    {language === "Kor" ? "APK 파일 등록 시 자동으로 생성되는 버전 코드, 파일명, 용량, 등록 일시 등을 버전 관리 테이블에 함께 저장하도록 설계하고, 각 단말기별 현재 설치 버전과 연결할 수 있도록 구조화했습니다. 운영자가 등록된 버전 목록을 UI 상에서 테이블 형태로 쉽게 확인할 수 있도록 구성했습니다." : "A system was designed to automatically save the version code, filename, size, and registration timestamp to a version control table upon APK file registration. It was structured to link this data with the currently installed version on each terminal. The registered version list was configured to be easily viewable by operators in a table format on the UI."}
                  </li>
                  <li>
                    {language === "Kor" ? "운영자는 이제 각 단말기 또는 전체 사업장의 버전 업로드 이력과 상태를 한눈에 확인할 수 있게 되었고, 잘못된 버전 배포나 누락을 사전에 방지할 수 있게 되었습니다." : "Operators can now see the version upload history and status for each terminal or the entire business at a glance, allowing them to prevent incorrect version deployments or omissions in advance."}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-cyan-300">▶ {language === "Kor" ? "배운 점" : "What I Learned"}</h3>
            <div className="space-y-5 mt-4">
              <ul className="list-disc pl-6 text-violet-200 whitespace-pre-line">
                <li>{language === "Kor" ? "백엔드와 프론트엔드를 모두 구현하며, 실사용자의 관점에서 '어디서 막힐 수 있는가'를 중심으로 UI/로직을 설계하는 감각을 키울 수 있었습니다." : "By implementing both the backend and frontend, I was able to develop a sense for designing UI/logic centered on 'where users might get stuck' from a real user's perspective."}</li>
                <li>{language === "Kor" ? "기능 구현을 넘어서, 운영자 입장에서 시스템을 바라보며 사용자 중심 설계의 중요성을 체감했습니다." : "Going beyond feature implementation, I experienced the importance of user-centered design by looking at the system from an operator's point of view."}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

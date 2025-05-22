import TitleBar from "../../components/TitleBar";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  const privacy = {
    title: "プライバシーポリシー",
    introduction:
      "株式会社glow（以下、「当社」といいます。）は、当社が提供するサービス「Throwin」（以下、「本サービス」といいます。）におけるユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。",
    sections: [
      {
        title: "第1条（収集する情報）",
        content:
          "当社は、本サービスの提供にあたり、以下の情報を取得することがあります。",
        subsections: [
          "氏名、メールアドレス、電話番号など、ユーザーが登録時に入力する情報",
          "サービス利用履歴、アクセスログ、IPアドレス、クッキー等の情報",
        ],
      },
      {
        title: "第2条（利用目的）",
        subsections: [
          "本サービスの提供・運営のため",
          "ユーザーからのお問い合わせに対応するため",
          "メンテナンス、重要なお知らせなどのご案内のため",
          "利用規約に違反する行為への対応のため",
          "法令に基づく対応や必要な場合の本人確認のため",
        ],
      },
      {
        title: "第3条（第三者提供）",
        content:
          "当社は、法令に定められた場合を除き、ユーザーの同意を得ることなく第三者に個人情報を提供しません。",
      },
      {
        title: "第4条（情報の管理）",
        content:
          "当社は、ユーザーの個人情報を正確かつ最新の内容に保つよう努め、不正アクセス・漏洩・紛失・改ざん等を防止するため、必要かつ適切な安全管理措置を講じます。",
      },
      {
        title: "第5条（プライバシーポリシーの変更）",
        content:
          "当社は、必要に応じて本ポリシーを変更することがあります。変更後の内容は、本サービス上に表示し、ユーザーが確認できるようにします。",
      },
    ],
    lastUpdated: "2025年4月5日 制定",
  };

  return (
    <div className="w-full mb-[120px]">
      <Helmet>
        <title>Throwin | プライバシーポリシー</title>
      </Helmet>

      <TitleBar style="mb-0 w-full" title="プライバシーポリシー" icon={null} />

      <div className="w-full max-w-[430px] mx-auto px-4 sm:px-6 mt-7 text-[#44495B]">
        <div className="bg-gray-100 p-4 rounded mb-6 text-sm">
          <p className="text-gray-700 whitespace-pre-line">
            {privacy.introduction}
          </p>
        </div>

        <div className="space-y-6">
          {privacy.sections.map((section, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                {section.title}
              </h2>
              {section.content && (
                <p className="text-gray-700 mb-2 whitespace-pre-line text-sm">
                  {section.content}
                </p>
              )}
              {section.subsections && (
                <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-700">
                  {section.subsections.map((sub, subIndex) => (
                    <li key={subIndex} className="whitespace-pre-line">
                      {sub}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 text-right text-gray-400 text-xs">
          {privacy.lastUpdated}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

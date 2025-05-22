import TitleBar from "../../components/TitleBar";
import { Helmet } from "react-helmet";

const TermsOfUser = () => {
  const terms = {
    title: "Throwin利用規約（ユーザー）",
    introduction:
      "「本サービス利用規約（ユーザー）」（以下、「本規約」といいます。）は、株式会社glow（以下、「当社」といいます。）がインターネット上で提供するwebサービス「Throwin」（以下、「本サービス」といいます。）を利用するにあたって、当社とユーザーの権利義務及び責任事項を規定しています。本サービスの利用に際しては、本規約の全文をお読みいただいたうえで、本規約に同意していただく必要があります。",
    sections: [
      {
        title: "第１条 (目的)",
        content:
          "本規約は、本サービスに関する当社とユーザーの一切の関係に適用します。",
      },
      {
        title: "第２条 (定義)",
        content:
          "本サービスとは、以下のサービス及びそれらの総称をいうものとします。",
        subsections: [
          "当社のインターネットwebサービスThrowinを通じて、ユーザーが不特定多数の会員に金銭を付与する行為であり、ユーザーはその行為を許諾する。",
          "ユーザーとは、本サービスにアクセスしたサービス利用者、主として金銭を会員に付与、送金するサービス利用者を指します。",
          "会員とは、当社と本サービスの利用を個別に契約締結した法人又は企業（団体、法人）を指します。",
          "ユーザーは本サービスを利用し、会員に付与した金銭の返品、返金、交換（付与した金額の増額と減額）、はできないものとする。",
          "本サービスは決済代行会社を介し、金銭を収納する。収納する際、決済手数料がかかるものとする。",
          "決済代行会社がユーザーから金銭を収納した時点で、ユーザーと当社の間の決済が完了したものとする。",
          "本サービスを募金目的で利用した際に発生したトラブルの損害賠償にいては、当社は一切の責任を負わないものとする。",
        ],
      },
      {
        title: "第3条 (本件各規約の変更・追加)",
        subsections: [
          "当社は以下の場合に、ユーザーと個別の同意を要せず、本規約を変更することができるものする。\n・本規約の変更がユーザー又は会員の利益に適合するとき。\n・本規約等の変更が本サービスの利用目的に反せず、かつ変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。",
          "当社はユーザー又は会員に対し、前項による本規約等の変更にあたり、事前に本規約等を変更する旨及び変更後の本規約等の内容並びにその効力発生時期を通知します。",
        ],
      },
    ],
    lastUpdated: "2025年4月5日 制定",
  };

  return (
    <div className="w-full mb-[120px]">
      <Helmet>
        <title>Throwin | 利用規約</title>
      </Helmet>

      <TitleBar style="mb-0 w-full" title="利用規約" icon={null} />

      <div className="w-full max-w-[430px] mx-auto px-4 sm:px-6 mt-7 text-[#44495B]">
        <div className="bg-gray-100 p-4 rounded mb-6 text-sm">
          <p className="text-gray-700 whitespace-pre-line">
            {terms.introduction}
          </p>
        </div>

        <div className="space-y-6">
          {terms.sections.map((section, index) => (
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
          {terms.lastUpdated}
        </div>
      </div>
    </div>
  );
};

export default TermsOfUser;

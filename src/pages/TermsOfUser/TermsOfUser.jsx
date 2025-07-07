import TitleBar from "../../components/TitleBar";
import { Helmet } from "react-helmet";

const TermsOfUser = () => {
  return (
    <div className="w-full h-screen">
      <Helmet>
        <title>Throwin | 利用規約</title>
      </Helmet>
      <TitleBar style="mb-0 w-full" title="利用規約" icon={null} />
      <div className="w-full h-[calc(100vh-48px)] mt-0">
        <iframe
          src="/legal/Throwin利用規約（ユーザー向け）2025年4月5日策定.pdf"
          width="100%"
          height="100%"
          title="利用規約PDF"
          style={{ border: "none", minHeight: "100vh" }}
        />
      </div>
    </div>
  );
};

export default TermsOfUser;

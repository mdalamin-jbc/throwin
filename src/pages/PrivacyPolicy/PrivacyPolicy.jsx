import TitleBar from "../../components/TitleBar";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <div className="w-full h-screen">
      <Helmet>
        <title>Throwin | プライバシーポリシー</title>
      </Helmet>
      <TitleBar style="mb-0 w-full" title="プライバシーポリシー" icon={null} />
      <div className="w-full h-[calc(100vh-48px)] mt-0">
        <iframe
          src="/legal/Throwinプライバシーポリシー20250405策定.pdf"
          width="100%"
          height="100%"
          title="プライバシーポリシーPDF"
          style={{ border: "none", minHeight: "100vh" }}
        />
      </div>
    </div>
  );
};

export default PrivacyPolicy;

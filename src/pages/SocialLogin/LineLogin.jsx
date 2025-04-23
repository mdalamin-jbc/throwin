

const LineLogin = ({ onSuccess, onError }) => {
  // LINE Login Constants
  const LINE_CLIENT_ID = '2007107180';
  const  LINE_REDIRECT_URI = `${window.location.origin}/socialLogin`;
  // Redirect to socialLogin component

  // Handle LINE login initiation
  const handleLineLogin = () => {
    const state = Math.random().toString(36).substring(2, 15); // Simple random state
    const scope = 'profile openid';
    const authUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LINE_CLIENT_ID}&redirect_uri=${LINE_REDIRECT_URI}&state=${state}&scope=${scope}`;
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleLineLogin}
      className="relative w-[246px] h-[49px] flex items-center justify-center rounded-lg text-white shadow-md"
      style={{ backgroundColor: "#06C755" }}
    >
      {/* You can add LINE logo image here */}
      <span className="font-hiragino font-semibold text-[14px] leading-[21px] tracking-[0.03em]">
        LINE
      </span>
    </button>
  );
};

export default LineLogin;
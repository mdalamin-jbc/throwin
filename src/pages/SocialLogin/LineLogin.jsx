// 1. First, let's update the LineLogin component
// LineLogin.jsx
import { useNavigate } from "react-router-dom";

const LineLogin = ({ onSuccess, onError }) => {
  const navigate = useNavigate();
  
  // LINE Login Constants
  const LINE_CLIENT_ID = '2007107180';
  const LINE_REDIRECT_URI = `https://alpha.throwin-glow.com/callback`;
  
  // Handle LINE login initiation
  const handleLineLogin = () => {
    const state = Math.random().toString(36).substring(2, 15); // Simple random state
    const scope = 'profile openid email';
    
    
    // Store state in localStorage to verify after callback
    localStorage.setItem('line_login_state', state);
    
    const authUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LINE_CLIENT_ID}&redirect_uri=${encodeURIComponent(LINE_REDIRECT_URI)}&state=${state}&scope=${scope}`;
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleLineLogin}
      className="relative w-[246px] h-[49px] flex items-center justify-center rounded-lg text-white shadow-md"
      style={{ backgroundColor: "#06C755" }}
    >
      <span className="font-hiragino font-semibold text-[14px] leading-[21px] tracking-[0.03em]">
        LINE
      </span>
    </button>
  );
};

export default LineLogin;
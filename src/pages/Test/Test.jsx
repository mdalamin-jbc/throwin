
import React, { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
const Test = () => {
    
    const LINE_CLIENT_ID = '2007107180';
    const LINE_REDIRECT_URI = "http://localhost:5173/callback"; // Same as current page for simplicity

    // Google Login Handler
    const handleGoogleSuccess = async (response) => {
        try {
            const res = await axios.post('http://localhost:8000/auth/social/google', {
                access_token: response.credential,
            });
            console.log('Google Login Successful:', res.data);
        } catch (error) {
            console.error('Google Login Failed:', error.response?.data || error.message);
        }
    };

    const handleGoogleFailure = (error) => {
        console.error('Google Login Failed:', error);
    };

    // LINE Login Initiation
    const handleLineLogin = () => {
        const state = Math.random().toString(36).substring(2, 15); // simple random state
        const scope = 'profile openid';
        const authUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LINE_CLIENT_ID}&redirect_uri=${LINE_REDIRECT_URI}&state=${state}&scope=${scope}`;
        window.location.href = authUrl;
    };

    // LINE Redirect Callback Handling
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (code) {
            axios.post('https://api-dev.throwin-glow.com/auth/social/line', {
                code: code,
                redirect_uri: LINE_REDIRECT_URI,
            })
                .then(res => {
                    console.log('LINE Login Successful:', res.data);
                    window.history.replaceState({}, document.title, '/'); // Clean up URL
                })
                .catch(error => {
                    console.error('LINE Login Failed:', error.response?.data || error.message);
                });
        }
    }, []);

    return (
        <GoogleOAuthProvider clientId="518915798524-jkvlf5hggamfogto0apg7p7ja97953db.apps.googleusercontent.com">
            <div className="App">
                <h1>Social Login</h1>

                <h2>Google Login</h2>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                />

                <h2>OR</h2>

                <button
                    onClick={handleLineLogin}
                    style={{ padding: '10px 20px', backgroundColor: '#00C300', color: '#fff', border: 'none', borderRadius: '4px' }}
                >
                    Login with LINE
                </button>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Test;
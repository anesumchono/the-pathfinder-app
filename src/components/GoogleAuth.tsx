import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface GoogleAuthProps {
  onLoginSuccess: (user: any) => void;
}

interface GoogleCredentialResponse {
  credential?: string;
  clientId?: string;
  select_by?: string;
}

const GoogleAuth = ({ onLoginSuccess }: GoogleAuthProps) => {
  const handleSuccess = (credentialResponse: GoogleCredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      const user = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        sub: decoded.sub
      };
      onLoginSuccess(user);
      localStorage.setItem('pathfinder_user', JSON.stringify(user));
    }
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="filled_blue"
        size="large"
        text="continue_with"
        shape="rectangular"
      />
    </div>
  );
};

export default GoogleAuth;

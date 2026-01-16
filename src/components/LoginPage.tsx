import { GraduationCap, Sparkles, Target, TrendingUp } from 'lucide-react';
import GoogleAuth from './GoogleAuth';

interface LoginPageProps {
  onLoginSuccess: (user: any) => void;
}

const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-cyan-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left side - Branding */}
        <div className="text-white space-y-6 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-linear-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                PathFinder
              </h1>
              <p className="text-cyan-200 text-sm">Your Career Journey Starts Here</p>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Discover Your Perfect Career Path
          </h2>
          
          <p className="text-lg text-cyan-100 leading-relaxed">
            Get personalized career recommendations based on your academic performance, 
            interests, and goals. Join thousands of students finding their way.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <h3 className="font-semibold text-cyan-100">AI-Powered Analysis</h3>
                <p className="text-sm text-cyan-200/80">Smart algorithms match you with ideal careers</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold text-cyan-100">Personalized Roadmap</h3>
                <p className="text-sm text-cyan-200/80">Step-by-step guidance to achieve your goals</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h3 className="font-semibold text-cyan-100">Track Progress</h3>
                <p className="text-sm text-cyan-200/80">Save and monitor your career journey</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
            <p className="text-slate-600">Sign in to continue your journey</p>
          </div>

          <div className="space-y-6">
            <GoogleAuth onLoginSuccess={onLoginSuccess} />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">Or continue as guest</span>
              </div>
            </div>

            <button
              onClick={() => onLoginSuccess({ name: 'Guest User', email: 'guest@pathfinder.app', isGuest: true })}
              className="w-full py-3 px-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
            >
              Continue as Guest
            </button>
          </div>

          <p className="text-xs text-slate-500 text-center mt-8">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome to Lexend Admin Panel",
        });
        navigate('/', { replace: true });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <img 
              src="https://themegenix.com/demo/lexend-wp/assets/images/landing/logo.svg" 
              alt="Lexend" 
              className="h-12 mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign-In</h1>
            <p className="text-gray-600">Access the Lexend panel using your email and passcode.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email or Username</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-gray-50 border-gray-200 focus:border-purple-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">Passcode</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your passcode"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-gray-50 border-gray-200 focus:border-purple-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-gray-500 mb-4">OR</div>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" className="flex-1 h-12 text-purple-600 border-purple-200 hover:bg-purple-50">
                Facebook
              </Button>
              <Button variant="outline" className="flex-1 h-12 text-purple-600 border-purple-200 hover:bg-purple-50">
                Google
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500">I don't have an account? <span className="text-purple-600 cursor-pointer hover:underline">Try 15 days free</span></p>
          </div>
        </div>

        {/* Right Side - Preview Image */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <img 
              src="https://dashlite.net/demo2/images/slides/promo-a2x.png" 
              alt="Dashboard Preview" 
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Lexend</h3>
              <p className="text-gray-600">You can start to create your products easily with its user-friendly design & most completed responsive layout.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

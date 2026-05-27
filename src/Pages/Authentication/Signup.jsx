import { useState } from 'react';
import Logo from "./Logo";
import {useNavigate} from "react-router-dom"

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studyingat, setStudyingat] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const handleSignup = async () => {
    setErrorMessage('');
    setStudyingat("string");

    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      // Typically, signup endpoints expect JSON rather than Form Data
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          emailid: email,
          password: password,
          studying_at: studyingat
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup successful!');
        alert('Account created successfully! You can now log in.');
        
        // TODO: Redirect the user to the Login page here
        
      } else {
        // Display backend error (e.g., "Username already exists")
        setErrorMessage(data.detail || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('Network error. Is your backend server running?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-stone-950 flex-col">
      <Logo />
      <h2 className="text-[#F8FAFC] font-sans text-3xl font-bold">Create an account</h2>
      <p className="text-[#F8FAFC] font-sans">Start your learning adventure today</p>
      
      <div className="w-full max-w-md rounded-lg p-8 shadow-md text-[#F8FAFC] font-sans">
        
        {errorMessage && (
          <div className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {errorMessage}
          </div>
        )}

        {/* Username Input Field */}
        <div className="mt-6 flex flex-col gap-1.5">
          <label htmlFor="username" className="text-sm font-semibold text-[#F8FAFC] font-sans">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="johndoe"
            disabled={isLoading}
            className="rounded-md border border-stone-950 px-3 py-2 text-sm placeholder-stone-400 outline-none transition focus:border-stone-400 focus:ring-1 focus:ring-stone-950 disabled:opacity-50 text-white"
          />
        </div>

        {/* Email Input Field */}
        <div className="mt-4 flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-[#F8FAFC] font-sans">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="you@example.com"
            disabled={isLoading}
            className="rounded-md border border-stone-950 px-3 py-2 text-sm placeholder-stone-400 outline-none transition focus:border-stone-400 focus:ring-1 focus:ring-stone-950 disabled:opacity-50 text-white"
          />
        </div>

        {/* Password Input Field */}
        <div className="mt-4 flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-semibold text-[#F8FAFC] font-sans">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="••••••••"
            disabled={isLoading}
            className="rounded-md border border-stone-950 px-3 py-2 text-sm placeholder-stone-400 outline-none transition focus:border-stone-400 focus:ring-1 focus:ring-stone-950 disabled:opacity-50 text-white"
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSignup}
          disabled={isLoading}
          className="mt-6 w-full rounded-md bg-[#10B981] py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 active:bg-stone-900 disabled:bg-stone-400"
        >
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
      </div>

      {/* Footer Toggle */}
      <div className="flex flex-row gap-1 cursor-pointer mt-2">
        <p className="text-stone-400">Already have an account?</p>
        <p className="text-[#10B981] active:text-lg transition duration-100" onClick={()=>{navigate("/login")}}>Sign In</p>
      </div>
    </div>
  );
};

export default Signup;
import { useState } from "react";
import Logo from "./Logo";
import Alert from '@mui/material/Alert';


import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
     
      const formData = new URLSearchParams();
      formData.append("username", email); 
      formData.append("password", password);

      // 2. Make the POST request to your backend
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const data = await response.json();

      
      if (response.ok) {
        
        localStorage.setItem("access_token", data.access_token);

        console.log("Login successful! Token saved.");
        alert("Success! You are now logged in.");

        navigate("/")
      } else {
       
        setErrorMessage(data.detail || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Network error. Is your backend server running?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-stone-950 flex-col">
      <Logo />
      
      <h2 className="text-[#F8FAFC] font-sans text-3xl font-bold">
        Welcome back!
      </h2>
      <p className="text-[#F8FAFC] font-sans">
        Continue your learning adventure
      </p>
      <div className="w-full max-w-md rounded-lg p-8 shadow-md text-[#F8FAFC] font-sans">
        {/* <h2 className="text-2xl font-bold tracking-tight text-stone-900">Welcome Back</h2> */}
        {/* <p className="mt-2 text-sm text-stone-600">Please enter your details to sign in.</p> */}

        {errorMessage && (
          // <div className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          //   {errorMessage}
          // </div>
          <Alert severity="error" className="mt-4 rounded border p-3 text-sm">{errorMessage}</Alert>
          // <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          //   {errorMessage}
          // </Alert>
        )}

        <div className="mt-6 flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-[#F8FAFC] font-sans"
          >
            Email / Username
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="you@example.com"
            disabled={isLoading}
            className="rounded-md border border-stone-300 px-3 py-2 text-sm placeholder-stone-400 outline-none transition focus:border-stone-950 focus:ring-1 focus:ring-stone-950 disabled:opacity-50"
          />
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-[#F8FAFC] font-sans"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={email ? password : ""}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="••••••••"
            disabled={isLoading}
            className="rounded-md border border-stone-300 px-3 py-2 text-sm placeholder-stone-400 outline-none transition focus:border-stone-950 focus:ring-1 focus:ring-stone-950 disabled:opacity-50"
          />
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={isLoading}
          className="mt-6 w-full rounded-md bg-[#10B981] py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 active:bg-stone-900 disabled:bg-stone-400"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </div>
      <div className="flex flex-row gap-1 cursor-pointer ">
        <p className="text-stone-400">New to EduLearn? </p>
        <p
          className="text-[#10B981] active:text-lg transition duration-100"
          onClick={() => navigate("/signup")}
        >
          Create an account
        </p>
      </div>
    </div>
  );
};

export default Login;

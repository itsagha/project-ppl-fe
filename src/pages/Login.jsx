import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postData } from '../api/axios';
import { jwtDecode } from 'jwt-decode';

export default function Login(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit} = useForm(); 

  const endPointParams = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_AUTH_URL; 

  const handlePressSubmit = async (data) => {
    try {
      const response = await postData(endPointParams, data); // postData mengembalikan token
      const token = response.token; // Ambil token dari response
      
      if (token) {
        localStorage.setItem("token", token);
        // ngedecode token
        const decoded = jwtDecode(token); 
        console.log("Payload:", decoded);
        localStorage.setItem("userData", JSON.stringify(decoded));

        if (decoded.role === "admin") {
          window.location.href = "/DashboardAdmin";
        } else if (decoded.role === "teacher") {
          window.location.href = "/DashboardTeacher";
        } else {
          window.location.href = "/DashboardStudent";
        }
      }
    } catch (error) {
      console.error("POST Error:", error);
      if (error.response) {
        setErrorMessage(error.response.data.message || "Login failed, check your NIP/NIS and password.");
      } else {
        setErrorMessage("Something went wrong, try again later.");
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Background */}
      <div className="w-1/2">
        <img
          src="/images/login/background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Form */}
      <div className="w-1/2 flex flex-col justify-center items-center mb-10">
        <img src="logo_title.png" alt="" className='max-w-40'/>
        <form className="w-4/5 max-w-sm mt-10" onSubmit={handleSubmit(handlePressSubmit)}>
          <h2 className="text-center text-3xl font-bold mb-2">Grow your understanding on Learnify!</h2>
          <p className="text-sm text-gray-400 w-96 text-justify mb-10">
            To keep connected with us, please login with your personal information by NIP/NIS and password.
          </p>

          {/* Input NIS */}
          <div className='mb-4 relative'>
            <input
              type="text"
              placeholder="NIP/NIS"
              {...register("username", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-xl placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Input Password */}
          <div className="mb-6 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password')}
              className="w-full p-2 border border-gray-300 rounded-xl placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {/* svg mata ketutup */}
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  {...props}
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.933 13.909A4.36 4.36 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.07 5.07 0 0 1 21 12c0 1-3 6-9 6q-.471 0-.918-.04M5 19L19 5m-4 7a3 3 0 1 1-6 0a3 3 0 0 1 6 0">
                  </path>
                </svg>
              ) : (
                // svg mata kebuka
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  {...props}
                >
                  <g fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6s4.03-6 9-6s9 4.8 9 6Z"></path>
                    <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"></path>
                  </g>
                </svg>
              )}
            </div>
          </div>
          {/* tombol login */}
          <button
            type="submit"
            className="w-full p-2.5 text-sm border border-primary text-primary rounded-xl mb-4 hoverAnimation cursor-pointer"
          >
            Login
          </button>

        </form>
        {errorMessage && (
          <p className="text-danger text-sm mt-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
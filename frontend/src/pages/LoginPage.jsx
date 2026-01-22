import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../auth/AuthContext";
import { useContext } from "react";

export const LoginPage = () => {
  const { refreshAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [message, setMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      await refreshAuth();
      setMessage("Login successful!");
      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
      setMessage("Login failed!");
    }
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-slate-100">
      <form
        onSubmit={submitForm}
        className="my-auto bg-white p-8 flex flex-col gap-7 rounded-2xl"
      >
        <div>
          <p className="text-xl font-semibold text-center my-2">Welcome back</p>
          <p className="text-gray-400 text-center">Sign into your account</p>
        </div>

        <input
          type="email"
          className="rounded-2xl w-88 p-3 focus:outline-none"
          placeholder="Email"
          ref={emailRef}
          required
          onKeyDown={handleEmailKeyDown}
        />

        <input
          type="password"
          className="rounded-2xl w-88 p-3 focus:outline-none"
          placeholder="Password"
          ref={passwordRef}
          required
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="cursor-pointer bg-black text-sm text-white border-2 py-2 rounded-2xl px-5 font-medium hover:bg-gray-700 transition-all"
          >
            Login
          </button>
        </div>

        <p className="text-center font-light">{message}</p>
      </form>
    </div>
  );
};

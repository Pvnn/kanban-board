import { useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/register", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        name: nameRef.current.value,
      });
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const handleNameKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      emailRef.current.focus();
    }
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-white-100">
      <form
        onSubmit={submitForm}
        className="my-auto bg-slate-100 p-8 flex flex-col gap-7 rounded-2xl"
      >
        <div>
          <p className="text-xl font-semibold text-center my-2">Get started</p>
          <p className="text-gray-600 text-center">Create your account</p>
        </div>

        <input
          type="text"
          className="rounded-2xl w-88 p-3 focus:outline-none"
          placeholder="Name"
          ref={nameRef}
          required
          onKeyDown={handleNameKeyDown}
        />

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
            Register
          </button>
        </div>

        <p className="text-center font-light text-sm">Already have an account? <Link
          to="/login" className="cursor-pointer hover:text-gray-500">
          Login
        </Link> </p>
      </form>
    </div>
  );
};

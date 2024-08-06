import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthcontext } from "../Context/Authcontext";

const Login = () => {
  const { setauthuser } = useAuthcontext();
  const [error, seterror] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //  console.log(inputs);
    try {
      if (inputs?.username && inputs?.password !== "") {
        const res = await axios.post(
          "https://backend-for-chat-app-b16y.onrender.com/api/auth/login",
          inputs,
          { withCredentials: true }
        );
        if (res?.data?.id) {
          setauthuser(res?.data);
        } else {
          seterror(res?.data);
        }
      }
    } catch (error) {
      console.log(`the error is: ${error}`);
    }
  };

  return (
    <div
      className=" relative  w-[400px] h-[375px] bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100
 "
    >
      <h1 className="font-bold text-[40px] text-white ml-[20px]">Login</h1>
      <form
        onSubmit={handlesubmit}
        className="w-full h-fit flex flex-col gap-[10px] px-[20px]  py-[20px]"
      >
        <span className="text-white ">Username</span>
        <input
          type="text"
          name="username"
          id=""
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          className="bg-slate-800  px-[10px] py-[9px]  border-none text-sm rounded-lg text-white focus:outline-none"
        />
        <span className="text-white ">Password</span>
        <input
          type="text"
          name="password"
          id=""
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          className="bg-slate-800  px-[10px] py-[9px]  border-none text-sm rounded-lg text-white focus:outline-none"
        />
        {error && (
          <span className="text-red-500 text-[12px] m-auto">{error}</span>
        )}
        <button
          type="submit"
          className="bg-blue-500 py-[10px] text-white font-semibold mt-[10px]"
        >
          Login
        </button>
      </form>
      <div className="px-[20px]  ">
        <span className=" text-white relative bottom-[6px]">
          Don't have an account?
          <Link to="/signup" className="text-blue-400">
            {" "}
            Signup
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;

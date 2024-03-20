import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";

function Signup() {
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(name, email, password);
    if (!name || !email || !password) {
      alert("Please Enter valid credentials");
      return false;
    }
    const regex = /^[^\s@]+@(?:[^\s@]+\.)+(?:com|edu)$/;
    const validate = regex.test(email);

    if (validate) {
      let result = await fetch(`https://mernecomebackend.onrender.com/register`, {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      if (result == false) {
        alert("Email Already exist please enter another email and try again");
        return result;
      }
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/login");
    } else {
      alert("Enter valid Email!");
    }
  };
  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="max-w-md w-full mx-auto mt-20">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-green-500 text-white w-full py-2 rounded focus:outline-none hover:bg-green-600">
              Register
            </button>
          </form>
          <p className="text-center">Already Have an Account</p>
          <Link to="/login" className="block border bg-gray-100 w-full py-2 rounded focus:outline-none hover:bg-gray-200 text-center">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;

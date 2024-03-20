import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  // console.log(cart.length)
  useEffect(()=>{
    const auth = localStorage.getItem("user")
    if(auth && cart.length>0){
      navigate("/checkout")
    }
  })

  const handleSubmit = async(e) => {
    
    e.preventDefault();
    let result = await fetch("https://mernecomebackend.onrender.com/login",{
      method:'post',
      body:JSON.stringify({email,password}),
      headers:{
        "Content-Type":"application/json",
      },
    })

    result = await result.json()
    console.log(result)

    if(result.auth && cart.length>0){
      localStorage.setItem("user",JSON.stringify(result.user))
      localStorage.setItem("token",JSON.stringify(result.auth))
      navigate('/checkout')
    }
    else if(result.auth){
      localStorage.setItem("user",JSON.stringify(result.user))
      localStorage.setItem("token",JSON.stringify(result.auth))
      navigate('/')
    }
    else{
      alert("Please Enter Correct details");
    }
  };
  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="max-w-md w-full mx-auto mt-20">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
          <p className="text-center">Already Have an Account</p>
          <Link to="/register" className="block border bg-gray-100 w-full py-2 rounded focus:outline-none hover:bg-gray-200 text-center">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;




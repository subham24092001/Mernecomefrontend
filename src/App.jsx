import React from "react";
// react-router-dom
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
// pages
import { Checkout, Home, ProductDetails } from "./pages";
// components
import { Sidebar, Header, Footer } from "./components";
// import Demo from "./demo/Demo";
import Help from "./components/Help";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="scrollbar-thin scrollbar-webkit">
      <Router>
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/help" element={<Help />} />
          {/* <Route path="/demo" element={<Demo />} /> */}
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <Sidebar />
        <Footer />
      </Router>
    </div>
  );
};

export default App;

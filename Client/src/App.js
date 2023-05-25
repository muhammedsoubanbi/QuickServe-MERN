import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import ProviderRoute from "./Routes/providerRoute";
import ProviderHome from "./components/Provider/home";
import AdminLogin from "./components/admin/Login/login";
import Servicecard from "./components/user/servicecard";
import Home from "./components/user/home/home";
import UserRoute from "./Routes/userRoute";
import AdminRoute from "./Routes/adminRoute";
import ProviderLogin from "./components/Provider/login";
import { Toaster } from "react-hot-toast";



function App() {

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>

          <Route path="/provider/register" element={<ProviderHome />} />
          <Route path="/provider/login" element={<ProviderLogin />} />
          <Route path="/card" element={<Servicecard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/*" element={<UserRoute />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/admin/*" element={<AdminRoute />} />
          <Route exact path="/provider/*" element={<ProviderRoute />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;

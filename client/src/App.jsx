import "./App.css";
import "./style.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {  useState } from "react";
import Sidebar from "./components/sidebar";
import { toast, Toaster } from "sonner";

function App() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);

  return (
    <>
      <Toaster richColors closeButton position="top-right" />
      <Header isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      {/* sidebar */}
      {isOpenMenu && (
        <Sidebar isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      )}
      <Outlet context={{ isOpenForm, setIsOpenForm }} />
      {!isOpenForm && <Footer />}
    </>
  );
}

export default App;

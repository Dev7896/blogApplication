import React from "react";
import { Menu, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import logo from "../../public/favicon.svg";

function Header({ isOpenMenu, setIsOpenMenu }) {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-8 md:px-18  py-12 relative ">
      <strong
        className="font-bold text-4xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        QuickBlog
      </strong>

      {/* mobile navigation */}
      <nav className="md:hidden">
        {!isOpenMenu && (
          <Menu size={"2rem"} onClick={() => setIsOpenMenu(true)} />
        )}
      </nav>

      {/* desktop navigation */}
      <nav className="hidden md:flex items-center justify-between basis-full text-xl ">
        <article className="flex gap-6 ml-8">
          <Link to="/" className="hover:text-blue-400" >
            Home
          </Link>
          <Link to="/signup" className="hover:text-blue-400">
            signup
          </Link>
        </article>
        <Button
          variant="outlined"
          size="large"
          endIcon={<ArrowRight />}
          onClick={() => navigate("/admin")}
          style={{ borderRadius: "2rem" }}
        >
          Admin Login
        </Button>
      </nav>
    </header>
  );
}

export default Header;

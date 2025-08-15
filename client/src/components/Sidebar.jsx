import React from "react";
import { X, ArrowRight } from "lucide-react";
import { Link , useNavigate} from "react-router-dom";
import { Button } from "@mui/material";

function Sidebar({ isOpenMenu, setIsOpenMenu }) {
  const navigate = useNavigate() ;
  function handleClick() {
    setIsOpenMenu(false);
  }
  return (
    <section
      className={`h-screen w-2/3 ${
        isOpenMenu ? "block" : "hidden"
      }  absolute top-0 right-0 md:flex flex-col gap-8 shadow-2xs ring-1 z-20 bg-white transition-all duration-300 ease-in-out `}
    >
      <X
        size={"2rem"}
        style={{ position: "absolute", top: 26, right: 26 }}
        onClick={handleClick}
      />
      <article className="flex flex-col gap-8 items-center mt-20">
        <Link to={"/"} className="hover:text-blue-600" onClick={() => setIsOpenMenu(false)} >
          Home
        </Link>
        <Link to={"/signup"} className="hover:text-blue-600" onClick={() => setIsOpenMenu(false)}>
          signup
        </Link>
        <Button
          variant="outlined"
          onClick={() => navigate("/admin")}
          size="large"
          endIcon={<ArrowRight />}
          style={{
            borderRadius: "2rem",
          }}
        >
          Admin Login
        </Button>
      </article>
    </section>
  );
}

export default Sidebar;

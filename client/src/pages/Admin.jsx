import { Button } from "@mui/material";
import Cookies from "js-cookie";
import React, { useContext, useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { House, MessageCircleCode, SquarePlus, List } from "lucide-react";
import { ClipLoader } from "react-spinners";

// components
import Home from "../components/Dashboared/home";
import BlogList from "../components/Dashboared/BlogList";
import AddBlog from "../components/Dashboared/AddBlog";
import { Toaster } from "sonner";
import { blogContextStore } from "../context/blogContext";

const sidebarElements = [
  {
    icon: <House size={"1.5rem"} />,
    element: "dashboared",
  },
  {
    icon: <SquarePlus size={"1.5rem"} />,
    element: "add blogs",
  },
  {
    icon: <List size={"1.5rem"} />,
    element: "blog list",
  },
];

function Admin({ user }) {
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState(1);

  const { blogData  , setBlogData} = useContext(blogContextStore);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogData) {
      setData(blogData);
      setLoading(false);
    }
  }, [blogData]);

  if (loading) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <ClipLoader color="#2563eb" size={50} />
      </main>
    );
  }
  function handelLogOut() {
    Cookies.remove("token");
    navigate("/login");
  }
  return (
    <>
      <Toaster richColors closeButton position="top-right" />
      <section className="">
        {/* header */}
        <div className="flex items-center justify-between px-24 py-8 shadow-md bg-white">
          <p className="text-2xl text-slate-700">
            Logged in as{" "}
            <strong className="capitalize">{user.username} 👋</strong>
          </p>
          <Button
            variant="outlined"
            onClick={handelLogOut}
            style={{ borderRadius: "2rem", padding: "0.5rem 1.5rem" }}
            endIcon={<LogOut />}
          >
            Log out
          </Button>
        </div>
        <div className="flex ">
          {/* sidebar */}
          <section
            id="admin-sidebar"
            className="md:w-fit h-screen text-2xl shadow-md pt-8"
          >
            <ul className="list-none ">
              {sidebarElements.map((element, i) => {
                return (
                  <div
                    key={element.element}
                    className={`flex gap-4 py-4 pl-8 pr-24 items-center cursor-pointer relative capitalize font-semibold  ${
                      activeLink === i + 1 ? "bg-blue-50" : ""
                    } transition-all duration-150`}
                    onClick={() => setActiveLink(i + 1)}
                  >
                    {element.icon}
                    <span>{element.element}</span>
                    {activeLink === i + 1 && (
                      <span
                        id="line"
                        className="h-full absolute right-0 w-1 bg-blue-600 "
                      ></span>
                    )}
                  </div>
                );
              })}
            </ul>
          </section>

          {/* dashboared Home */}

          <section className="w-full h-max md:pl-12 md:pt-10">
            {activeLink === 1 && <Home data={data } />}
            {activeLink === 2 && <AddBlog user={user} />}
            {activeLink === 3 && <BlogList data={data} setBlogData={setBlogData} />}
          </section>
        </div>
      </section>
    </>
  );
}

export default Admin;

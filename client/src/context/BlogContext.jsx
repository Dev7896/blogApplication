import React from "react";
import { createContext, useEffect, useState } from "react";
import { getAllBlogs } from "../services/blogServices";
import { toast } from "sonner";

export const blogContextStore = createContext();

function BlogContext({ children }) {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    async function fetchBlogData() {
      try {
        const data = await getAllBlogs();
        setBlogData(data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchBlogData();
  }, []);

  return (
    <>
      <blogContextStore.Provider value={{ blogData, setBlogData }}>
        {children}
      </blogContextStore.Provider>
    </>
  );
}

export default BlogContext;

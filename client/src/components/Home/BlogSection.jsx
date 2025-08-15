import React, { useRef, useState, useEffect } from "react";
import { useContext } from "react";
import { blogContextStore } from "../../context/blogContext";
import { Link } from "react-router-dom";
import Blog from "./Blog";
import { TextField, Button } from "@mui/material";

const tags = ["All", "Technology", "Startup", "Lifestyle", "Finance"];

function BlogSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { blogData } = useContext(blogContextStore);

  const [blogContent, setBlogContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);
  const tagRefs = useRef([]);

  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (tagRefs.current[activeIndex]) {
      const tag = tagRefs.current[activeIndex];
      const container = containerRef.current;
      const tagRect = tag.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setHighlightStyle({
        left: tagRect.left - containerRect.left,
        width: tagRect.width,
      });
      setBlogContent(() => {
        if (tagRefs.current[activeIndex].textContent === "All") {
          return blogData;
        }
        const modifiedContent = blogData.filter(
          (blog) =>
            blog.tags[0] ===
            tagRefs.current[activeIndex].textContent.toLowerCase()
        );
        return modifiedContent;
      });
      setLoading(false);
    }
  }, [activeIndex, blogData]);

  // if (loading || !blogContent || blogContent.length == 0) {
  //   return <section></section>;
  // }

  return (
    <section className="w-full h-max mt-12">
      <section
        ref={containerRef}
        className="relative w-max h-max md:text-2xl flex gap-6 md:gap-12 mx-auto rounded-full py-2 px-6 md:px-12 bg-slate-100 items-center"
      >
        {/* Highlight Background */}
        <div
          className="absolute top-0 bottom-0 my-auto md:h-10 bg-blue-500 rounded-full transition-all duration-300 ease-in-out "
          style={{
            left: highlightStyle.left,
            width: highlightStyle.width,
          }}
        />

        {/* Tag Items */}
        {tags?.map((tag, i) => (
          <p
            key={tag}
            ref={(el) => (tagRefs.current[i] = el)}
            onClick={() => setActiveIndex(i)}
            className={`relative cursor-pointer md:px-4 md:py-2 text-xs md:text-xl px-1 rounded-full ${
              i === activeIndex ? "text-white" : "text-black"
            }`}
          >
            {tag}
          </p>
        ))}
      </section>
      <section
        id="blog-wrapper"
        className="mt-14 w-full h-max flex flex-col md:flex-row gap-12  flex-wrap "
      >
        {blogContent?.map((blog, i) => {
          return (
            <Link key={blog._id} to={`/blog/${blog._id}`}>
              <Blog
                imageUrl={blog.imageUrl}
                tag={blog.tags[0]}
                slug={blog.slug}
                title={blog.title}
              />
            </Link>
          );
        })}
      </section>
      <section className="mt-24">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          Never Miss a Blog!
        </h1>
        <p className="text-2xl text-slate-400 text-center mb-6">
          Subscribe to get the latest blog, new tech, and exclusive news.
        </p>
        <div className="flex w-max mx-auto gap-4 md:w-2/3">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter Your Email Id"
          />
          <Button variant="contained">Subcribe</Button>
        </div>
      </section>
    </section>
  );
}

export default BlogSection;

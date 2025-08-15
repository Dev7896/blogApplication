import React from "react";
import { NotepadText, MessageSquareDot } from "lucide-react";
import BlogList from "./BlogList";
import { blogContextStore } from "../../context/blogContext";
import { ClipLoader } from "react-spinners";

const box =
  "cursor-pointer w-[300px] text-3xl flex gap-4 bg-white shadow-lg p-8 rounded-md";

function Home({data}) {

  function commentsLength(blogs = []) {
    if (!blogs) return;

    return blogs.reduce((acc, blog) => {
      return acc + blog.comments.length;
    }, 0);
  }

  return (
    <>
      {/* header */}
      <section className="w-full flex gap-8 ">
        <article className={box}>
          <NotepadText
            size={"5rem"}
            className="bg-blue-100 p-6  text-blue-500 rounded-md"
          />
          <div>
            <p className="font-medium">{data?.length}</p>
            <p className="text-slate-500">Blogs</p>
          </div>
        </article>
        <article className={box}>
          <MessageSquareDot
            size={"5rem"}
            className="bg-blue-100 p-6  text-blue-500 rounded-md"
          />
          <div>
            <p className="font-medium">{commentsLength(data?.data)}</p>
            <p className="text-slate-500">Comments</p>
          </div>
        </article>
      </section>

      <BlogList data={data} />
    </>
  );
}

export default Home;

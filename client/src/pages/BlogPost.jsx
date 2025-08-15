import React, { useState, useEffect, useContext } from "react";
import CommentCard from "../components/blog/CommentCard";
import { TextField, Button, FormLabel } from "@mui/material";
import { Heart, SquareArrowOutUpRight } from "lucide-react";
import { useOutletContext, useParams } from "react-router-dom";
import { blogContextStore } from "../context/blogContext";
import ClipLoader from "react-spinners/ClipLoader";
import DOMPurify from "dompurify";

import timeFormatter from "../services/generalPrupose";

function BlogPost() {
  const { id } = useParams();
  const { blogData } = useContext(blogContextStore);

  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogData && blogData.length > 0) {
      function makeBlogPost() {
        const post = blogData.filter((blog) => {
          return blog._id === id;
        });
        setBlogPost(post[0]);
        setLoading(false);
      }
      makeBlogPost();
    }
  }, [id, blogData]);

  function nameFormatter(username = "") {
    if (!username) return;

    const firstLetter = username.split("")[0].toUpperCase();

    return firstLetter + username.slice(1);
  }

  if (loading) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <ClipLoader color="#2563eb" size={50} />
      </main>
    );
  }
  return (
    <section className="mt-18 w-full md:px-24 px-6 h-max">
      {/* blog details  */}
      <p className="text-blue-500 text-center font-medium text-lg">
        Published on {timeFormatter(blogPost?.createdAt)}
      </p>
      <h1 className="text-5xl md:w-2/3 mx-auto md:text-6xl font-bold text-center mt-6 text-slate-700">
        {blogPost?.title}
      </h1>
      <p className="text-lg text-slate-500 text-center mt-6">
        {blogPost?.slug}
      </p>
      <p className=" px-4 py-2 rounded-full mt-8  w-max mx-auto bg-slate-200 text-blue-700 font-medium ">
        {nameFormatter(blogPost?.author?.username)}
      </p>
      {/* blog image  */}
      <img
        src={blogPost?.imageUrl}
        alt="image of blog post"
        className="rounded-lg mx-auto mt-8"
      />
      <p
        className="mt-6 md:w-2/3 prose lg:prose-xl mx-auto"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(blogPost?.content),
        }}
      ></p>

      {/* like and share */}
      <div className="mt-6 w-full md:w-2/3 md:mx-auto  flex text-3xl gap-4">
        <Heart size={"2rem"} cursor={"pointer"} />
        <SquareArrowOutUpRight size={"2rem"} cursor={"pointer"} />
      </div>

      {/* comment */}
      {blogPost?.comments?.length > 0 && (
        <div className="mt-14 w-full md:w-2/3 mx-auto">
          <p className="font-medium text-xl">
            Comments ({blogPost.comments.length})
          </p>
          {blogPost.comments.map((comment) => {
            return <CommentCard key={comment.user} comment={comment} />;
          })}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const comments = {
            user: e.target.user.value.trim(),
            comment: e.target.comment.value.trim(),
          };
          console.log(comments);
          e.target.user.value = "";
          e.target.comment.value = "";
        }}
        id="commentBox"
        className="mt-12 w-full md:w-2/3 px-8 md:px-0 flex flex-col gap-6 mx-auto"
      >
        <p className="text-lg font-semibold">Add comments</p>
        <TextField
          label="user"
          name="user"
          required
          style={{ maxWidth: "24rem" }}
        />
        <TextField
          multiline
          minRows={12}
          label="comment"
          name="comment"
          required
          style={{ maxWidth: "24rem" }}
        />
        <Button
          variant="contained"
          type="submit"
          style={{
            borderRadius: "1rem",
            paddingBlock: "1rem",
            maxWidth: "24rem",
          }}
        >
          submit
        </Button>
      </form>
    </section>
  );
}

export default BlogPost;

import React from "react";
import { Button, Typography } from "@mui/material";
import { X, Hash } from "lucide-react";

// blog service
import { deleteBlog } from "../../services/blogServices";

// service method
import timeFormatter from "../../services/generalPrupose";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function BlogList({ data, setBlogData }) {
  const navigate = useNavigate();

  async function handleDelete(id) {
    try {
      const result = await deleteBlog(id);
      if (result.success) {
        toast.success(result.message);
        setBlogData((prev) => prev.filter((blog) => blog._id !== id));
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(error?.response?.message || "something went wrong");
      return;
    }
  }

  if (!data || data.length === 0) {
    return (
      <section className="min-h-full flex justify-center items-center mt-12">
        <Typography variant="h1" component={"h1"} color="warning">
          you have not written any blgos yet...go and write first
        </Typography>
      </section>
    );
  }
  return (
    <section className="mt-6 w-max">
      <p className="text-2xl text-slate-500 ">All Blogs</p>
      <section className="mt-4">
        <div className=" flex gap-12 p-6 bg-white shadow-md border-b-2 text-xl text-slate-600 font-medium capitalize">
          <p className="basis-10">
            <Hash />
          </p>
          <p className="basis-500">blog title</p>
          <p className="basis-200">date</p>
          <p>Actions</p>
        </div>
        {data?.map((blog, i) => {
          return (
            <div
              key={blog._id}
              className=" flex gap-12 p-6 bg-white shadow-md border-b-2 text-xl text-slate-600 font-medium"
            >
              <p className="basis-10">{i + 1}</p>
              <p className="basis-500">{blog.title}</p>
              <p className="basis-200">{timeFormatter(blog.createdAt)}</p>
              <Button
                variant="outlined"
                className="basis-50"
                onClick={() => handleDelete(blog._id)}
              >
                <X />
              </Button>
            </div>
          );
        })}
      </section>
    </section>
  );
}

export default BlogList;

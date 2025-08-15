import React, { useState } from "react";
import axios from "axios";
import { imageKit } from "../../utils/imagekit";
import { toast } from "sonner";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// create blog service
import { createBlog } from "../../services/blogServices";

import {
  Input,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function AddBlog({ user }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    imageUrl: "",
    imageFileId: "",
    title: "",
    slug: "",
    content: "",
    tags: "",
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  const [image, setimage] = useState(null);

  const [imageUploading, setImageUploading] = useState(false);

  const handleImageUpload = async function () {
    setImageUploading(true);

    if (!image) {
      toast.error("please select an image");
      setImageUploading(false);
      return;
    }

    const { data } = await axios({
      url: "http://localhost:3000/api/imagekit/auth",
      method: "GET",
    });

    imageKit.upload(
      {
        file: image,
        fileName: image.name,
        useUniqueFileName: true,
        token: data.authenticationParams.token,
        expire: data.authenticationParams.expire,
        signature: data.authenticationParams.signature,
      },
      (err, result) => {
        if (err) {
          toast.error(err.message);
          console.log(err);
          return;
        }
        toast.success("image upload succesfully");
        setImageUploading(false);
        setFormData((prev) => ({
          ...prev,
          imageUrl: result.url,
          imageFileId: result.fileId,
        }));
      }
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const blogData = { ...formData, author: user._id };

    const createBlogApiCall = await createBlog(blogData);

    if (createBlogApiCall.error) {
      toast.error(createBlogApiCall.message);
    }
    if (createBlogApiCall.success) {
      toast.success(createBlogApiCall.message);
    }

    setFormData({
      imageUrl: "",
      title: "",
      slug: "",
      content: "",
      tags: "",
    });

    let timerId = setTimeout(() => {
      navigate("/admin");
    }, 3000);
  }

  return (
    <section className="w-1/2 h-max text-2xl ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <FormControl>
          <Input
            type="file"
            id="blog-image"
            name="blog-image"
            onChange={(e) => setimage(e.target.files[0])}
            required
            sx={{ cursor: "pointer" }}
          />
          <Button
            variant="outlined"
            onClick={handleImageUpload}
            loading={imageUploading}
            sx={{ marginTop: "1rem" }}
          >
            Submit File
          </Button>
          {formData.imageUrl && (
            <img src={formData.imageUrl} alt="preview" className="w-1/2 mt-6" />
          )}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="title">Blog Title</InputLabel>
          <Input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            required
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="slug">Blog Sub Title</InputLabel>
          <Input
            type="text"
            name="slug"
            id="slug"
            value={formData.slug}
            required
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, slug: e.target.value }))
            }
          />
        </FormControl>
        <Box component="div" sx={{ width: "100%", marginBottom: "2rem" }}>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, content: value }))
            }
            modules={modules}
            placeholder="Enter the Blog content"
            style={{ height: "250px", backgroundColor: "#fff" }}
          />
        </Box>

        <FormControl>
          <InputLabel htmlFor="tags">age</InputLabel>
          <Select
            label="age"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, tags: e.target.value }))
            }
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="technology">Technology</MenuItem>
            <MenuItem value="finance">Finance</MenuItem>
            <MenuItem value="startup">Startup</MenuItem>
            <MenuItem value="lifestyle">Lifestyle</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </section>
  );
}

export default AddBlog;

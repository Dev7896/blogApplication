import axios from "axios";
import { toast } from "sonner";

export async function createBlog(data) {
  try {
    const response = await axios({
      baseURL: import.meta.env.VITE_BASEURL,
      url: "/api/blog/create",
      data: data,
      method: "POST",
    });
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "something went wrong",
    };
  }
}

export async function getAllBlogs() {
  try {
    const response = await axios({
      method: "GET",
      baseURL: import.meta.env.VITE_BASEURL,
      url: "/api/blog/",
    });

    return response.data.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "something went wrong",
    };
  }
}

export async function deleteBlog(id) {
  try {
    const response = await axios({
      method: "DELETE",
      baseURL: import.meta.env.VITE_BASEURL,
      url: `/api/blog/${id}`,
    });
    if (response.status === 200) {
      return {
        success: true,
        message: response?.data?.message,
      };
    }
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "something went wrong",
    };
  }
}

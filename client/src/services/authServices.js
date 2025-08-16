import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { responsiveFontSizes } from "@mui/material";

export async function register(data) {
  try {
    const result = await axios({
      url: "http://localhost:3000/api/auth/register",
      method: "POST",
      data: data,
    });
    // console.log('request processed')
    if (result.data.error) {
      return {
        error: true,
        message: result.data.message || "something went wrong",
      };
    }
    if (result.data.success) {
      toast.success(result.data.message);
      Cookies.set("token", result.data.token);
    }

    return result.data;
  } catch (error) {
    console.log(error.response?.data?.message);
    return {
      error: true,
      message: error.response?.data?.message || "something went wrong",
    };
  }
}

export async function loginUser(data) {
  try {
    const response = await axios({
      url: "http://localhost:3000/api/auth/login",
      method: "POST",
      data: data,
    });

    if (response.data.error) {
      return {
        error: true,
        message: response.data.message || "something went wrong",
      };
    }
    if (response.data.success) {
      toast.success(response?.data?.message);
      Cookies.set("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.log("error loggin user");
    return {
      error: true,
      message: error.response?.data?.message || "something went wrong",
    };
  }
}

import axios from "axios";
import { toast } from "sonner";

export async function verifyToken(token) {
  try {
    const response = await axios({
      url: "http://localhost:3000/api/admin",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    toast.error(error);
    return { error: true };
  }
}


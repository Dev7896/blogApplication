import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { verifyToken } from "../services/adminServices";
import { ClipLoader } from "react-spinners";
import Admin from "../pages/Admin";
import { toast } from "sonner";

function ProtectedRoute() {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  // If no token, redirect early
  useEffect(() => {
    if (!token) {
      toast.error("You must log in first.");
      navigate("/login");
    }
  }, [token, navigate]);

  // Don't make API call if no token
  const { isPending, isError, data } = useQuery({
    queryKey: ["admin", token],
    queryFn: () => verifyToken(token),
    enabled: !!token, // only run if token exists
  });

  useEffect(() => {
    if (data?.error) {
      toast.error("Invalid or expired token");
      navigate("/login");
    }
  }, [data, navigate]);

  if (!token || isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ClipLoader />
      </div>
    );
  }

  if (isError) {
    toast.error("Something went wrong verifying admin access.");
    navigate("/login");
    return null;
  }

  // Token is valid
  return <Admin user={data?.data?.user} />;
}

export default ProtectedRoute;

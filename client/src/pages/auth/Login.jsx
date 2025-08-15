import React from "react";
import Form from "../../components/Form";
import { loginUser } from "../../services/authServices";

function Login() {
  return (
    <>
      <Form signup={false} handleRequest={loginUser} />
    </>
  );
}

export default Login;

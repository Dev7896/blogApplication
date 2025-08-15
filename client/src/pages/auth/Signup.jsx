import React, { useState } from "react";
import Form from "../../components/Form";
import { register } from "../../services/authServices";

function Signup() {
  return (
    <>
      <Form signup={true} handleRequest={register} />
    </>
  );
}

export default Signup;

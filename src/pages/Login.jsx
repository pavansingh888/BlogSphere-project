import React, { useEffect } from "react";
import { Login as LoginComponent } from "../components";
function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen py-8">
      <LoginComponent />
    </div>
  );
}

export default Login;

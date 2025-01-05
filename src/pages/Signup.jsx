import React, { useEffect } from "react";
import { Signup as SignupComponent } from "../components";

function Signup() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-50 py-8 mx-4">
      <SignupComponent />
    </div>
  );
}

export default Signup;

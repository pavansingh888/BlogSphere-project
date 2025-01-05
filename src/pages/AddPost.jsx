import React, { useEffect } from "react";
import { Container, PostForm } from "../components/index";

function AddPost() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;

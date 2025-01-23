import { useEffect } from "react";

export default function Post() {
  useEffect(() => {
    document.title = "Post";
  }, []);

  return (
    <div>
      <h1>Post</h1>
    </div>
  );
}

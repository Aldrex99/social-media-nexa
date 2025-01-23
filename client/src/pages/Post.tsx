import { useEffect } from "react";

export default function Post() {
  useEffect(() => {
    document.title = "Social Nexa | Post";
  }, []);

  return (
    <div>
      <h1>Post</h1>
    </div>
  );
}

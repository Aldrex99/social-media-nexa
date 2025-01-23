import { useEffect } from "react";

export default function Post() {
  useEffect(() => {
    document.title = "Social Nexa | Post";
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center p-2">
          <h1 className="flex-1 py-2 pl-2 text-2xl font-semibold text-blue-500">
            Les posts les plus récents
          </h1>
          <button
            onClick={() => {}}
            className="h-fit w-fit rounded-lg bg-blue-500 px-3 py-2 text-white outline-none focus-visible:outline-none focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Nouveau post
          </button>
        </div>
      </div>
    </>
  );
}

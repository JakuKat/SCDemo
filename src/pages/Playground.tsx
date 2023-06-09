import ReactPlayer from "react-player";

export const PlaygroundPage = () => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Playground space
          </h1>
        </div>
        <div>
          <ReactPlayer url="https://youtu.be/dhBtlVfFdBw" />
        </div>
      </main>
    </>
  );
};

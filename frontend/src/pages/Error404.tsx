export const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-grow items-center justify-center">
      <div className="rounded-lg bg-zinc-900 p-8 text-center shadow-xl">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-grey-600">
          Oops! The page you are looking for could not be found.
        </p>
        <a
          href="/"
          className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
          {" "}
          Go back to Ordering{" "}
        </a>
      </div>
    </div>
  );
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>

      <h2 className="mt-4 text-2xl">
        Page Not Found
      </h2>

      <p className="mt-2">
        Sorry, the page you are looking for does not exist.
      </p>

      <a href="/" className="mt-6 text-blue-500">
        Go Back Home
      </a>
    </div>
  );
}
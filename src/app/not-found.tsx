const ForbiddenPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <p className="mb-6 text-2xl font-bold">Please authenticate or create an account</p>
        <button className="bg-[var(--dark-amber)] rounded-md p-3 text-white">
          Login
        </button>
      </div>
    </div>
  );
};

export default ForbiddenPage;

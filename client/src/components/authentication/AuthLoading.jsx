function AuthLoading({ loadingDesc }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-700">
      <span className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />

      <p className="text-lg md:text-xl font-medium animate-pulse">
        {loadingDesc}
      </p>
    </div>
  );
}

export default AuthLoading;

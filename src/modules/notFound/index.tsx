import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-linear-to-br from-blue-400 via-cyan-400 to-blue-600 animate-pulse">
            404
          </h1>
        </div>

        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-xl text-slate-300 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-linear-to-br from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 border-2 border-slate-400 text-slate-300 font-semibold rounded-lg hover:bg-slate-700 transition-all duration-300"
          >
            Go Back
          </button>
        </div>

        <div className="mt-16 relative h-40 flex items-center justify-center">
          <div className="absolute w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;

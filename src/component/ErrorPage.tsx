import { useRouteError, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FiArrowLeft } from "react-icons/fi";

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-9999">
      <div className="relative bg-white/90 shadow-xl rounded-2xl p-8 max-w-md w-[90%] text-center border border-gray-200">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 text-gray-600 hover:text-gray-800 text-xl flex items-center gap-1"
        >
          <FiArrowLeft />
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">Oops!</h1>
        <p className="text-gray-600 mb-4">Something went wrong.</p>

        <div className="text-sm text-gray-500 mb-6">
          {error?.status ? (
            <>
              <strong>Error {error.status}:</strong> {error.statusText || error.message}
            </>
          ) : (
            <span>An unexpected error occurred.</span>
          )}
        </div>

        <button
          onClick={() => window.location.reload()}
          className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

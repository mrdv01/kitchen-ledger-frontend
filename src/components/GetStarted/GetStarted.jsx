import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, hsla(298, 68%, 90%, 1) 0%, hsla(30, 82%, 91%, 1) 100%)",
      }}
      className="flex flex-col h-screen"
    >
      {/* Main content */}
      <div className="flex-grow flex justify-center items-center">
        <div className="border border-gray-300 rounded-lg shadow-lg p-6 bg-transparent h-96 w-80 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-center mb-4">Welcome!</h2>
          <p className="text-center mb-6">Sign up to get started.</p>
          <Link
            className="bg-transparent border border-black text-black px-6 py-3 rounded text-lg hover:border-green-400 hover:text-green-400 block text-center mb-4"
            to="/register"
          >
            Sign Up
          </Link>
          <p className="text-center">
            Already a user?{" "}
            <Link className="text-blue-500 hover:underline" to="/login">
              Log In
            </Link>
          </p>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-white-800 text-gray-500 text-center py-4">
        <div className="container mx-auto">
          <p>&copy; 2024 KitchenLedger. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default GetStarted;

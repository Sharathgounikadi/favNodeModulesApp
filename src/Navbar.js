import { useLocation,Link } from "react-router-dom";


const Navbar = () => {
    const location = useLocation();
  
    return (
      <div className="flex gap-8 py-4 justify-center bg-gray-300 shadow-md">
        <Link
          to="/"
          className={`text-lg font-bold ${location.pathname === "/"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-700"
            } hover:text-blue-500 hover:border-b-2 hover:border-blue-500 transition duration-300`}
        >
          Home
        </Link>
        <Link
          to="/favorites"
          className={`text-lg font-bold ${location.pathname === "/favorites"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-700"
            } hover:text-blue-500 hover:border-b-2 hover:border-blue-500 transition duration-300`}
        >
          Favourites
        </Link>
      </div>
    );
  };

  export default Navbar;
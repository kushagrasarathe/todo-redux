import Link from "next/link";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  console.log(user)
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href={"/"}>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Todo
          </span>
        </Link>
        <div className="flex md:order-2">
          {user === null ? (
            <button
              onClick={logout}
              type="button"
              className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:hover:bg-red-700`}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href={"/login"}
                className={`text-white  font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 `}
              >
                Login
              </Link>
              <Link
                href={"/signup"}
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:hover:bg-blue-700`}
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export const Navbar = function () {
  return (
    <nav className="bg-zinc-900 border-gray-700 bg-opacity-45 backdrop-blur-md sticky top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl flex items-center justify-between p-4 m-auto">
        <Link
          to="/admin"
          className="flex items-center space-x-3 rtl:space-x-reverse mr-auto"
        >
          <img src={logo} className="h-10" alt="EZOrder Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white md:block hidden">
            EZOrder
          </span>
        </Link>
        <Link to="/admin/qr">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M546-66v-96h96v96h-96Zm-96-96v-222h96v222h-96Zm348-166v-152h96v152h-96Zm-96-152v-96h96v96h-96Zm-540 96v-96h96v96h-96Zm-96-96v-96h96v96H66Zm414-318v-96h96v96h-96ZM114-654h192v-192H114v192Zm-48 48v-288h288v288H66Zm48 492h200v-192H114v192ZM66-66v-288h296v288H66Zm588-588h192v-192H654v192Zm-48 48v-288h288v288H606Zm96 540v-166h-96v-96h192v166h96v96H702ZM546-384v-96h156v96H546Zm-192 0v-96h-96v-96h288v96h-96v96h-96Zm30-222v-192h96v96h96v96H384ZM173-713v-74h74v74h-74Zm7 533v-74h74v74h-74Zm533-533v-74h74v74h-74Z" />
          </svg>
        </Link>
      </div>
    </nav>
  );
};

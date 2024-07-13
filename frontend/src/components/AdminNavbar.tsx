import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export const Navbar = function () {
  return (
    <nav className="bg-zinc-900 border-gray-700 bg-opacity-45 backdrop-blur-md sticky top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl flex items-center justify-between p-4 m-auto">
        <Link
          to="/admin"
          className="flex items-center space-x-3 rtl:space-x-reverse mr-auto">
          <img src={logo} className="h-10" alt="EZOrder Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white md:block hidden">
            EZOrder
          </span>
        </Link>
        <Link to={"/admin/kitchen"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            className=" mr-5"
            fill="#e8eaed">
            <path d="M306.15-120q-13.8 0-23.82-10.02t-10.02-23.83v-45.02q0-39.26 20.29-74.31 20.3-35.05 60.99-59.13l-32.64-204.05h-71.72q-24.58 0-41.52-16.94-16.94-16.94-16.94-41.52v-146.72q0-24.08 17.19-41.27Q225.15-800 249.23-800h148.51v-30.77h161.44V-800h122.9l-75.67 467.69q40.69 24.08 60.99 59.13 20.29 35.05 20.29 74.31v45.02q0 13.81-10.02 23.83Q667.65-120 653.85-120h-347.7Zm9.11-450.21-31.68-195.94h-34.35q-9.23 0-16.92 7.69-7.7 7.69-7.7 16.92v146.72q0 9.23 7.7 16.92 7.69 7.69 16.92 7.69h66.03ZM480-209.23q13.15 0 21.96-8.81t8.81-21.96q0-13.15-8.81-21.96T480-270.77q-13.15 0-21.96 8.81T449.23-240q0 13.15 8.81 21.96t21.96 8.81Zm-95.49-144.62h190.98l66.72-412.3H317.79l66.72 412.3Zm-78.36 200h347.7v-45.02q0-51.13-36.54-86.13-36.54-35-89.46-35h-95.7q-52.92 0-89.46 35-36.54 35-36.54 86.13v45.02ZM480-236.92Z" />
          </svg>
        </Link>
        <Link to="/admin/qr">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="#e8eaed">
            <path d="M546-66v-96h96v96h-96Zm-96-96v-222h96v222h-96Zm348-166v-152h96v152h-96Zm-96-152v-96h96v96h-96Zm-540 96v-96h96v96h-96Zm-96-96v-96h96v96H66Zm414-318v-96h96v96h-96ZM114-654h192v-192H114v192Zm-48 48v-288h288v288H66Zm48 492h200v-192H114v192ZM66-66v-288h296v288H66Zm588-588h192v-192H654v192Zm-48 48v-288h288v288H606Zm96 540v-166h-96v-96h192v166h96v96H702ZM546-384v-96h156v96H546Zm-192 0v-96h-96v-96h288v96h-96v96h-96Zm30-222v-192h96v96h96v96H384ZM173-713v-74h74v74h-74Zm7 533v-74h74v74h-74Zm533-533v-74h74v74h-74Z" />
          </svg>
        </Link>
      </div>
    </nav>
  );
};

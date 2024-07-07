import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import Searchbar from "./Searchbar";
import { useOrder } from "../contexts/OrderContext";

interface NavbarProps {
  displaySearch: boolean;
  onSearch?: (query: string) => void;
}

export function Navbar({ displaySearch, onSearch }: NavbarProps) {
  const { currentOrder } = useOrder();
  return (
    <nav className="bg-zinc-900 border-gray-700 fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-10" alt="EZOrder Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white md:block hidden">
            EZOrder
          </span>
        </a>
        {displaySearch ? (
          <div className="flex items-center space-x-3 order-2">
            <div className=" order-0">
              <Searchbar onSearch={onSearch} />
            </div>
            <div className=" hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-900 rounded-lg text-sm p-3">
              <Link to={"/qr"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed">
                  <path d="M546-66v-96h96v96h-96Zm-96-96v-222h96v222h-96Zm348-166v-152h96v152h-96Zm-96-152v-96h96v96h-96Zm-540 96v-96h96v96h-96Zm-96-96v-96h96v96H66Zm414-318v-96h96v96h-96ZM114-654h192v-192H114v192Zm-48 48v-288h288v288H66Zm48 492h200v-192H114v192ZM66-66v-288h296v288H66Zm588-588h192v-192H654v192Zm-48 48v-288h288v288H606Zm96 540v-166h-96v-96h192v166h96v96H702ZM546-384v-96h156v96H546Zm-192 0v-96h-96v-96h288v96h-96v96h-96Zm30-222v-192h96v96h96v96H384ZM173-713v-74h74v74h-74Zm7 533v-74h74v74h-74Zm533-533v-74h74v74h-74Z" />
                </svg>
              </Link>
            </div>
            <Link
              to={"/cart"}
              className="text-gray-400 hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-gray-700 rounded-lg text-sm p-2.5 relative">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.00014 14H18.1359C19.1487 14 19.6551 14 20.0582 13.8112C20.4134 13.6448 20.7118 13.3777 20.9163 13.0432C21.1485 12.6633 21.2044 12.16 21.3163 11.1534L21.9013 5.88835C21.9355 5.58088 21.9525 5.42715 21.9031 5.30816C21.8597 5.20366 21.7821 5.11697 21.683 5.06228C21.5702 5 21.4155 5 21.1062 5H4.50014M2 2H3.24844C3.51306 2 3.64537 2 3.74889 2.05032C3.84002 2.09463 3.91554 2.16557 3.96544 2.25376C4.02212 2.35394 4.03037 2.48599 4.04688 2.7501L4.95312 17.2499C4.96963 17.514 4.97788 17.6461 5.03456 17.7462C5.08446 17.8344 5.15998 17.9054 5.25111 17.9497C5.35463 18 5.48694 18 5.75156 18H19M7.5 21.5H7.51M16.5 21.5H16.51M8 21.5C8 21.7761 7.77614 22 7.5 22C7.22386 22 7 21.7761 7 21.5C7 21.2239 7.22386 21 7.5 21C7.77614 21 8 21.2239 8 21.5ZM17 21.5C17 21.7761 16.7761 22 16.5 22C16.2239 22 16 21.7761 16 21.5C16 21.2239 16.2239 21 16.5 21C16.7761 21 17 21.2239 17 21.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {currentOrder.length > 0 ? (
                <svg
                  className=" absolute top-0 right-0"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#FF0000">
                  <path d="M480.19-222Q374-222 298-297.81t-76-182Q222-586 297.81-662t182-76Q586-738 662-662.19t76 182Q738-374 662.19-298t-182 76Z" />
                </svg>
              ) : null}
              <span className="sr-only">Cart</span>
            </Link>
          </div>
        ) : (
          <Link
            to={"/"}
            className=" flex hover:bg-zinc-800 rounded-md px-5 py-2">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed">
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
            Add Items
          </Link>
        )}
      </div>
    </nav>
  );
}

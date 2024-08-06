import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { BACKEND_URL } from "../App";
import ItemCard from "../components/ItemCard";
import { useOrder } from "../contexts/OrderContext";
import { Link } from "react-router-dom";

export interface Item {
  _id: string;
  name: string;
  price: number;
  availableQuantity: number;
  soldQuantity: number;
  image: string;
}

export const Order = () => {
  const {
    items,
    setItems,
    currentOrder,
    addItem,
    updateQuantity,
    // confirmRefresh,
  } = useOrder();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [zeroQuantityItems, setZeroQuantityItems] = useState<Item[]>([]);
  const [showFooter, setShowFooter] = useState<boolean>(false);
  const [animateFooter, setAnimateFooter] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [toast, setToast] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get<{
          success: boolean;
          msg: string;
          data: Item[];
        }>(BACKEND_URL + "/items/");
        const fetchedItems = res.data.data;

        const zeroQtyItems = fetchedItems.filter(
          (item) => item.availableQuantity === 0
        );
        const nonZeroQtyItems = fetchedItems.filter(
          (item) => item.availableQuantity > 0
        );

        const sortedItems = nonZeroQtyItems.sort(
          (a, b) => b.soldQuantity - a.soldQuantity
        );

        setItems(sortedItems);
        setZeroQuantityItems(zeroQtyItems);
      } catch (error) {
        console.error("Error fetching items:", error);
        alert("cannot access Backend");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [setItems]);

  useEffect(() => {
    if (currentOrder.length > 0) {
      setShowFooter(true);
      setAnimateFooter(true);
    } else if (showFooter) {
      setAnimateFooter(false);
      setTimeout(() => setShowFooter(false), 300);
    }
  }, [currentOrder]);

  const handleAddItem = (item: Item) => {
    addItem(item);
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const total = currentOrder.reduce(
    (acc, item) => acc + (item.price ?? 0) * item.quantity,
    0
  );

  return (
    <>
      <div className="relative pb-24">
        <Navbar
          displaySearch={true}
          onSearch={(query) => setSearchQuery(query)}
        />
        {loading ? (
          <div className=" mt-28 px-10">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                role="status"
                className="space-y-8 mt-9 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                <div className="flex items-center justify-center w-full h-28 bg-gray-300 rounded sm:w-60 dark:bg-gray-700">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="w-full">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center mt-24">
            <div className="flex-col text-center">
              {toast ? (
                <div
                  id="toast-bottom-left"
                  className={`fixed z-20 flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-transparent divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg ${
                    showFooter ? "bottom-20" : "bottom-5"
                  } left-5`}
                  role="alert">
                  <div className="text-sm font-normal">
                    <div
                      id="toast-default"
                      className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                      role="alert">
                      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>

                        <span className="sr-only">Fire icon</span>
                      </div>
                      <div className="ms-3 text-sm font-normal px-5">
                        <Link className=" underline" to={"/admin"}>
                          Admin Page{" "}
                        </Link>
                      </div>
                      <button
                        onClick={() => setToast(false)}
                        type="button"
                        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        data-dismiss-target="#toast-default"
                        aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="space-y-6 w-screen">
                {filteredItems.map((item, index) => (
                  <ItemCard
                    key={item._id}
                    item={item}
                    currentOrder={currentOrder}
                    handleAddItem={handleAddItem}
                    handleQuantityChange={handleQuantityChange}
                    isTrending={index < 3}
                  />
                ))}
                {zeroQuantityItems.map((item) => (
                  <ItemCard
                    key={item._id}
                    item={item}
                    currentOrder={currentOrder}
                    handleAddItem={handleAddItem}
                    handleQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {showFooter && (
          <div
            className={`fixed bottom-0 w-full bg-green-500 rounded-t-xl shadow-md p-4 flex justify-between items-center ${
              animateFooter ? "pop-up" : "pop-down"
            }`}>
            <div className="text-lg font-semibold">
              Total: ${total.toFixed(2)}
            </div>
            <Link
              to={"/cart"}
              className="bg-white text-black pl-4 pr-2 py-2 hover:bg-slate-200 rounded-md">
              <div className="flex">
                View Cart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000">
                  <path d="M472-480 288-664l88-88 272 272-272 272-88-88 184-184Z" />
                </svg>
              </div>
            </Link>
          </div>
        )}
        <Link to={"/admin"} className=" bg-black text-black">
          admin
        </Link>
      </div>
    </>
  );
};

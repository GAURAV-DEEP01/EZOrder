import { OrderItem } from "../contexts/OrderContext";
import { Item } from "../pages/Order";

export interface ItemCardProps {
  item: Item;
  currentOrder: OrderItem[];
  handleAddItem?: (item: Item) => void;
  handleQuantityChange?: (itemId: string, quantity: number) => void;
  isTrending?: boolean;
}

export default function ItemCard({
  item,
  currentOrder,
  handleAddItem,
  handleQuantityChange,
  isTrending,
}: ItemCardProps) {
  const isUnavailable = item.availableQuantity === 0;

  return (
    <div className="relative">
      {isUnavailable && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 rounded-lg">
          <span className=" text-red-400 text-lg font-bold">
            Item Unavailable
          </span>
        </div>
      )}
      <div
        key={item._id}
        className={`flex items-center border p-4 mx-5 rounded-lg bg-white shadow-md text-black ${
          isUnavailable ? "blur-xs" : ""
        }`}>
        {isTrending && (
          <div className="absolute top-1 left-2 bg-red-500 text-white px-2 py-1 rounded-lg z-10">
            <div className=" flex">
              <div className=" ">Trending</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed">
                <path d="M238.08-400.02q0 62.41 30 115.85t83.15 85.56q-4.96-9.58-7.04-19.31-2.07-9.73-2.07-20.08 0-26.96 10.65-51.25t30.08-43.9L480-429.19l98.04 96.04q19.42 19.61 29.73 43.9 10.31 24.29 10.31 51.25 0 10.41-2.18 20.08-2.17 9.66-6.94 19.31 52.96-32.12 83.06-85.52 30.1-53.39 30.1-115.87 0-50.36-19-95.49-19-45.13-54.62-80.93-20 13.4-42.25 19.85-22.25 6.45-45.25 6.45-61.38 0-106.58-41.4-45.19-41.4-51.75-103.29-40.17 33.62-70.98 69.68-30.81 36.05-51.56 73.34-20.75 37.29-31.4 75.54-10.65 38.25-10.65 76.23ZM480-350.92l-58.18 57.34q-11.44 11.46-17.59 25.86-6.15 14.39-6.15 29.77 0 32.76 24.09 56.32 24.09 23.55 57.86 23.55 33.78 0 57.93-23.58 24.16-23.58 24.16-56.35 0-16.38-6-30.53-6-14.16-17.5-25.08L480-350.92ZM458.08-801v93q0 43.22 29.83 72.57 29.84 29.35 73.04 29.35 18.74 0 35.8-7.07 17.06-7.08 31.48-21.04l16.5-16.46q62 41 97.67 107.83 35.68 66.82 35.68 142.74 0 124.5-86.83 211.23-86.83 86.73-211.25 86.73t-211.15-86.73Q182.12-275.58 182.12-400q0-113.5 74.48-220.5T458.08-801Z" />
              </svg>
            </div>
          </div>
        )}
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/c/cf/Samosa-and-Chatni.jpg"
          }
          alt={item.name}
          className="w-24 h-24 object-cover rounded-lg mr-4 hidden sm:block"
        />
        <div
          className={`flex-grow text-start ${
            isTrending ? "sm:mt-0 mt-5" : "mt-0"
          }`}>
          <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
          <p className="text-black">Price: ${item.price}</p>
        </div>
        {!isUnavailable && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleAddItem!(item)}
              className="flex text-white bg-blue-500 hover:bg-blue-700 font-semibold py-2 px-4 rounded-lg">
              Add
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </button>
            <input
              type="number"
              min="0"
              value={
                currentOrder.find((orderItem) => orderItem._id === item._id)
                  ?.quantity || 0
              }
              onChange={(e) =>
                handleQuantityChange!(item._id, parseInt(e.target.value))
              }
              className="w-16 p-2 border text-black rounded-lg text-center"
            />
          </div>
        )}
      </div>
    </div>
  );
}

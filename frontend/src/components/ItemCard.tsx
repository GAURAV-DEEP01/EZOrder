import { Item, OrderItem } from "../pages/Order";

export interface ItemCardProps {
  item: Item;
  currentOrder: OrderItem[];
  handleAddItem?: (item: Item) => void;
  handleQuantityChange?: (itemId: string, quantity: number) => void;
}

export default function ItemCard({
  item,
  currentOrder,
  handleAddItem,
  handleQuantityChange,
}: ItemCardProps) {
  return (
    <div
      key={item._id}
      className="flex items-center border p-4 mx-5 rounded-lg bg-white shadow-md text-black">
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/c/cf/Samosa-and-Chatni.jpg"
        }
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg mr-4 hidden sm:block"
      />
      <div className=" flex-grow text-start">
        <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
        <p className="text-black ">Price: ${item.price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleAddItem!(item)}
          className=" flex text-white bg-blue-500 hover:bg-blue-700 font-semibold py-2 px-4 rounded-lg">
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
    </div>
  );
}

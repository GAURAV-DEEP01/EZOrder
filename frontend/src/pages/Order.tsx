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

  // confirmRefresh();

  const total = currentOrder.reduce(
    (acc, item) => acc + (item.price ?? 0) * item.quantity,
    0
  );

  return (
    <div className="relative pb-24">
      <Navbar
        displaySearch={true}
        onSearch={(query) => setSearchQuery(query)}
      />
      <div className="flex justify-center mt-24">
        <div className="flex-col text-center">
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
  );
};

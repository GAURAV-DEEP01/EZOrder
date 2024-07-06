import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { BACKEND_URL } from "../App";
import ItemCard from "../components/ItemCard";
import { useOrder } from "../contexts/OrderContext";

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
    confirmRefresh,
  } = useOrder();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [zeroQuantityItems, setZeroQuantityItems] = useState<Item[]>([]);

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
      }
    };

    fetchItems();
  }, [setItems]);

  const handleAddItem = (item: Item) => {
    addItem(item);
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  confirmRefresh();

  return (
    <div>
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
    </div>
  );
};
